interface Task {
  id: number;
  title: string;
}

export let tasks: Task[] = [];

export let finishedTasks: Task[] = [];

export function countTasks(array: Task[]) {
  let counter = 0;
  for (let x = 0; x < array.length; x++) {
    counter++;
  }
  return counter;
}
