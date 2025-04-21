---
banner_title: "MoBot - Creating a Command"
banner_description: "Learn how to create custom commands for MoBot"
---

# 🛠️ Creating a Command

Commands are a core feature of Discord Bots. They allow users to interact with the bot and perform various actions. In MoBot, creating a command is straightforward and flexible, allowing you to define custom behavior for your bot.

## 🚀 Commands in the MoBot API
To make commands easy to use, MoBot provides a extensive API for creating and managing commands. 
Apart from the `SlashCommandHandler` interface, the SlashCommand System is build entirely from annotations.

::: warning NOTE
You will have to implement the `SlashCommandHandler` interface if you want to use `@SlashCommand` and other annotations.
:::

## 📜 `@SlashCommand` Annotation
The `@SlashCommand` annotation is used to define a slash command. Apart from the name and description, you can also specify aliases and required permissions.
This annotation is placed on a method that will handle the command when it is invoked. 
The method should accept a `SlashCommandInteractionEvent` parameter, which contains information about the command invocation and allows you to respond to the user.

| Option          | Description                                                                  |
|-----------------|------------------------------------------------------------------------------|
| `name`          | The name of the command. This is what users will type to invoke the command. |
| `description`   | A short description of what the command does.                                |
| `aliases`       | An array of alternative names for the command.                               |
| `permissions`   | The permission required to use the command.                                  |

Here’s an example of a simple `PingCommand` using the `@SlashCommand` annotation:

```java
public class PingCommand implements SlashCommandHandler {
    @SlashCommand(
        name = "ping",
        description = "Ping the bot to check if it's alive"
    )
    public void onPingCommand(SlashCommandInteractionEvent event) {
        event.reply("Pong!").queue();
    }
}
```

## 🛠️ Registering the Command

To register the command, you need to create an instance of your command class and register it using the `#registerSlashCommandHandler` method in your module's main class.

Here's an example of how to register the `PingCommand` in your module:

```java
public class MyModule extends MbModule {
    @Override
    public void onEnable() {
        registerSlashCommandHandler(new PingCommand());
    }
}
```


