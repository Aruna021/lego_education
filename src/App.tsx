/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { useApp, AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Gallery from "./pages/Gallery";
import { X, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function MainLayout() {
  const { notifications, dismissToast } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative selection:bg-lego-yellow/30 selection:text-slate-900">
      
      {/* 1. Global sticky header with visual shopping bag drawer */}
      <Header />

      {/* 2. Primary Page Router Outlet */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* 3. Global educator promotional footer */}
      <Footer />

      {/* 4. Global Floating Toast Notifications Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3.5 max-w-sm w-full px-4 pointer-events-none">
        <AnimatePresence>
          {notifications.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3 pointer-events-auto select-none ${
                toast.type === "success"
                  ? "bg-white border-emerald-100 text-slate-800"
                  : toast.type === "error"
                  ? "bg-white border-rose-100 text-slate-800"
                  : "bg-white border-blue-100 text-slate-800"
              }`}
              id={`toast-notification-${toast.id}`}
            >
              {/* Type-based Icon */}
              {toast.type === "success" && (
                <div className="p-1 bg-emerald-50 text-emerald-500 rounded-lg shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
              {toast.type === "error" && (
                <div className="p-1 bg-rose-50 text-rose-500 rounded-lg shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              )}
              {toast.type === "info" && (
                <div className="p-1 bg-sky-50 text-sky-500 rounded-lg shrink-0">
                  <Info className="w-5 h-5" />
                </div>
              )}

              {/* Message Details */}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-800">
                  {toast.message}
                </p>
                <span className="text-[10px] text-gray-400 font-bold block mt-1 uppercase tracking-wider">
                  СИСТЕМЫ LEGO EDUCATION
                </span>
              </div>

              {/* Close Action */}
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-gray-400 hover:text-lego-red hover:bg-gray-100 p-1 rounded-lg transition-colors shrink-0"
                aria-label="Dismiss Notification"
              >
                <X className="w-4 h-4" />
              </button>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <MainLayout />
      </HashRouter>
    </AppProvider>
  );
}
