---
banner_title: "Flash - Server Router"
banner_description: "Learn how to use the FlashServer router to create and manage RouteHandlers."
---

# 🛣️ Server Router

In this section, we discuss how to use the `FlashServer` router to manage our `RequestHandler` instances.
The router is used to define route endpoints and their corresponding handler, which are executed when a request is made to the server.

The `FlashServer` router is an instance of the `RouteController` class, each server instance has its own router instance.
To access the router instance, you can call the `route()` method on the `FlashServer` instance.

## Creating a Route

To create a route, you need to call the `route()` method on your server's instance
and specify the base path of the route, followed by your handler class,

```java{6}
// Example.java
public class Example {
    public static void main(String[] args) {
        FlashServer server = new FlashServer(8080);
        
        server.route("/api")
            .register(MyHandler.class);
            
        server.start();
    }
}
```

```java{3}
// MyHandler.java

@RouteInfo(endpoint = "/hello", method = HttpMethod.GET)
public class MyHandler extends RequestHandler {
    public MyHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    public Object handle() {
        String response = "Hello, world!";
        return response;
    }
}
```

In the example above, we create an `/api` router and register the `MyHandler` class to handle requests on the `/api/hello` endpoint.

This is because the `path` property of the `RouteInfo` annotation is relative to the base path of the router, which in this case is `/api`.

Visiting `/api/hello` from your browser will result in the response `Hello, world!`.