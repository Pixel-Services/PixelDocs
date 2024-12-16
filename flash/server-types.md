# Server Types

In this section, we discuss the differences between the internal server instance `InternalFlashServer` and the `FlashServer` instance, and whether you should use one or the other. We will also provide examples of how to use each type of server.

## Internal Server

The internal server is a singleton instance that can be accessed by statically importing
methods from `InternalFlashServer`. This means that for each application, only one `InternalFlashServer` instance is created.
This allows you to use the server's functionality without creating and managing an instance of the server.

### Usage

To use the internal server, you can statically import the methods from `InternalFlashServer`:

```java{1}
import static flash.InternalFlashServer.*;

public class Example {
    public static void main(String[] args) {
        port(8080);
        
        get("/hello", (req, res) -> {
            res.status(200);
            return "Hello, world!";
        });

        post("/submit", (req, res) -> {
            // Handle POST request
        });

        // Other routes and configurations
    }
}
```

## Server Instance

The `FlashServer` class is used to create an instance of the server.
Unlike the internal server, you can create multiple instances of the `FlashServer` class with different configurations.

### Usage

To create a server instance, you can simply call `new FlashServer()` and configure the server using the instance methods:

```java{5}
import flash.FlashServer;

public class Example {
    public static void main(String[] args) {
        FlashServer server = new FlashServer("My Server Instance");

        server.port(8080);
        
        server.get("/hello", (req, res) -> {
            res.status(200);
            return "Hello, world!";
        });

        server.post("/submit", (req, res) -> {
            // Handle POST request
        });

        // Other routes and configurations
    }
}
```

The `InternalFlashServer` is a **pre-configured instance** of `FlashServer` that is managed internally by the library. Under the hood, it is instantiated as:

```java
new FlashServer("Internal");
```

This means:
- Its **name** is set to `"Internal"` for logging and internal management purposes.
- It serves as the default server used by the library, which is automatically initialized when the library is loaded.

Both the `InternalFlashServer` and any user-created `FlashServer` instances are of the same type (`FlashServer`). However, if you want to create and manage your own server instance, you must provide a **name** during initialization, e.g.:

FlashServer server = new FlashServer("My Server Instance");

## Which Server Type Should You Use?

It all depends on your use case.
If you only need one server instance and want to keep your code concise, you can use the internal server.
However, if your application needs to handle multiple server instances each with different ports and configurations,
you should use `FlashServer` instances.

Example use cases for each server type:
- Internal Server: Simple Backend for a webapp.
- Server Instance: Applications where flexible deployment and scalability are required.
