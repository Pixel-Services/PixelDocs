---
banner_title: "Flash - Server Router"
banner_description: "Learn how to use the FlashServer router to create and manage RouteHandlers."
---

# 🛣️ Server Router

In this section, we discuss how to use the `FlashServer` router to manage our `RequestHandler` instances.
The router is used to define route endpoints and their corresponding handler, which are executed when a request is made to the server.

The `FlashServer` router is an instance of the `RouteController` class, each server instance has its own router instance.
To access the router instance, you can call the `route()` method on either the internal server or your `FlashServer` instance.

## Creating a Route

To create a route, you need to call the `route()` method on your server's instance (in this case for simplicity, on the InternalFlashServer)
and specify the base path of the route, followed by your handler class and optionally a `RouteInterceptor` instance.

(More on the concept of `RouteInterceptor` in the following sections).

```java{8,9}
// Example.java
import static flash.InternalFlashServer.*;

public class Example {
    public static void main(String[] args) {
        port(8080);
        
        route("/api")
            .register(MyHandler.class);
            
        start();
    }
}
```

```java{6}
// MyHandler.java
import flash.Request;
import flash.Response;
import flash.models.RequestHandler;

@RouteInfo(method = HttpMethod.GET, path = "/hello", enforceNonNullBody = false)
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

In the example above, we create a route `/api` and register the `MyHandler` class to handle requests on the `/api/hello` endpoint.

This is because the `path` property of the `RouteInfo` annotation is relative to the base path of the route, which in this case is `/api`.

Visiting `/api/hello` from your browser will result in the response `Hello, world!`.