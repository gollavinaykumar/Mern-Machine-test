import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, password } = req.body;
  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    res.json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: "Failed to create user" });
  }
};
