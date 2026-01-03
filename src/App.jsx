import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("tasks");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (error) {
      toast.error("Failed to connect to server", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (formData) => {
    try {
      const res = await axios.post(API_URL, formData);
      setTasks([res.data, ...tasks]);
      toast.success("Task created!");
      setActiveTab("tasks");
    } catch (error) {
      toast.error("Error creating task", error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    try {
      const res = await axios.put(`${API_URL}/${id}`, { status: newStatus });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      toast.info(`Status updated`);
    } catch (error) {
      toast.error("Update failed", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task permanently?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.warning("Task deleted");
    } catch (error) {
      toast.error("Delete failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-16">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 md:ml-64 p-8 transition-all duration-300 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center mt-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <>
                {activeTab === "add" ? (
                  <TaskForm onAddTask={handleAddTask} />
                ) : (
                  <TaskList
                    tasks={tasks}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDelete}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 z-50">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`flex flex-col items-center ${
            activeTab === "tasks" ? "text-indigo-600" : "text-gray-500"
          }`}
        >
          <span className="text-xs font-bold">Tasks</span>
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`flex flex-col items-center ${
            activeTab === "add" ? "text-indigo-600" : "text-gray-500"
          }`}
        >
          <span className="text-xs font-bold">Add New</span>
        </button>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
