---
banner_title: "MoBot - Installation"
banner_description: "How to install MoBot and set up MoBot"
---

# 📦 Installation

Follow these steps to install and set up MoBot on your machine. MoBot is designed to be easy to install and configure, so you can get started quickly.
## 🔧 Requirements
- Java 17 or higher
- A Discord Bot Token (You can create one by following the instructions below)

## 🤖 Create a Discord Bot

If you already have a Discord bot, you can skip this step. If you don't have a bot yet, follow these steps to create one:

::: details Click to expand
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click on the "New Application" button.
3. Enter a name for your application and click "Create".
4. In the left sidebar, click on "Bot".
5. Click on the "Add Bot" button.
6. Under the "Token" section, click on "Copy" to copy your bot token. **Keep this token secret!** It is used to authenticate your bot with Discord.
7. Under the "Privileged Gateway Intents" section, enable the intents you need for your bot. For example, if your bot needs to read messages in channels, enable the "Message Content Intent".
8. Under the "OAuth2" section, select the "bot" scope and the permissions your bot needs. This will generate a URL that you can use to invite your bot to your server.
9. Copy the generated URL and paste it into your browser. Select the server you want to invite your bot to and click "Authorize".
10. Your bot is now created and invited to your server!
:::

## 📥 Download MoBot
Grab the latest release from the [Releases Page](https://github.com/Pixel-Services/MoBot/releases).
1. Go to the [Releases Page](https://github.com/Pixel-Services/MoBot/releases)
2. Download the latest `MoBot.jar` file.

## 🚀 Run MoBot for the First Time
In your terminal, navigate to the directory where you downloaded `MoBot.jar` and run the following command:
```bash
java -jar MoBot.jar
```

When you run MoBot for the first time, MoBot will ask you for a **Discord bot token**.
You can get your token from the [Discord Developer Portal](https://discord.com/developers/applications).

Once you enter your token, MoBot will create a `bot.yml` file in the same directory. This file contains your bot's configuration settings.
Additionally, MoBot will create a `modules` directory where you can place your custom modules.

It should look something like this:
```bash
mobot/
├── MoBot.jar
├── bot.yml
└── modules/
```

## ⚙️ Configure MoBot
Open the `bot.yml` file in a text editor. This file contains the configuration settings for your bot. You can customize various settings, such as:
- **Token**: Your Discord bot token.
- **Gateway Intents**: The intents your bot will use. You can add or remove intents as needed.
- **Check Updates**: Whether to check for updates on startup.

Depending on what modules you have installed, you may need to enable specific intents. For example, if you have a module that requires the `GUILD_MEMBERS` intent, you need to add it in the `bot.yml` file.
```yaml
intents:
  - GUILD_MEMBERS
```

## 🔌 Install Modules
As of today, there is no official MoBot module repository. However, you can find some community modules on our Discord. 
To install a module, simply place the module's `.jar` file in the `modules` directory. MoBot will automatically load the module on startup.

You can also create your own modules! Check out the [Creating a Module](/mobot/creating-a-module/modules-introduction) section for more information on how to create and manage your own modules.

## ✅ Start the Bot
Once you have configured your bot and installed any necessary modules, you can start the bot by running the following command in your terminal:
```bash
java -jar MoBot.jar
```
You should see logs indicating that the bot and any modules have been loaded successfully.

Need help? Join our [Discord server](https://discord.gg/KTF3Wsk85G) for support and to connect with other MoBot users.