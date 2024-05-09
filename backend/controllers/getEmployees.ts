import { Request, Response } from "express";
import { Express } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const gettedEmployees = await prisma.employee.findMany();
    res.json(gettedEmployees);
  } catch (err) {
    res.status(500).json({ message: "err" });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { empId } = req.body;
    const updatedList = await prisma.employee.delete({
      where: {
        id: empId,
      },
    });
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ message: "err" });
  }
};
