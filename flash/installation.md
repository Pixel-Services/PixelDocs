---
banner_title: "Flash - Installation"
banner_description: "A guide on how to install the Flash library in your project."
---

<script setup>
import { ref, onMounted } from 'vue';

const latestVersion = ref('');

onMounted(async () => {
  try {
    const response = await fetch('https://maven.pixel-services.com/api/maven/details/releases/com/pixelservices/flash');
    const data = await response.json();
    const versions = data.files.filter(file => file.type === 'DIRECTORY').map(file => file.name);
    latestVersion.value = versions.sort().pop();
  } catch (error) {
    console.error('Error fetching latest version:', error);
    latestVersion.value = 'Error fetching version';
  }
})
</script>

# 📲 Installation

This page provides installation instructions for the latest version of the `flash` library from Pixel Services.

## Installation

### Maven (pom.xml)

1. Add the repository :
    ```xml
    <repositories>
      <repository>
        <id>pixel-services</id>
        <name>Pixel Services</name>
        <url>https://maven.pixel-services.com/repository</url>
      </repository>
    </repositories>
    ```

2. And the dependency :
    ```xml
    <dependencies>
      <dependency>
        <groupId>com.pixelservices</groupId>
        <artifactId>flash</artifactId>
        <version>{{ latestVersion }}</version>
      </dependency>
    </dependencies>
    ```

### Gradle (build.gradle)

1. Add the repository :
    ```groovy
    repositories {
        maven {
            url "https://maven.pixel-services.com/repository"
        }
    }
    ```

2. And the dependency :
    ```groovy
    dependencies {
        implementation 'com.pixelservices:flash:{{ latestVersion }}'
    }
    ```

<div>
   ⚡ Latest version:
   <a href="'https://maven.pixel-services.com/#/releases/com/pixelservices/flash'" style="text-decoration: underline; color: #007bff;">
      <strong>{{ latestVersion }}</strong>
   </a>
</div>