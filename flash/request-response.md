---
banner_title: "Flash - Request and Response"
banner_description: "Unlock the power of the Request and Response objects in Flash."
---

# 📥 Request and Response

Generally speaking, in an HTTP request-response cycle, the client sends a request to the server, and the server generates a response based on the request.
In this section, we illustrate the `Request` and `Response` objects in Flash, which are used to interact with the request data and generate responses.
We will learn to read and interpret the request data, and model the correct response to send back to the client.
![](https://miro.medium.com/v2/resize:fit:696/1*wzzLb_xz5Mlykcd1bBqDig.png)

## Request and Response Objects

The `Request` and `Response` objects are passed to the handler constructor and provide access to the request data and response methods.
Under the hood, these objects are provided by the `RouteController` during the registration stage of the handler, and they are continously updated for each request on that specific handler's instance, but for now, you can consider them as magic.

These objects are a very powerful tool to interact with the lifecycle of the server's response, and they provide a wide range of methods that makes our lives as developers easier.

## RequestHandler context

Inside a `RequestHandler` class, you can access the `Request` and `Response` objects inside the `handle` method by simply typing `req` and `res`, respectively.
You can use the methods provided by these objects both outside of a handler, and inside of it, to interact with the request and response objects.
Although, the advantages of being inside a handler are that Flash supports out-of-the-box methods that can significantly clean up your code and improve
the overall readability of your handlers.

Specifically, the `ExpectedRequestParameter`, `ExpectedBodyField`, and `ExpectedBodyFile` objects are used to get the expected properties of the request,
and they are used by `Flash` to validate the request data before the `handle` method is even executed.

_**The developer can then simply assume that all the expected parameters are present and valid,
without having to write a single line of validation code: Flash will do it for you.**_

The three objects mentioned above are fairly similar in their usage, providing getter methods which safely return the data in the expected format and type,
thanks to Flash's built-in validation and casting system.

::: warning NOTE
`Flash` will take care of informing the client of any missing or invalid parameters,
parameters that are not in the expected format, or any other kind of error that might occur during the validation process.
:::

::: danger REMEMBER
The `ExpectedRequestParameter`, `ExpectedBodyField`, and `ExpectedBodyFile` instances are **_ONLY_** supposed to be retrieved by calling the respective
`expectedRequestParameter()`, `expectedBodyField()`, and `expectedBodyFile()` methods **_INSIDE_** of the super constructor of your handler class.
:::

## Example Usage

- `ExpectedRequestParameter`
::: details Click to expand
  The `ExpectedRequestParameter` object is used to get the expected parameters of the request.
  You can use the getter methods to safely get the parameter value, such as `getString`, `getInt`, `getDouble`, and `getBoolean` methods to safely cast the parameter to the expected type.

```java{8,11,16}
import flash.Request;
import flash.Response;
import flash.models.RequestHandler;
import flash.models.ExpectedRequestParameter;

@RouteInfo(method = HttpMethod.GET, path = "/hello", enforceNonNullBody = false)
public class MyHandler extends RequestHandler {
    // Store the expected parameter in a private field
    private final ExpectedRequestParameter myExpectedReqParam;
    public MyHandler(Request req, Response res) {
        super(req, res);
        // Get the expected parameter "myParam", and optionally provide a description
        myExpectedReqParam = expectedRequestParameter("myParam", "A description of the parameter");
    }

    @Override
    public Object handle() {
        // OPTIONAL: specify the response status code and type
        res.status(200);
        res.type("text/plain");
        
        // Safely get the parameter value as a String
        String myParamValue = myExpectedReqParam.getString();
        
        // Return the response to the client
        return "Hello, " + myParamValue + "!";
    }
}
```

Visiting `/hello?myParam=John` from your browser, will return `Hello, John!`.
:::

- `ExpectedBodyField`
::: details Click to expand
  The `ExpectedBodyField` object is used to get the expected fields of the request body.
  You can use the getter methods to safely get the field value, such as `getString`, `getInt`, `getDouble`, and `getBoolean` methods to safely cast the field to the expected type.

```java{8,11,16}
import flash.Request;
import flash.Response;
import flash.models.RequestHandler;
import flash.models.ExpectedBodyField;

// Make sure to set enforceNonNullBody to true
@RouteInfo(method = HttpMethod.GET, path = "/helloBody", enforceNonNullBody = true)
public class MyHandler extends RequestHandler {
    // Store the expected field in a private field
    private final ExpectedBodyField myExpectedBodyField;
    public MyHandler(Request req, Response res) {
        super(req, res);
        // Get the expected field "myField", and optionally provide a description
        myExpectedBodyField = expectedBodyField("myField", "A description of the field");
    }

    @Override
    public Object handle() {
        // OPTIONAL: specify the response status code and type
        res.status(200);
        res.type("text/plain");
        
        // Safely get the field value as a String
        String myFieldValue = myExpectedBodyField.getString();
        
        // Return the response to the client
        return "Field value: " + myFieldValue;
    }
}
```
This time, since we are expecting a field in the request body, using our browser would not be enough to test the handler.
Instead, you can use a tool like `Postman` to send a GET request to `/helloBody` with a multipart form data body containing a field named `myField`.
You should receive a response like `Field value: <value>`.
:::

- `ExpectedBodyFile`
::: details Click to expand 
The `ExpectedBodyFile` object is used to get the expected files of the request body.
The methods provided by this object are slightly different from the other two, but still extremely powerful and simple to use.

- `createFile(Path/String)` accepts either a Path or a String as input. It writes the file's contents to the specified location on the filesystem and returns a `File` object for further interaction.
- `getFileName()` simply returns the name of the file specified by the client.
- `getInputStream()` returns an `InputStream` object containing the file's contents.

```java{8,11,16}
import flash.Request;
import flash.Response;
import flash.models.RequestHandler;
import flash.models.ExpectedBodyFile;

// Make sure to set enforceNonNullBody to true
@RouteInfo(method = HttpMethod.POST, path = "/helloFile", enforceNonNullBody = true)
public class MyHandler extends RequestHandler {
    // Store the expected file in a private field
    private final ExpectedBodyFile myExpectedBodyFile;
    public MyHandler(Request req, Response res) {
        super(req, res);
        // Get the expected file "myFile", and optionally provide a description
        myExpectedBodyFile = expectedBodyFile("myFile", "A description of the file");
    }

    @Override
    public Object handle() {
        // OPTIONAL: specify the response status code and type
        res.status(200);
        res.type("text/plain");
        
        // Write the file to filesystem and get the File object
        File myFile = myExpectedBodyFile.createFile(Paths.get("path/to/save"));
        
        // Return the response to the client
        return "File saved at: " + myFile.getAbsolutePath();
    }
}
```
This time, you will need to use a tool like `Postman` to send a POST request to `/helloFile` with a multipart form data body containing a file named `myFile`.
You should receive a response like `File saved at: <path>` where `<path>` is the location where the server saved the file.
:::
