import type { NextApiRequest, NextApiResponse } from "next";
import Todo from "../@types/todo.type";
import { todos } from "@/databases/todos";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ todos });
      break;
    case "POST":
      const body = JSON.parse(req.body);
      const newTodo: Todo = {
        title: body.title,
        checked: body.checked,
        createdAt: new Date(),
        id: Date.now(),
      };

      todos.push(newTodo);

      res.status(201).json(newTodo);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
