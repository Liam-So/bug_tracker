import express from "express";
import Cors from "cors";
import env from "dotenv";

// App config
const app = express();
env.config();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(Cors());

// Api endpoint
app.get("/", (req, res) => res.status(200).send("Welcome to the server 😄"));

// listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
