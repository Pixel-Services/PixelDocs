import { sidebarConfig, pageMetadata } from '../scripts/composer.js';

export default {
    title: 'Pixel Services Docs',
    description: 'Documentation for all public Pixel Services projects.',
    siteTitle: 'Documentation for all public Pixel Services projects.',

    head: [
        ['link', { rel: 'icon', href: 'https://static.pixel-services.com/static/assets/pservices_logo.png' }]
    ],

    themeConfig: {
        logo: 'https://static.pixel-services.com/static/assets/pservices_logo.png',
        sidebar: sidebarConfig,
    },

    transformPageData(pageData) {
        const imageName = `${pageData.relativePath.replace(/\.md$/, '').replace(/\//g, '-')}.png`;
        const localImageUrl = `/assets/banner-cards/${imageName}`;
        const absoluteImageUrl = `https://docs.pixel-services.com/assets/banner-cards/${imageName}`;

        pageData.frontmatter.head ??= [];
        pageData.frontmatter.head.push(
            ['meta', { name: 'twitter:image', content: localImageUrl }],
            ['meta', { name: 'twitter:image:src', content: absoluteImageUrl }],
            ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
            ['meta', { name: 'twitter:image:height', content: 1280 }],
            ['meta', { name: 'twitter:image:width', content: 669 }],
            ['meta', { name: 'twitter:description', content: '""' }]
        );
    },
};
