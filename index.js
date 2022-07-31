const express = require("express");
const app = express();
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const guard = require("express-jwt-permissions");
const connectDB = require("./config/db");

const port = process.env.PORT || 8080;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-h70joa6x.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://taskappjesusrojasweb.com/api",
  issuer: "https://dev-h70joa6x.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./src/routes"));

app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});
