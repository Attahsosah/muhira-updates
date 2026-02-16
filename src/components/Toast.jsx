"use client";
import { useContext } from "react";
import { ToastContext } from "./context/CrudContext";
import { FaCheckCircle } from "react-icons/fa";

export default function Toast() {
  const { toast } = useContext(ToastContext);
  if (!toast.show) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10001] transition-all duration-500 scale-100">
      <div className="bg-gray-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
        <FaCheckCircle className="text-green-400 text-xl" />
        <p className="text-sm font-bold uppercase tracking-widest">{toast.message}</p>
      </div>
    </div>
  );
}