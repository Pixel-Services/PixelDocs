---
banner_title: "Flash - Handler Default Implementations (HDI)"
banner_description: "Leverage HDI's for cleaner and more maintainable route logic."
---

# ⚡ Handler Default Implementations (HDI)

HDI's provide an elegant and reliable way to standardize common behaviors across multiple request handlers.
By defining base handlers that extend `RequestHandler` (or even chaining multiple base handlers), you can modularize your logic for aspects like authentication, user data retrieval, and rate limiting.

## 🔗 How It Works

Instead of implementing repeated logic in every handler, you create abstract handler classes that encapsulate common functionality. Your actual route handlers then extend these base classes, inheriting their behavior while focusing purely on request-specific logic.

### 🛠 Example: API Key Authentication

Imagine you want to protect API endpoints with an authentication key and track API usage in a database. You can create an abstract base handler that enforces API key validation:

```java
public abstract class APIKeyProtectedHandler extends RequestHandler {
    protected String apiKey;
    protected int remainingQuota;

    public APIKeyProtectedHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    public Object handle() {
        apiKey = req.header("X-API-Key");

        if (apiKey == null || !isValidApiKey(apiKey)) {
            res.status(403);
            return "{\"error\":\"Invalid API Key\"}";
        }

        remainingQuota = getRemainingQuota(apiKey);
        if (remainingQuota <= 0) {
            res.status(429);
            return "{\"error\":\"API quota exceeded\"}";
        }

        return handleAuthorized();
    }

    protected abstract Object handleAuthorized();

    private boolean isValidApiKey(String key) {
        // Implement key validation logic, e.g., checking against a database
        return true;
    }

    private int getRemainingQuota(String key) {
        // Retrieve remaining quota from a database
        return 100;
    }
}
```

Now, your actual API handlers only need to extend APIKeyProtectedHandler, ensuring every request has a valid API key and available quota before executing its logic:

```java
@RouteInfo(method = HttpMethod.GET, path = "/data")
public class GetDataHandler extends APIKeyProtectedHandler {
    public GetDataHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    protected Object handleAuthorized() {
        return "{\"data\":\"Your API response here\"}";
    }
}
```

## 🏗️ Chaining HDIs for Modular Logic

HDIs can be chained together to compose multiple layers of behavior. For example:

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

- `AuthenticatedHandler` extends ProtectedHandler to fetch user data from the database.

```java
public abstract class AuthenticatedHandler extends ProtectedHandler {
    protected User user;

    public AuthenticatedHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    protected Object handleAuthenticated() {
        user = getUserFromDatabase(authToken);
        if (user == null) {
            res.status(403);
            return "{\"error\":\"User not found\"}";
        }
        return handleWithUser();
    }

    protected abstract Object handleWithUser();
}
```

- Your actual implementation handler extends AuthenticatedHandler to work directly with user data.

```java
@RouteInfo(method = HttpMethod.GET, path = "/profile")
public class UserProfileHandler extends AuthenticatedHandler {
    public UserProfileHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    protected Object handleWithUser() {
        return "{\"username\":\"" + user.getUsername() + "\"}";
    }
}
```