// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { faker } from '@faker-js/faker';
import { z } from "zod";

function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  };
}

export type User = ReturnType<typeof createRandomUser>;

function createRandomUsers() {
  return Array.from({ length: 10 }).map(() => {
    return createRandomUser()
  });
}

const users = createRandomUsers();

function searchArray<Item extends object>(array: Item[], key: keyof Item) {
  return (search: string) => array.filter((item) => {
    const value = item[key];
    if (typeof value === 'string') {
      return value.toLowerCase().includes(search.toLowerCase());
    }
    throw new Error(`key ${String(key)} must map to a string`)
  })
}

const searchUsers = searchArray(users, 'username');

const query = z.object({
  search: z.string().optional(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { search } = await query.parseAsync(req.query)

  if (search) {
    const results = searchUsers(search);

    return res.status(200).json(results)
  }

  return res.status(200).json(users)

}
