import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/orgs-already-exists";

interface CreateOrgServiceParams {
  name: string;
  author_name: string;
  email: string;
  whatsapp: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  password: string;
  latitude: number;
  longitude: number;
}

export async function createOrgService({
  name,
  author_name,
  email,
  whatsapp,
  cep,
  state,
  city,
  neighborhood,
  street,
  password,
  latitude,
  longitude,
}: CreateOrgServiceParams) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new OrgAlreadyExistsError();
  }

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
      password: password_hash,
    },
  });
}
