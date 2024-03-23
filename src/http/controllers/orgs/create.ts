import { createOrgService } from "@/services/create-org";
import { OrgAlreadyExistsError } from "@/services/errors/orgs-already-exists";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    password: z.string().min(6),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const {
    name,
    author_name,
    email,
    whatsapp,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
    password,
  } = registerBodySchema.parse(request.body);

  try {
    await createOrgService({
      name,
      author_name,
      cep,
      email,
      whatsapp,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
      password,
    });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }
  }

  return reply.status(201).send();
}
