import { run } from "@mermaid-js/mermaid-cli"
import { dirname, resolve } from "path"
import { fileURLToPath } from 'url'
import glob from "glob"
import {promisify} from "util"
import {mkdir} from "fs/promises"

const asyncGlob = promisify(glob)

const matches = await asyncGlob(`src/**/*.md`)

console.log("Processing markdown documents", matches)

await matches.map(async srcFile => {
    const distFile = srcFile.replace(/src\//, "dist/")
    const distDir = dirname(distFile)
    await mkdir(distDir, {recursive:true})
    // convert markdown + mermaid source to mardown + mermaid svg
    await run(srcFile, distFile)
})