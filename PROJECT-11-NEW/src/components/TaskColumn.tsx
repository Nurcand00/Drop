import { Droppable } from "@hello-pangea/dnd";
import { Task } from "../types/Task";
import TaskCard from "./TaskCard";
import { Col } from "react-bootstrap";

interface TaskColumnsProps {
    status: string;
    tasks: Task[];
}

function TaskColumn({status, tasks} :TaskColumnsProps) {
  return (
    <Col>
    <h4>{status}</h4>
     <Droppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef}
           {...provided.droppableProps}
           style={{minHeight: "400px"}}>
             {tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index}/>
             ))}
             {provided.placeholder}
          </div>
        )}
      </Droppable>

    </Col>
  );
}

export default TaskColumn;