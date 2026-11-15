import {
    copyFile,
    cp,
    mkdir,
    readdir,
    readFile,
    rm,
    stat
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(projectRoot, 'dist');
const indexFile = path.join(projectRoot, 'index.html');

async function collectFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            files.push(...await collectFiles(fullPath));
        } else if (entry.isFile()) {
            files.push(fullPath);
        }
    }

    return files;
}

// Keep the original source tree intact; only the deployable copy is trimmed.
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await copyFile(indexFile, path.join(outputDir, 'index.html'));

for (const directory of ['css', 'js']) {
    await cp(
        path.join(projectRoot, directory),
        path.join(outputDir, directory),
        { recursive: true }
    );
}

// Collect literal asset paths from every page, stylesheet and script.
const sourceFiles = [
    indexFile,
    ...await collectFiles(path.join(projectRoot, 'css')),
    ...await collectFiles(path.join(projectRoot, 'js'))
].filter(file => /\.(html|css|js)$/i.test(file));

const assetReferences = new Set();
const assetPatterns = [
    /url\(\s*['"]?(?:\.\.\/)?(assets\/[^'")\s]+\.(?:avif|webp|png|jpe?g|gif|svg|mp4|webm|mp3|ogg|woff2?))['"]?\s*\)/gi,
    /['"`](assets\/[^'"`\r\n]*?\.(?:avif|webp|png|jpe?g|gif|svg|mp4|webm|mp3|ogg|woff2?))['"`]/gi
];

for (const file of sourceFiles) {
    const source = await readFile(file, 'utf8');
    for (const pattern of assetPatterns) {
        for (const match of source.matchAll(pattern)) {
            const reference = match[1].trim();
            if (!reference.endsWith('/')) assetReferences.add(reference);
        }
    }
}

if (assetReferences.size === 0) {
    throw new Error('No se encontraron recursos gráficos referenciados.');
}

const assetRoot = path.resolve(projectRoot, 'assets') + path.sep;
let totalBytes = 0;

for (const reference of assetReferences) {
    const sourcePath = path.resolve(projectRoot, reference);
    if (!sourcePath.startsWith(assetRoot)) {
        throw new Error(`Ruta de recurso fuera de assets/: ${reference}`);
    }

    const details = await stat(sourcePath);
    if (!details.isFile()) {
        throw new Error(`El recurso no es un archivo: ${reference}`);
    }

    const destination = path.join(outputDir, path.relative(projectRoot, sourcePath));
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(sourcePath, destination);
    totalBytes += details.size;
}

console.log(
    `Sitio preparado: ${assetReferences.size} recursos gráficos, ${(totalBytes / 1024 / 1024).toFixed(2)} MiB.`
);
