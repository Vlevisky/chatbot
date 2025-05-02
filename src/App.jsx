import React from "react";
import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";


export default function App() {
  return (
    <div className="flex h-screen bg-gray-950 text-white font-sans">
      <Sidebar />
      <Chatbot />
    </div>
  );
}
