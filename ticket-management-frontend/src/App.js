import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div>
      <h1>Ticket Management Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
};

export default App;
