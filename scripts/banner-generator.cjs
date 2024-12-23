const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const makeCard = require('twitter-card-image');

const projects = ['flash', 'mobot', 'serverlibraries'];
const baseDir = path.resolve(__dirname, './');
const outputImageDir = path.resolve(__dirname, '../.vitepress/dist/assets/banner-cards/');

if (!fs.existsSync(outputImageDir)) {
    fs.mkdirSync(outputImageDir, { recursive: true });
}

const generateBannerCard = async (filePath, outputPath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter } = matter(content);
        const title = frontmatter.banner_title || frontmatter.title || path.basename(filePath, '.md');
        const description = frontmatter.banner_description || '';

        await makeCard({
            width: 1280,
            height: 669,
            output: outputPath,
            templateImage: path.resolve(__dirname, '../resources/assets/pservicesdocs-card-template.png'),
            fonts: [
                {
                    file: path.resolve(__dirname, '../resources/fonts/Roboto-Bold.ttf'),
                    family: 'Roboto',
                },
            ],
            texts: [
                {
                    text: title,
                    font: '70px "Roboto-Bold"',
                    x: 75,
                    y: 699 / 2 - 100,
                    color: '#fff',
                    maxWidth: 700,
                    lineHeight: 64
                },
                {
                    text: description,
                    font: '32px "Roboto-Bold"',
                    x: 75,
                    y: 699 - 290,
                    color: '#7a7a7a',
                    lineHeight: 40
                },
            ],
            roundedBorder: {
                color: 'rgba(0, 0, 0, 0)',
                radius: 20,
                width: 10,
            },
        });

    } catch (error) {
        console.error(`Error generating banner card for ${filePath}: ${error.message}`);
    }
};

const generateIndexImage = async () => {
    const indexPath = path.resolve(baseDir, '../index.md');
    if (fs.existsSync(indexPath)) {
        const outputImagePath = path.join(outputImageDir, 'index.png');
        await generateBannerCard(indexPath, outputImagePath);
    } else {
        console.log('No global index.md found');
    }
};

const generateImagesForProjects = async () => {
    await generateIndexImage();

    //handle all projects
    for (const project of projects) {
        const projectPath = path.join(baseDir, "../" + project);

        if (!fs.existsSync(projectPath)) {
            console.log(`Directory not found for project: ${project}`);
            continue;
        }

        const files = fs.readdirSync(projectPath).filter((file) => file.endsWith('.md'));
        for (const file of files) {
            const filePath = path.join(projectPath, file);
            const fileName = `${project}-${file.replace('.md', '')}.png`;
            const outputImagePath = path.join(outputImageDir, fileName);
            console.log(`Generating: ${fileName}`);
            await generateBannerCard(filePath, outputImagePath);
        }
    }
};

module.exports = {
    generateImagesForProjects,
};
