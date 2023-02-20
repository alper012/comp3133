import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";

import resolvers from "./resolvers/index.js";
import typeDefs from "./typeDefs/index.js";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://localhost:27017", { useNewUrlParser: true })
  .then(async () => {
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

    console.log(`Server ready: http://localhost:4000/`);
  });
