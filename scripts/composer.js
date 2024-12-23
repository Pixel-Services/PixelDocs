import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter'; // Install 'gray-matter' for parsing frontmatter

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting composer.js execution');

const projects = ['flash', 'mobot', 'serverlibraries'];
const sidebarConfig = {};
const pageMetadata = {};

projects.forEach((project) => {
    const projectPath = path.resolve(__dirname, `../${project}`);
    const sidebarPath = path.join(projectPath, 'config/sidebar.json');

    console.log(`Checking for sidebar.json in ${project}`);
    if (fs.existsSync(sidebarPath)) {
        console.log(`Found sidebar.json in ${project}`);
        const sidebar = JSON.parse(fs.readFileSync(sidebarPath, 'utf-8'));
        Object.assign(sidebarConfig, sidebar);
    } else {
        console.log(`sidebar.json not found in ${project}`);
    }

    // Process Markdown files
    const files = fs.readdirSync(projectPath).filter((file) => file.endsWith('.md'));
    files.forEach((file) => {
        const filePath = path.join(projectPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter } = matter(content);
        const metadataKey = `/${project}/${file.replace('.md', '')}`;

        pageMetadata[metadataKey] = {
            title: frontmatter.ogTitle || frontmatter.title || file.replace('.md', ''),
            description: frontmatter.ogDescription || '',
        };
    });
});

export { sidebarConfig, pageMetadata };
