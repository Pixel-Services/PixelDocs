---
banner_title: "MoBot - Command Arguments"
banner_description: "Learn how to use command arguments in MoBot"
---

# 🛠️ Command Arguments
Command arguments allow you to pass additional information to your commands when they are invoked. This is useful for creating dynamic commands that can perform different actions based on user input.

## 📜 `@SlashCommandArgument` Annotation
The `@SlashCommandArgument` annotation is used to define an argument for a slash command. You can specify the name, description, type, and whether the argument is required or optional.
You can add it to the method that handles the command, and it will automatically parse the argument from the command invocation.
`SlashCommandArgument`'s can also be stacked, so you can have multiple arguments for a single command.

Optionally you can add a `Map<String, Object>` to the method signature to get all arguments as a Map. If you prefer to retrieve the arguments from the event, you can use `#event.getOptions()`.

| Option          | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `name`          | The name of the argument. This is what users will type to provide the value. |
| `description`   | A short description of what the argument does.                               |
| `type`          | The type of the argument. This can be a string, integer, etc.                 |
| `required`      | Whether the argument is required or optional.                                 |
| `autoComplete` | Whether the argument should be auto-completed.                             |

Here’s an example of a command with an argument using the `@SlashCommandArgument` annotation:

```java
public class MyCommand implements SlashCommandHandler {
    @SlashCommand(
        name = "greet",
        description = "Greet a user"
    )
    @SlashCommandArgument(
        name = "user",
        description = "The user to greet",
        type = OptionType.USER,
        required = true
    )
    public void onGreetCommand(SlashCommandInteractionEvent event, Map<String, Object> args) {
        // Get the user argument
        User user = (User) args.get("user");
        
        // Reply to the command
        event.reply("Hello, " + user.getName() + "!").queue();
    }
}
```
