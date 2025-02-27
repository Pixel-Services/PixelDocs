---
banner_title: "Flash - Handler Default Implementations"
banner_description: "Leverage HDI's for cleaner and more maintainable route logic."
---

# ⚡ Handler Default Implementations (HDI)

HDI's provide an elegant and reliable way to standardize common behaviors across multiple request handlers.
By defining base handlers that extend `RequestHandler` (or even chaining multiple base handlers), you can modularize your logic for aspects like authentication, user data retrieval, and rate limiting.

## 🔗 How It Works

Instead of implementing repeated logic in every handler, you create abstract handler classes that encapsulate common functionality. Your actual route handlers then extend these base classes, inheriting their behavior while focusing purely on request-specific logic.

### 🛠 Example: API Key Authentication

Imagine you want to protect API endpoints with an authentication key by checking it against a database. You can create an abstract `APIKeyProtectedHandler` that extends `RequestHandler` and implements the authentication logic:

```java
public abstract class APIKeyProtectedHandler extends RequestHandler {
    protected String apiKey;

    public APIKeyProtectedHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    public Object handle() {
        apiKey = req.header("X-API-Key");

        if (apiKey == null || !isValidApiKey(apiKey)) {
            res.status(403);
            res.type("application/json");
            return "{\"error\":\"Invalid API Key\"}";
        }

        return handleAuthorized();
    }

    // Implement this method in your actual handlers
    protected abstract Object handleAuthorized();

    private boolean isValidApiKey(String key) {
        // Implement key validation logic, e.g., checking against a database
        // ...
        return true;
    }
}
```

Now, your actual API handlers only need to extend APIKeyProtectedHandler, ensuring every request has a valid API key before executing its logic:

```java
@RouteInfo(method = HttpMethod.GET, path = "/data")
public class GetDataHandler extends APIKeyProtectedHandler {
    public GetDataHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    protected Object handleAuthorized() {
        res.type("application/json");
        return "{\"data\":\"Your API response here\"}";
    }
}
```

## 🏗️ Chaining HDIs for Modular Logic

HDIs can be chained together to compose multiple layers of behavior. For example,
imagine you want to authenticate users with a token and fetch their data from a database. You can create two abstract handlers that extend one another:

- `ProtectedHandler` ensures authentication.

```java
public abstract class ProtectedHandler extends RequestHandler {
    protected String authToken;

    public ProtectedHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    public Object handle() {
        authToken = req.header("Authorization");
        if (authToken == null || !isValidToken(authToken)) {
            res.status(401);
            res.type("application/json");
            return "{\"error\":\"Unauthorized\"}";
        }
        return handleAuthenticated();
    }

    protected abstract Object handleAuthenticated();
}
```

- `AuthenticatedHandler` extends ProtectedHandler to fetch user data from the database, and overrides `handleAuthenticated` to ensure the user is authenticated before proceeding.

```java
public abstract class AuthenticatedHandler extends ProtectedHandler {
    protected User user;
    private String authToken; // inherited from ProtectedHandler

    public AuthenticatedHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    protected Object handleAuthenticated() {
        user = getUserFromDatabase(authToken);
        if (user == null) {
            res.status(403);
            res.type("application/json");
            return "{\"error\":\"User not found\"}";
        }
        return handleWithUser();
    }

    protected abstract Object handleWithUser();
}
```

- Your actual implementation handler `UserProfileHandler` extends `AuthenticatedHandler` and implements `handleWithUser` to ensure the user is authenticated and their profile data has been fetched before proceeding.

```java
@RouteInfo(endpoint = "/profile", method = HttpMethod.GET)
public class UserProfileHandler extends AuthenticatedHandler {
    // inherited from AuthenticatedHandler
    private String username = user.getUsername();
    
    public UserProfileHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    protected Object handleWithUser() {
        res.type("application/json");
        return "{\"username\":\"" + username + "\"}";
    }
}
```