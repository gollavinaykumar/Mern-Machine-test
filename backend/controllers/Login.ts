import { Request, Response } from "express";
import { Express } from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export const checkUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        name: name,
      },
    });
    console.log(user);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
