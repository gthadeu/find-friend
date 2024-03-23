import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/orgs", create);
}
