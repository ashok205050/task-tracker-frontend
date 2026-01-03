const Navbar = () => {
  return (
    <nav className="bg-gray-600 h-16 flex items-center px-6 shadow-md fixed w-full z-10 top-0">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h1 className="text-white text-xl font-bold tracking-wider">Task-Tracker</h1>
      </div>
    </nav>
  );
};

export default Navbar;