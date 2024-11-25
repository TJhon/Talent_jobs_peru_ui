import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import ThemeToggle from "./components/ThemeToggle";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Job Portal</h1>
            <ThemeToggle />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/page/:page" element={<JobList />} />
            <Route path="/job/:date/:id" element={<JobDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
