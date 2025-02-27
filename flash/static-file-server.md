---
banner_title: "Flash - Static File Server"
banner_description: "Learn how to serve static files in Flash."
---

# 📁 Static File Server

Flash provides a built-in static file server that allows you to serve static files such with autoresolving MIME types and caching.

::: warning
The static file server pre-registers literal routes for every file in the specified target directory.
Creating/deleting files in the target directory will trigger the internal route registry to update accordingly.
If you are planning to serve a compiled frontend application with a client-side router (think of react-router-dom),
it is reccomended to use the Dynamic File Server instead, 
:::

## Usage

To serve static files in Flash, you need to call the `server.serveStatic()` method with the endpoint path and an instance of `StaticFileServerConfig`.
The configuration object is instanced like so :

```java
public StaticFileServerConfiguration(
    boolean enableFileWatcher,
    boolean enableIndexRedirect,
    String destinationPath,
    SourceType sourceType
)
```

- `enableFileWatcher` : If set to `true`, the server will watch for changes in the served files and reload them automatically.
- `enableIndexRedirect` : If set to `true`, the server will redirect requests to directories to the `index.html` file.
- `destinationPath` : The path to the directory containing the files to be served.
- `sourceType` : The type of source to serve files from. It can be either `FILESYSTEM` or `RESOURCESTREAM`.

Registering the static file server is as simple as calling the `server.serveStatic()` method with the desired path and configuration object:

```java
public class Example {
    public static void main(String[] args) {
        FlashServer server = new FlashServer(8080);

        server.serveStatic("/static", new StaticFileServerConfiguration(
            true,
            true,
            "path/to/static/files",
            SourceType.FILESYSTEM
        ));
    }
}
```

Now you can access the files in the specified directory by navigating to `http://localhost:8080/static/<file-name>`.

Similarly, you can serve files from the jar's resources folder by setting the `sourceType` to `RESOURCESTREAM`:

```java
public class Example {
    public static void main(String[] args) {
        FlashServer server = new FlashServer(8080);

        server.serveStatic("/static", new StaticFileServerConfiguration(
            true,
            true,
            "path/to/static/files",
            SourceType.RESOURCESTREAM
        ));
    }
}
```