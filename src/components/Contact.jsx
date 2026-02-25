import React, { useEffect, useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { db } from '../../firestore';
import { addDoc, collection } from 'firebase/firestore';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [done, setDone] = useState(false);

    // This mimics your original logic: Add to DB -> Reset Fields -> Set Done
    const sendMessage = async (e) => {
        e.preventDefault(); // Prevents page reload
        
        await addDoc(collection(db, 'gurexMessages'), {
            name, 
            email, 
            message,
            timestamp: new Date() // Good practice for sorting later
        });

        // Exact functional flow from your older version
        setName("");
        setEmail("");
        setMessage("");
        setDone(true);
        
        // Optional: Reset 'done' after 5 seconds so they can send another later
        setTimeout(() => setDone(false), 5000);
    }

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <section id="contact" className="relative min-h-screen py-12 md:py-20 bg-[#0a0a0a] flex items-center justify-center px-4 overflow-hidden">
            {/* Background Layer */}
            <div className="absolute top-0 left-0 w-full h-full bg-hero-img-2 bg-cover bg-fixed opacity-20 -z-10 blur-sm" />

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                
                {/* LEFT SIDE: BRANDING & INFO */}
                <div className="bg-black/80 backdrop-blur-xl p-6 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
                    <div data-aos="fade-right">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[2px] w-12 bg-[#bd8b31]" />
                            <h5 className="text-[#bd8b31] text-[10px] md:text-sm font-black uppercase tracking-[0.4em]">Get in Touch</h5>
                        </div>

                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-black mb-8 tracking-tighter leading-[1.1] uppercase">
                            LET&apos;S START A <br/>
                            <span className="text-[#bd8b31]">CONVERSATION.</span>
                        </h2>
                        
                        <div className="space-y-6 md:space-y-8 mt-8 md:mt-12">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#bd8b31] group-hover:bg-[#bd8b31] group-hover:text-black transition-all shrink-0">
                                    <FaWhatsapp size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Whatsapp</p>
                                    <p className="text-white font-medium text-sm md:text-base">+257 69 57 11 09</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#bd8b31] group-hover:bg-[#bd8b31] group-hover:text-black transition-all shrink-0">
                                    <MdOutlineEmail size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Email Support</p>
                                    <p className="text-white font-medium text-sm md:text-base break-all sm:break-normal">
                                        support@muhiraupdates.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-16 flex items-center gap-4" data-aos="fade-up">
                        <Image 
                            className="rounded-full border-2 border-[#bd8b31]" 
                            src="https://i.ibb.co/tPzgSFkJ/mu-Logo.jpg" 
                            height={50} 
                            width={50} 
                            alt="Muhira Logo" 
                        />
                        <div>
                            <p className="text-white font-black tracking-tighter leading-none text-lg">MUHIRA</p>
                            <p className="text-[#bd8b31] text-[10px] font-bold tracking-[0.2em] uppercase">Updates</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: FORM */}
                <div className="bg-[#111111] p-6 md:p-12">
                    <form onSubmit={sendMessage} className="space-y-5 md:space-y-6" data-aos="fade-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <div className="flex flex-col space-y-2">
                                <label className="text-[#bd8b31] text-[10px] font-black uppercase tracking-widest">Full Name</label>
                                <input 
                                    required
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-white/5 border border-white/10 text-white rounded-xl p-3 md:p-4 focus:outline-none focus:border-[#bd8b31] transition-all text-sm" 
                                    type="text" placeholder="John Doe" 
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-[#bd8b31] text-[10px] font-black uppercase tracking-widest">Email Address</label>
                                <input 
                                    required
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white/5 border border-white/10 text-white rounded-xl p-3 md:p-4 focus:outline-none focus:border-[#bd8b31] transition-all text-sm" 
                                    type="email" placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[#bd8b31] text-[10px] font-black uppercase tracking-widest">Your Message</label>
                            <textarea 
                                required
                                rows="4"
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)}
                                className="bg-white/5 border border-white/10 text-white rounded-xl p-3 md:p-4 focus:outline-none focus:border-[#bd8b31] transition-all resize-none text-sm" 
                                placeholder="How can we help you?"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-[#bd8b31] hover:bg-[#a17628] text-white font-black uppercase tracking-widest py-4 md:py-5 rounded-xl transition-all shadow-xl shadow-[#bd8b31]/10 active:scale-95 text-xs md:text-sm"
                        >
                            Send Message
                        </button>

                        {/* The Success Message - Matches your old version's functional state */}
                        <div className={done ? "flex justify-center bg-green-600/20 border border-green-600 text-green-500 px-5 py-3 rounded-xl transition-opacity duration-500" : "hidden"}>
                             <h5 className="font-bold text-xs uppercase tracking-widest text-center">Thanks, we&apos;ll get back to you!</h5>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;