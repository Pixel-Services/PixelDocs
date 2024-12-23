const { generateImagesForProjects } = require('./banner-generator.cjs');

const postbuild = async () => {
    console.log('Build completed, starting Banner card image generation...');
    try {
        await generateImagesForProjects();
        console.log('Banner card images generated successfully!');
    } catch (error) {
        console.error('Error during image generation:', error);
    }
};

// Execute the post-build task
postbuild().then(r => r).catch(e => console.error(e));
