import { todos } from "@/databases/todos";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ todos });
      break;
    case "PUT":
      const todo = todos.find((todo) => {
        return todo.id === Number(req.query.id);
      });

      if (todo) {
        todo.checked = !todo.checked;
        res.status(200).json({ todo });
      } else {
        res.status(404).end("Todo not found");
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
