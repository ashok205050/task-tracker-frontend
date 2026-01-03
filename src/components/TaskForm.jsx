import { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', priority: 'Medium', dueDate: ''
  });

  const isFormValid = formData.title.trim() !== '' && formData.dueDate !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onAddTask(formData); 
    setFormData({ title: '', description: '', priority: 'Medium', dueDate: '' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>✨</span> Create New Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Task Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange}
            className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" placeholder="e.g., Submit Project Report" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date & Time *</label>
            <input 
              type="datetime-local" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3"
            className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Add extra details..." />
        </div>

        <button type="submit" disabled={!isFormValid}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all shadow-md transform hover:scale-[1.02] 
            ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}>
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;