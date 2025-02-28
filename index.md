---
banner_title: "Pixel Services Documentation"
banner_description: "Explore the documentation for all public Pixel Services projects"

# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Pixel Services Documentation"
  text: ""
  tagline: "Explore the documentation for all public Pixel Services projects"
  actions:
    - theme: brand
      text: Support Us
      link: https://buymeacoffee.com/pixelservices
    - theme: alt
      text: Check out our Github
      link: https://github.com/Pixel-Services

features:
  - title: Flash
    details: Simple, modern and fast expressive web framework written in Java.
    link: /flash
  - title: ServerLibraries
    details: A Library made to ease server-side Fabric mod development.
    link: /serverlibraries
  - title: MoBot
    details: A Modular Discord Bot with a simple but efficent API.
    link: /mobot
---

<br>

---

<br>

<script setup>
import { VPTeamMembers } from 'vitepress/theme';

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/83401018?v=4',
    name: 'Relism',
    title: 'Backend Developer',
    links: [
      { icon: 'github', link: 'https://github.com/Relism' },
    ]
  },
{
    avatar: 'https://avatars.githubusercontent.com/u/69807609?v=4',
    name: 'Sieadev',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/sieadev' },
    ]
  },
]
</script>

# Our Team

Say hello to the Pixel Services team !

<VPTeamMembers size="small" :members="members" />

