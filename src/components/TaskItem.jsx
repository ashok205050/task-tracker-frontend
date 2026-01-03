import { format, formatDistanceToNow, isPast } from 'date-fns';

const TaskItem = ({ task, onToggleStatus, onDelete }) => {
  const dateObj = new Date(task.dueDate);
  const isOverdue = isPast(dateObj) && task.status !== 'Completed';

  const getPriorityColor = (p) => {
    if (p === 'High') return 'bg-red-100 text-red-700 border-red-200';
    if (p === 'Medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full ${task.status === 'Completed' ? 'opacity-60 bg-gray-50' : ''}`}>
      
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          
          {task.status === 'Completed' ? (
            <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded border border-green-100">
              ✓ COMPLETED
            </span>
          ) : (
             <span className={`text-xs font-bold px-2 py-1 rounded border ${isOverdue ? 'bg-red-50 text-red-600 border-red-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
               {isOverdue ? '⚠ Overdue' : '⏳ Pending'}
             </span>
          )}
        </div>
        
        <h3 className={`text-lg font-bold text-gray-800 mb-2 ${task.status === 'Completed' ? 'line-through decoration-gray-400' : ''}`}>
          {task.title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 min-h-[40px] line-clamp-2">
          {task.description || "No description provided."}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100 mt-auto">
        <div className="flex flex-col gap-1 mb-4">
          
          <div className="flex items-center text-gray-500 text-xs gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="font-medium">
                {format(dateObj, 'PP')} at {format(dateObj, 'p')}
            </span>
          </div>

          {task.status !== 'Completed' && (
            <div className={`text-xs font-semibold ml-6 ${isOverdue ? 'text-red-500' : 'text-indigo-500'}`}>
              {isOverdue 
                ? `Due was ${formatDistanceToNow(dateObj)} ago` 
                : `Due in ${formatDistanceToNow(dateObj)}`}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={() => onToggleStatus(task._id, task.status)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold text-white transition-colors
              ${task.status === 'Pending' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-amber-500 hover:bg-amber-600'}`}>
            {task.status === 'Pending' ? 'Complete' : 'Undo'}
          </button>
          
          <button onClick={() => onDelete(task._id)}
            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;