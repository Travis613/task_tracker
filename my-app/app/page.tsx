"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
  const [amountOfCurrentTasks, setAmountOfCurrentTasks] = useState(0);

  function addTask() {
    if (amountOfCurrentTasks < 10) {
      setActiveTasks([...activeTasks, { id: Date.now(), title: input }]);
      setInput("");
      setAmountOfCurrentTasks(amountOfCurrentTasks + 1);
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
                        setActiveTasks((prev) =>
                          prev.filter(
                            (clickedTask) => clickedTask.id !== task.id,
                          ),
                        );

                        setAmountOfCurrentTasks((prev) => prev - 1);

                        const removedTask = activeTasks.find(
                          (clickedTask) => clickedTask.id === task.id,
                        );

                        if (removedTask) {
                          setDeletedTasks((prev) => {
                            const updated = [
                              {
                                id: removedTask.id,
                                title: removedTask.title,
                              },
                              ...prev,
                            ];

                            return updated.slice(0, 10);
                          });
                        }
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
                <h2>Completed</h2>
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
