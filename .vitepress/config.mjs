import sidebarConfig from '../composer.js'

export default {
    title: 'Pixel Services Docs',
    description: 'Documentation for all public Pixel Services projects.',
    siteTitle: 'Documentation for all public Pixel Services projects.',
    head: [['link', { rel: 'icon', href: 'https://static.pixel-services.com/static/assets/pservices_logo.png' }]],
    themeConfig: {
        logo: 'https://static.pixel-services.com/static/assets/pservices_logo.png',
        sidebar: sidebarConfig,
    }
}