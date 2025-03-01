import { v4 as uuidv4 } from "uuid";
import "./App.css"
import { Task } from "./types/Task";
import { Container } from "react-bootstrap";
import { useState } from "react";
import TaskBoard from "./components/TaskBoard";
const taskData = [
    {
      title: "Express Myself",
      description: "Set the building on fire.",
      status: "To Do",
      assignee: "Lyla Harper",
    },
    {
      title: "Catch Up Work - Saturday",
      description: "Gonna need you to come into work on Saturday",
      status: "In Progress",
      assignee: "Hayes Aguirre",
    },
    {
      title: "Catch Up Work - Sunday",
      description: "Gonna need you to come into work on Sunday too.",
      status: "In Progress",
      assignee: "Ariah Koch",
    },
    {
      title: "TPS Reports",
      description: "Did you get the memo?",
      status: "Done",
      assignee: "Salvador Vega",
    },
    {
      title: 'Buy some more "Flare"',
      description: "Apparently, 13 is not the minimum number of Flare.",
      status: "Done",
      assignee: "Dakota Calhoun",
    },
    {
      title: "Move desk into storage room B",
      description:
        "See if you can take care of some of the rat problem while you're down here.",
      status: "Done",
      assignee: "Gary Crane",
    },
  ];

  const initialTask: Task[]= []

  taskData.forEach((task) => {
    initialTask.push({
        ...task,
        id: uuidv4(),
    });
  });


  function App() {
 const [tasks, setTasks] = useState<Task[]>(initialTask);

    return (
    <Container>
        <h1 className="text-center">Task Management</h1>
        <TaskBoard
        tasks={tasks}
        setTasks={setTasks}/>
    </Container>

    );
  }
  
  export default App