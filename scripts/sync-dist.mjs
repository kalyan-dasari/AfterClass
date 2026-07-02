import { cp, rm, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, '..')
const sourceDir = path.join(rootDir, 'frontend', 'dist')
const targetDir = path.join(rootDir, 'dist')

await rm(targetDir, { recursive: true, force: true })
await mkdir(targetDir, { recursive: true })
await cp(sourceDir, targetDir, { recursive: true })