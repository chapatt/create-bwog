import { resolve } from 'node:path';
import { cpSync } from 'node:fs';

const copyFilesList = [
    ['bwog.config.js', 'cloudflare-worker/bwog.config.js'],
    ['wrangler.jsonc', 'cloudflare-worker/wrangler.jsonc'],
    ['bwog.config.js', 'vps/bwog.config.js'],
    ['.env.example', 'vps/.env'],
    ['nginx.config', 'vps/nginx.config'],
    ['bwog.service', 'vps/bwog.service'],
];

copyFilesList.forEach(copyFile => {
    cpSync(
        resolve('./node_modules/@bwog/bwog/', copyFile[0]),
        resolve('./templates/', copyFile[1])
    );
})
