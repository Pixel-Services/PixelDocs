import { defineConfig } from 'vitepress'

export default defineConfig({
  base: "/flash/",
  title: "pixeldocs",
  description: "Documentation for the PixelServices projects",
  cleanUrls: true,
  outDir: '../dist/flash',
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        }
      ],
      '/': [
        {
          text: 'General',
          items: [
            { text: 'Home', link: '/' },
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'API Examples', link: '/api-examples' }
          ]
        }
      ]
    }
  }
})