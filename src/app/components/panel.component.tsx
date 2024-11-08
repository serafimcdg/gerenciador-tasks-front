"use client";

import { useEffect, useState } from "react";
import { tasksMock } from "../services/tasks.service";
import { TaskCard } from "./taskCard.component";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const Panel = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(tasksMock); 
  }, []);

  const pendingTasks = tasks.filter((task) => task.status === "Pendente");
  const inProgressTasks = tasks.filter((task) => task.status === "Em Progresso");
  const completedTasks = tasks.filter((task) => task.status === "Concluia");

  return (
    <div className="panel-container p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Painel de Tarefass</h1>

      <div className="tasks-grid grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold text-yellow-600 mb-4">Pendente</h2>
          <ul className="space-y-4">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <li key={task.id}>
                  <TaskCard title={task.title} description={task.description} />
                </li>
              ))
            ) : (
              <p className="text-gray-600">Nenhuma tarefa pendente.</p>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Em progresso</h2>
          <ul className="space-y-4">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map((task) => (
                <li key={task.id}>
                  <TaskCard title={task.title} description={task.description} />
                </li>
              ))
            ) : (
              <p className="text-gray-600">Nenhuma tarefa em progresso.</p>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-4">Concluida</h2>
          <ul className="space-y-4">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <li key={task.id}>
                  <TaskCard title={task.title} description={task.description} />
                </li>
              ))
            ) : (
              <p className="text-gray-600">Nenhuma tarefa concluída.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Panel;
