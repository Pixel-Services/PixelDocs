---
banner-title: "Flash - Handlers"
banner-description: "Learn about handlers in Flash and the different types available."
---

# 📚 Handlers

In Flash, handlers are the building blocks of your application logic. They are responsible for processing incoming requests, executing the necessary logic, and generating the appropriate response.

There are several types of handlers in Flash, each serving a specific purpose and providing a different level of control over the request lifecycle. Understanding the different handler types will help you structure your application logic more effectively and make the most out of Flash's powerful routing system.

## 📦 Routing Behavior

Before diving into the different handler types, it's essential to understand how routing works in Flash. When a request is received by the server, Flash matches the request path and method against the registered routes to find the appropriate handler. The handler is then executed, and its response is sent back to the client.

Flash supports 3 main types of routing behaviors:

- **Literal Routing**: Matches the exact path specified in the route definition.
- **Parametrized Routing**: Matches paths with dynamic segments that are extracted as route parameters.
- **Dynamic Routing**: Matches any path that starts with the specified prefix and is flagged with a wildcard "*" character.

## 📌 Handler Types

### 1. RequestHandler

The `RequestHandler` is the "standard" type of handler in Flash, it provides the most control over the request lifecycle and allows you to define custom logic for handling requests.
You can extend the `RequestHandler` class to create custom handlers that process incoming requests and generate responses.

Because `RequestHandler` is an abstract class, you need to implement both the `handle()` method and the `super` constructor in your custom handler to define the logic that should be executed
when a request is received.

Since `RequestHandler` is an abstract class, you can leverage and chain HDI's to create cleaner and more maintainable route logic (more on that in the Handler Default Implementations guide).

```java[Example]

### 2. SimpleHandler

The `SimpleHandler` is a lightweight handler that allows you to define request handling logic in a single method using lambda notation.
It is useful for simple request processing tasks that don't require the full lifecycle control provided by `RequestHandler`.

To create a `SimpleHandler`, you can use the `server.get()`, `server.post()`, `server.put()`, `server.delete()` etc.
in general, you can use the `server.<METHOD>()` methods to register the handler with the server.

The arguments for these methods are the route path and a lambda expression that provides
the request and response objects and defines the request handling logic.

```java[Example]
server.get("/hello", (req, res) -> {
    return "Hello, World!";
});
```

---

Both `RequestHandler` and `SimpleHandler` can specify the router behavior
by the naming convention of the endpoint used to register the handler.

- Literal Routing: `/hello` <br>
Will match exactly `/hello`

- Parametrized Routing: `/hello/:name` <br>
Will match `/hello/John`, `/hello/Alice`, etc.

- Dynamic Routing: `/hello/*` <br>
Will match `/hello/../..`