const express = require("express");
const app = express();
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const guard = require("express-jwt-permissions");

const port = process.env.PORT || 8080;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-h70joa6x.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://task-app/api",
  issuer: "https://dev-h70joa6x.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.get("/tasks", function (req, res) {
  res.json({
    task1: "this is the first task",
    task2: "this is another task",
  });
});

app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});
