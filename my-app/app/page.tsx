"use client";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useState } from "react";
import { Send, Eraser, Delete, PencilLine, InfoIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Task {
  id: number;
  title: string;
}

export default function Home() {
  const [alertVisability, setAlertVisability] = useState("hidden");
  const [alertMessage, setAlertMessage] = useState("");
  const [input, setInput] = useState("");
  const [activeTasks, setActiveTasks] = useState<Task[]>([
    { id: 1, title: "Go to work" },
    { id: 2, title: "Go to work" },
    { id: 3, title: "Go to work" },
    { id: 4, title: "Go to work" },
    { id: 5, title: "Go to work" },
    { id: 6, title: "Go to work" },
    { id: 7, title: "Go to work" },
    { id: 8, title: "Go to work" },
    { id: 9, title: "Go to work" },
    { id: 10, title: "Go to work" },
  ]);
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);

  const amountOfCurrentTasks = activeTasks.length;
  const amountOfCompletedTasks = deletedTasks.length;

  function addTask() {
    if (amountOfCurrentTasks < 10) {
      setActiveTasks([...activeTasks, { id: Date.now(), title: input }]);
      setInput("");
    } else {
      setAlertMessage(
        "You can only have 10 active tasks at one time, delete a task before retrying to add another",
      );
      setAlertVisability("block");
      setTimeout(() => setAlertVisability("hidden"), 3000);
    }
  }

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

          <Button variant="outline" className="h-14" onClick={addTask}>
            Add Task
            <Send className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() => setInput("")}
            className="h-14"
          >
            Clear <Eraser className="ml-2 h-4 w-4" />
          </Button>
        </section>
        {/* Alert section */}
        <section>
          <div className="grid place-items-center">
            <Alert
              className={`grid place-items-center h-full w-2xl ${alertVisability}`}
            >
              <AlertTitle>WARNING!!!!</AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </div>
        </section>
        {/* Active tasks section */}
        <section className="flex-1 p-4">
          <div className="flex flex-col lg:flex-row gap-6 h-full max-w-7xl mx-auto">
            <div className="flex-1 bg-green-200 rounded-2xl shadow-md p-6 min-h-[75]">
              <div className="flex flex-row text-2xl font-bold mb-4 gap-2">
                <h2>Tasks:</h2>
                <h2>{`${amountOfCurrentTasks}/10`}</h2>
              </div>
              <ul>
                {activeTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex flex-row items-center gap-4 text-3xl"
                    draggable="true"
                  >
                    {task.title}
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveTasks(
                          activeTasks.filter(
                            (clickedTask) => clickedTask.id !== task.id,
                          ),
                        );
                        const removedTask = activeTasks.filter(
                          (clickedTask) => clickedTask.id === task.id,
                        );
                        setDeletedTasks([
                          ...deletedTasks,
                          {
                            id: removedTask[0].id,
                            title: removedTask[0].title,
                          },
                        ]);
                      }}
                    >
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
                <h2>{`${amountOfCompletedTasks}/10`}</h2>
              </div>
              <ul>
                {deletedTasks.map((task) => (
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
