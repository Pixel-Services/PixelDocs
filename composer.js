import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Starting composer.js execution')

const projects = ['flash', 'mobot', 'serverlibraries']

const sidebarConfig = {}

projects.forEach(project => {
    const sidebarPath = path.resolve(__dirname, `./${project}/config/sidebar.json`)
    console.log(`Checking for sidebar.json in ${project}`)
    if (fs.existsSync(sidebarPath)) {
        console.log(`Found sidebar.json in ${project}`)
        const sidebar = JSON.parse(fs.readFileSync(sidebarPath, 'utf-8'))
        Object.assign(sidebarConfig, sidebar)
    } else {
        console.log(`sidebar.json not found in ${project}`)
    }
})

// Log the contents of sidebarConfig for debugging
console.log('Final sidebarConfig:', JSON.stringify(sidebarConfig, null, 2))

export default sidebarConfig