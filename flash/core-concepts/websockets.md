---
banner_title: "Flash - Websockets"
banner_description: "Learn how to create and manage server-side Websockets in Flash."
---

# 🌐 Websockets

In this section, we illustrate how to create and manage Websockets in Flash, which are used to establish a bidirectional communication channel between the client and the server.

## Understanding Websockets

Websockets are a communication protocol that provides full-duplex communication channels over a single TCP connection.
Unlike HTTP, which is a request-response protocol, Websockets allow for real-time, low-latency communication between the client and the server.

Imagine a scenario where you need to send real-time updates to the client, such as a chat application or a live feed: if you were to use HTTP,
you would need to poll the server at regular intervals to check for updates, which is inefficient and resource-intensive.

## Creating a Websocket

To create a Websocket in Flash, you need to extend the `WebsocketHandler` class and override the `onOpen`, `onMessage`, `onClose`, and `onError` methods.
These methods are called when the Websocket connection is opened, a message is received, the connection is closed, and an error occurs, respectively,
and they provide you with an instance of the `WebSocketSession` object to be able to interact with it.

```java
public class MyWebsocketHandler extends WebsocketHandler {
    @Override
    public void onOpen(WebSocketSession session) {
        System.out.println("WebSocket connection opened");
    }

    @Override
    public void onClose(WebSocketSession session, int statusCode, String reason) {
        System.out.println("WebSocket connection closed");
    }

    @Override
    public void onMessage(WebSocketSession session, String message) {
        System.out.println("Received message: " + message);

        //optionally send a reponse back to the client
        session.sendMessage("I received your message!");
    }

    @Override
    public void onError(WebSocketSession session, Throwable error) {
        System.out.println("WebSocket error: " + error.getMessage());
    }
}
```

To register your Websocket handler with the server, you can use the `server.ws()` method:

```java
public class Example {
    public static void main(String[] args) {
        FlashServer server = new FlashServer(8080);

        server.ws("/ws")
            .register(new MyWebsocketHandler());

        server.start();
    }
}
``` 

## Interacting with Websockets sessions

The `WebSocketSession` object provides methods to interact with the Websocket session, such as sending messages, closing the connection, and getting the remote address and session ID.

| Method             | Params           | Description                                                                                                                                      |
|--------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `getChannel()`     | `none`           | Returns an instance of `AsynchronousSocketChannel` useful for retrieving info about the client   .                                               |
| `getRequestInfo()` | `none`           | Returns an instance of `RequestInfo` containing all sorts of information about the request (headers, method, path etc.) .                        |
| `getPath()`        | `none`           | Returns the path to the websocket endpoint as a `String`.                                                                                        |
| `getId()`          | `none`           | Returns the id of the websocket session as a `String`, useful if you want to keep track of the connected clients in a custom manager.            |
| `getBuffer()`      | `none`           | Returns the ByteBuffer for that session.                                                                                                         |
| `sendMessage()`    | `String message` | Sends the `message` to the client as a `String`. it's up to the developer to stringify and de-stringify any data you want to send back and forth |
| `close()`          | `none`           | Closes the websocket session.                                                                                                                    |

::: warning NOTE
`WebsocketHandler` includes a `setId(String id)` method for overriding the default session ID. Unless you have a specific reason to change it, it's best to leave it as is.

Similarly, the `setBuffer(ByteBuffer buffer)` method allows you to override the default buffer. If you're unsure about this, it's recommended to keep the default setting.
:::

