import React from "react";
import { Task } from "../types/Task";
import { Container, Row } from "react-bootstrap";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";

interface TaskBoardProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}
 const statuses = ["To Do", "In Progress", 
    "Done"]

function TaskBoard({tasks, setTasks}: TaskBoardProps) {
    const onDragEnd = (result:DropResult) => {
    const {destination, source, draggableId } = result;

    if(!destination) return;

    if(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return;
    }

    //sürüklenen görevi bulma

    const draggedTask = tasks.find((task) => task.id === draggableId);
    if(!draggedTask) {
        console.error(`Görev bulunamadı: ${draggableId}`);
        return;

    }

    // Görevin Yeni Bilgilerini Güncelleme

    const updatedTask: Task = {
        ...draggedTask,
        status: destination.droppableId as Task["status"],
    };

    const newTasks = tasks.filter((task) => task.id !== draggableId);

    const destinationTask = newTasks.filter((task) => task.status === destination.droppableId);

    //yeni görevin nereye ekleneceğini hesaplıyoruz.
    
    let insertAt = 0;
    if(destination.index === 0) {
        const firsTaskInDestination = newTasks.find((task) => task.status === destination.droppableId);
        
        if(firsTaskInDestination) {
            insertAt = newTasks.indexOf(firsTaskInDestination);
        } else {
            insertAt = newTasks.length;
        }
        
    } else {
        const prevTaskInDestination = destinationTask[destination.index - 1];
        if(prevTaskInDestination) {
            insertAt = newTasks.indexOf(prevTaskInDestination) + 1;
        } else {
            insertAt = newTasks.length;
        }
    }

    newTasks.splice(insertAt, 0, updatedTask);

    setTasks(newTasks);
    
    };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Container>
        <Row>
            {statuses.map((status) => (
                <TaskColumn
                key={status}
                status={status}
                tasks={tasks.filter((task) => task.status === status)} />
            ))}

        </Row>
    </Container>
  </DragDropContext>
  );
}

export default TaskBoard;