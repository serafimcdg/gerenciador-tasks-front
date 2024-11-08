interface TaskCardProps {
    title: string;
    description: string;
  }
  
  export const TaskCard: React.FC<TaskCardProps> = ({ title, description }) => {
    return (
      <div className="task-card bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };
  