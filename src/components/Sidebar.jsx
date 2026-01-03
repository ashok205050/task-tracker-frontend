const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'tasks', label: 'Show Tasks', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { id: 'add', label: 'Add Task', icon: 'M12 4v16m8-8H4' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 hidden md:flex flex-col z-10">
      <div className="p-6 space-y-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 ml-2">Menu</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
              ${activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;