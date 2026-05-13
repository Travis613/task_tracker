"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Send, Eraser, Delete, PencilLine } from "lucide-react";
import { tasks, finishedTasks } from "@/data";
import Link from "next/link";

export default function Home() {
  const [input, setInput] = useState("");
  const currentTasks = tasks.length;
  const completedTasks = finishedTasks.length;

  return (
    <div className="min-h-screen bg-gray-300">
      <main className="flex flex-col h-screen">
        {/* Input section */}
        <section className="flex flex-col sm:flex-row gap-3 p-4 justify-center">
          <Input
            placeholder="Please input a task"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="h-14 bg-white flex-1 max-w-2xl"
            required
          />

          <Button variant="outline" className="h-14">
            Add Task <Send className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() => setInput("")}
            className="h-14"
          >
            Clear <Eraser className="ml-2 h-4 w-4" />
          </Button>
        </section>

        {/* Active tasks section */}
        <section className="flex-1 p-4">
          <div className="flex flex-col lg:flex-row gap-6 h-full max-w-7xl mx-auto">
            <div className="flex-1 bg-green-200 rounded-2xl shadow-md p-6 min-h-[75]">
              <div className="flex flex-row text-2xl font-bold mb-4 gap-2">
                <h2>Tasks:</h2>
                <h2>{`${currentTasks}/10`}</h2>
              </div>
              <ul>
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex flex-row items-center gap-4 text-3xl"
                  >
                    {task.title}
                    <Button variant="outline">
                      <Delete />
                    </Button>
                    <Button variant="outline">
                      <Link href={`/tasks/${task.id}`}>
                        <PencilLine />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Completed tasks section */}
            <div className="flex-1 bg-red-200 rounded-2xl shadow-md p-6 min-h-[75]">
              <div className="flex flex-row text-2xl font-bold mb-4 gap-2">
                <h2>Completed:</h2>
                <h2>{`${completedTasks}/10`}</h2>
              </div>
              <ul>
                {finishedTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex flex-row items-center gap-4 text-3xl"
                  >
                    {task.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
