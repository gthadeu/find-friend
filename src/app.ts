import fastify from "fastify";
import { create } from "./http/controllers/orgs/create";

export const app = fastify();

app.post("/orgs", create);
