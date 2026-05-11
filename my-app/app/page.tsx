"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Send, Eraser } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen bg-gray-300">
      <main className="flex flex-col h-screen">
        {/* Top Controls */}
        <section className="flex flex-col sm:flex-row gap-3 p-4 justify-center">
          <Input
            placeholder="Please input a task"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="h-14 bg-white flex-1 max-w-2xl"
            required
          />

          <Button
            variant="outline"
            onClick={() => console.log(input)}
            className="h-14"
          >
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

        <section className="flex-1 p-4">
          <div className="flex flex-col lg:flex-row gap-6 h-full max-w-7xl mx-auto">
            <div className="flex-1 bg-green-200 rounded-2xl shadow-md p-6 min-h-[300px]">
              <h2 className="text-2xl font-bold mb-4">To Do</h2>
            </div>
            <div className="flex-1 bg-red-200 rounded-2xl shadow-md p-6 min-h-[300px]">
              <h2 className="text-2xl font-bold mb-4">Completed</h2>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
