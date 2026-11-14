#!/usr/bin/env node

import { resolve } from 'node:path';
import { cpSync, opendirSync } from 'node:fs';
import { program, Option } from 'commander';

program
    .description('Create new bwog app')
    .addOption(new Option('-t, --template <string>', 'type of deployment: cloudflare workers or a traditional web server.').choices(['cloudflare-worker', 'httpd']).makeOptionMandatory())
    .option('-d, --destination <string>', 'location where app should be set up', './')
    .option('-f, --overwrite', 'merge files with destination directory, overwriting files with the same names');
program.parse();

const options = program.opts();
const template = resolve(import.meta.dirname, `./templates/${options.template}`);
const destination = options.destination;
const overwrite = options.overwrite;

if (!overwrite) {
    const dir = opendirSync(destination);
    const entry = dir.read();
    await dir.close();
    if (entry !== null) {
        console.error(`Destination directory '${destination}' is not empty. Set '--overwrite' to continue anyway.`);
    }
}

console.log(`Creating bwog app at ${destination}`);
try {
    cpSync(template, destination, {recursive: true});
} catch (error) {
    console.error(`Failed to create app at ${destination}: ${error}`);
}
