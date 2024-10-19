import { prisma } from "../utils/prisma";

const registerUserService = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  hashedPassword: string
) => {
  await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password: hashedPassword,
    },
  });
};

export { registerUserService };
