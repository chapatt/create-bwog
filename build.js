import { resolve } from 'node:path';
import { cpSync } from 'node:fs';

const copyFilesList = [
    ['examples/bwog.config.js', 'cloudflare-worker/bwog.config.js'],
    ['examples/wrangler.jsonc', 'cloudflare-worker/wrangler.jsonc'],
    ['examples/bwog.config.js', 'vps/bwog.config.js'],
    ['examples/.env.example', 'vps/.env'],
    ['examples/nginx.config', 'vps/nginx.config'],
    ['examples/bwog.service', 'vps/bwog.service'],
];

copyFilesList.forEach(copyFile => {
    cpSync(
        resolve('./node_modules/@bwog/bwog/', copyFile[0]),
        resolve('./templates/', copyFile[1])
    );
})
