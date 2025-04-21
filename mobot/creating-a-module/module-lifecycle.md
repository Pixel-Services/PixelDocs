---
banner_title: "MoBot - Module Lifecycle"
banner_description: "Learn about the lifecycle of a MoBot module"
---

# 📦 Module Lifecycle
MoBot modules follow a specific lifecycle to ensure proper initialization, operation, and cleanup. Understanding this lifecycle is crucial for creating reliable and efficient modules.

## 🔄 Lifecycle Phases
The lifecycle of a MoBot module consists of several phases, each with its own purpose and responsibilities. Here’s a breakdown of each phase:
### 1. Initialization 
When MoBot starts, it scans the modules directory for JAR files. Each module is loaded, and its MbModule class is instantiated. During this phase, the module's dependencies are resolved, and its configuration is loaded. 
### 2. Pre-Enable
Before the Discord Bot is fully initialized, the `preEnable()` method of the module's main class is called. This is where you can perform actions that involve the `BotBuilder`. This includes stuff like setting the bots status or other tasks that can not be performed after the bot is fully initialized.
### 3. Enable 
After initialization, the `onEnable()` method of the module's main class is called. This is where you should set up your module's main functionality, such as registering commands, listeners, or tasks.  
### 4. Disable 
When MoBot shuts down or the module is unloaded, the `onDisable()` method is called. Use this phase to clean up resources, save data, and gracefully stop any ongoing tasks.
### 5. Post-Disable
After the Discord Bot is fully disabled, the `postDisable()` method of the module's main class is called. You can use this phase to perform any final cleanup tasks that require the bot to be fully disabled.

::: warning NOTE 
All of these methods are optional, and you can choose to implement only the ones you need.
:::

## Usage Example
```java
public class MyModule extends MbModule {
    @Override
    public void preEnable() {
        // Perform actions before the bot is fully initialized
    }
    
    @Override
    public void onEnable() {
        // Register commands, listeners, etc.
    }
    
    @Override
    public void onDisable() {
        // Save data, stop tasks, etc.
    }

    @Override
    public void postDisable() {
        // Final cleanup tasks
    }
}
```

## 🛠️ Cheat Sheet
| Method          | Description                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| `preEnable()`   | Called before the bot is fully initialized. Use this to set up the bot.            |
| `onEnable()`    | Called when the module is enabled. Use this to register commands, listeners, etc.  |
| `onDisable()`   | Called when the module is disabled. Use this to save data, clean up resources etc. |
| `postDisable()` | Called after the bot is fully disabled. Use this for final cleanup tasks.          |