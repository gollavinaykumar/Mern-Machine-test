import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, designation, gender, course, image, empId } =
      req.body;

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: empId,
      },
      data: {
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        image,
      },
    });
    res.json(updatedEmployee);
  } catch (err) {
    res.json({ message: "err" });
  }
};
