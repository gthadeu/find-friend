import { prisma } from "@/lib/prisma";
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

  await prisma.org.create({
    data: {
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
    },
  });

  return reply.status(201).send();
}
