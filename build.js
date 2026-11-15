import { resolve } from 'node:path';
import { cpSync } from 'node:fs';

const copyFilesList = [
    ['wrangler.jsonc', 'cloudflare-worker/wrangler.jsonc'],
    ['bwog.config.js', 'cloudflare-worker/bwog.config.js'],
    ['.env.example', 'vps/.env'],
    ['bwog.config.js', 'vps/bwog.config.js'],
];

copyFilesList.forEach(copyFile => {
    cpSync(
        resolve('./node_modules/@bwog/bwog/', copyFile[0]),
        resolve('./templates/', copyFile[1])
    );
})
