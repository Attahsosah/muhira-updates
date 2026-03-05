"use client";
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { db } from '../../firestore'; 
import { addDoc, collection } from 'firebase/firestore';
import { FaGlobe, FaSearch, FaHandshake, FaClipboardList, FaBox, FaCreditCard } from "react-icons/fa";

const ProcurementSection = () => {
  const { t } = useI18n();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);

  const steps = [
    { key: "identifying", icon: <FaSearch /> },
    { key: "sourcing", icon: <FaGlobe /> },
    { key: "negotiating", icon: <FaHandshake /> },
    { key: "placing", icon: <FaClipboardList /> },
    { key: "receiving", icon: <FaBox /> },
    { key: "payment", icon: <FaCreditCard /> },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await addDoc(collection(db, 'gurexMessages'), {
            name, 
            email, 
            message,
            type: 'procurement', 
            timestamp: new Date()
        });

        setName("");
        setEmail("");
        setMessage("");
        setDone(true);
        setTimeout(() => setDone(false), 5000);
    } catch (error) {
        console.error("Error sending procurement request:", error);
    }
  };

  return (
    <section className="bg-black text-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#bd8b31] mb-6 leading-[0.9]">
              {t("home.categories.procurement", "Procurement Assistance")}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t("procurement.heroSubtitle", "We streamline your global supply chain.")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {steps.map((step) => (
              <div 
                key={step.key} 
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 min-h-[90px] h-auto transition-all hover:bg-white/[0.08]"
              >
                {/* flex-shrink-0 prevents the icon from squishing */}
                <div className="text-[#bd8b31] text-xl flex-shrink-0">
                  {step.icon}
                </div>
                
                {/* flex-1 and break-words forces the text to wrap properly */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[11px] md:text-xs uppercase tracking-wider leading-snug text-gray-200 break-words">
                    {t(`procurement.steps.${step.key}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl h-fit lg:sticky lg:top-24">
          <h2 className="text-2xl font-black text-black uppercase mb-6">
            {t("procurement.formTitle", "Request a Consultation")}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
               <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
               <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("procurement.fields.name", "Enter your name")} 
                  className="w-full p-4 bg-gray-100 rounded-xl text-black outline-none border-2 border-transparent focus:border-[#bd8b31] transition-all" 
              />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email Address</label>
               <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("procurement.fields.email", "Enter your email")} 
                  className="w-full p-4 bg-gray-100 rounded-xl text-black outline-none border-2 border-transparent focus:border-[#bd8b31] transition-all" 
              />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Procurement Details</label>
               <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("procurement.fields.message", "How can we help?")} 
                  rows={4} 
                  className="w-full p-4 bg-gray-100 rounded-xl text-black outline-none border-2 border-transparent focus:border-[#bd8b31] transition-all resize-none" 
              />
            </div>
            
            <button 
                type="submit"
                className="w-full bg-black text-[#bd8b31] font-black py-4 md:py-5 rounded-xl uppercase tracking-widest hover:bg-[#bd8b31] hover:text-white transition-all active:scale-95 shadow-lg"
            >
              {t("procurement.fields.submit", "Submit Request")}
            </button>

            {done && (
                <div className="mt-4 p-4 bg-green-50 border border-green-500 text-green-700 rounded-xl text-center font-bold text-xs uppercase tracking-widest">
                    {t("procurement.success", "Message sent successfully!")}
                </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProcurementSection;