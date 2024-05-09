import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, designation, gender, course, image, userId } =
      req.body;
    const createdEmployee = await prisma.employee.create({
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        image,
      },
    });
    res.json(createdEmployee);
  } catch (err) {
    res.json({ message: "err" });
  }
};


