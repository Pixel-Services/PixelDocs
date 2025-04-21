---
banner_title: "MoBot - Creating a Module"
banner_description: "Learn how to create a module for MoBot"
---

# 🧩 Creating a Module
MoBot is designed to be modular, allowing you to create your own modules to extend its functionality.
This guide will walk you through the process of creating a module for MoBot.


## 🧠 Prerequisites

Before we begin, make sure you’re comfortable with:

- Basic **Java** programming
- Using **Maven** (or any preferred Java build tool)
- Understanding the basics of how MoBot operates

If you're new to Java or Maven, we recommend checking out a few beginner tutorials first.

Also, make sure you've reviewed the [MoBot Installation Guide](/mobot/introduction/installation) to understand how the bot is structured and how modules fit into it.

## 🧩 What Makes a Module?

For a module to be recognized and loaded by MoBot, it needs **two essential parts**:

1. A **Main class** that extends `MbModule`
2. A **`module.yml`** configuration file that defines metadata about the module

Additionally, you’ll need to include the **MoBot API** as a dependency in your project.

## 🛠 Step 1: Set Up Your Maven Project
To create a module, you need to set up a Maven project. You can do this using your favorite IDE or by using the command line.
If you're using the command line, you can create a new Maven project with the following command:

```bash
mvn archetype:generate -DgroupId=com.example -DartifactId=MyModule -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```
This will create a new Maven project looking something like this:

```bash
MyModule/
├── pom.xml
└── src/
    └── main/
        └── java/
            └── com/
                └── example/
                    └── MyModule/
                        └── App.java
```

### Add MoBot API Dependency
To use the MoBot API in your module, you need to add it as a dependency in your `pom.xml` file. Open the `pom.xml` file and add the following lines inside the `<repositories>` and `<dependencies>` sections:

```xml
<repository>
    <id>pixel-services-releases</id>
    <name>Pixel Services</name>
    <url>https://maven.pixel-services.com/releases</url>
</repository>

<dependency>
    <groupId>com.pixelservices.mobot</groupId>
    <artifactId>mobot-api</artifactId>
    <version>VERSION</version> <!-- Replace VERSION -->
</dependency>
```

Make sure to replace `VERSION` with the latest version of the MoBot API.

[![Latest Version](https://img.shields.io/maven-metadata/v?metadataUrl=https://maven.pixel-services.com/releases/com/pixelservices/mobot/mobot-api/maven-metadata.xml)](https://maven.pixel-services.com/#/releases/com/pixelservices/mobot/mobot-api)

## 🧱 Step 2: Create Your Main Class
Either locate your existing main class or create a new one. This class will be the entry point for your module and should extend `MbModule`.
```java
public class MyModule extends MbModule {
    @Override
    public void onEnable() {
        //Do something
    }

    @Override
    public void onDisable() {
        //Do something
    }
}
```

## 📜 Step 3: Create the `module.yml` File
The `module.yml` file contains metadata about your module, such as its name, version, and description. Create a new file named `module.yml` in the `src/main/resources` directory of your project.
```yaml
name: MyModule
version: 1.0.0
description: This is a sample module for MoBot.
main: com.example.MyModule
authors: [Your Name]
license: MIT
depedencies: []
```

### Explanation of the Fields
- **name**: The name of your module.
- **version**: The version of your module.
- **description**: A brief description of your module.
- **main**: The fully qualified name of your main class.
- **authors**: A list of authors for your module.
- **license**: The license under which your module is distributed.
- **dependencies**: A list of other modules that your module depends on. This is optional and can be left empty if your module has no dependencies.

## 🚀 Step 4: Build Your Module
Once you have created your main class and `module.yml` file, you can build your module using Maven. Open a terminal in the root directory of your project and run the following command:

```bash
mvn clean package
```

This will create a JAR file for your module in the `target` directory. The JAR file will be named `MyModule-1.0.0.jar` (or whatever version you specified in the `module.yml` file).

Congratulations! You have successfully created a module for MoBot. Now you can load it into your MoBot instance and start using it.

## 🔌 Step 5: Load Your Module into MoBot
To load your module into MoBot, simply place the JAR file you just created into the `modules` directory of your MoBot instance. 
When you start MoBot, it will automatically detect and load your module.

Need help? Join our [Discord server](https://discord.gg/KTF3Wsk85G) for support and to connect with other MoBot users.  