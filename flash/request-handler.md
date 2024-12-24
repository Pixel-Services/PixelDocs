---
banner_title: "Flash - Request Handler"
banner_description: "Learn how to create and manage Request Handlers in Flash."
---

# ⚙️ Request Handler

In this section, we illustrate the powerful concept of `RequestHandler` in Flash, which are used to handle incoming requests and generate responses.

## Creating a Request Handler

To create a custom request handler, you need to extend the `RequestHandler` class and annotate the class with the `RouteInfo` annotation,
specifying the HTTP method that the handler will respond to and the relative path that the handler will be registered to.
The `enforceNonNullBody` attribute is used to specify whether the handler expects a non-null request body: by default, it is set to `false`.
After that, you must override the `handle` method;
The `handle` method is where you define the logic for processing the request and generating the response.
The `req` (request) and `res` (response) objects are available in the handler to access the request data and send the response back to the client.

You must call the super constructor with the `req` and `res` objects to initialize the handler.

```java{5,8}
import flash.Request;
import flash.Response;
import flash.RequestHandler;

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

::: warning
Any logic that needs to be executed before the request handler is registered must be done within the constructor.
:::

## Request Handler methods

The `RequestHandler` class provides several methods that can be used to interact with the request and response objects easily and safely.
Following are listed the methods available in the `RequestHandler` class, with a brief description of their purpose:

| Method                       | Params                     | Description                                                                                          |
|------------------------------|----------------------------|------------------------------------------------------------------------------------------------------|
| `getRequestBody()`           | `none`                     | Returns a `JSONObject` representation of the request body.                                           |
| `getSpecification()`         | `none`                     | Returns an instance of `HandlerSpecification` containing all sorts of information about the handler. |
| `expectedRequestParameter()` | `String name, description` | Returns an instance of `ExpectedRequestParameter` for the specified parameter name.                  |
| `expectedBodyField()`        | `String name, description` | Returns an instance of `ExpectedBodyField` for the specified field name.                             |
| `expectedBodyFile()`         | `String name, description` | Returns an instance of `ExpectedBodyFile` for the specified file name.                               |

(More on the `ExpectedRequestParameter`, `ExpectedBodyField`, and `ExpectedBodyFile` classes in the next section).