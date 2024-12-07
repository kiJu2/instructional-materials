import Todo from "@/pages/api/@types/todo.type";

const todos: Todo[] = [
  {
    title: "Learn Next.js",
    checked: false,
    createdAt: new Date(),
    id: Date.now(),
  },
];

export { todos };
