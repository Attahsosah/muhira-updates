import React, { useState } from 'react';
import { db } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { HiOutlineCode, HiOutlineLightningBolt, HiOutlineDeviceMobile } from 'react-icons/hi';

function WebDevService() {
    const [formData, setFormData] = useState({ name: '', email: '', project: '' });
    const [status, setStatus] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'devInquiries'), { ...formData, timestamp: new Date() });
        setFormData({ name: '', email: '', project: '' });
        setStatus(true);
        setTimeout(() => setStatus(false), 5000);
    };

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                
                {/* LEFT: THE WRITE-UP */}
                <div className="space-y-10" data-aos="fade-right">
                    <div className="space-y-4">
                        <h2 className="text-[#bd8b31] font-black uppercase tracking-widest text-sm">Our Expertise</h2>
                        <h3 className="text-white text-4xl font-bold leading-tight">
                            Crafting Digital Experiences <br/>That Drive Growth.
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Our web development team at <span className="text-white font-bold">Muhira Updates</span> isn&apos;t just about writing code; we are architects of digital transformation. We specialize in building high-performance, scalable applications tailored to your specific business needs. 
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            From seamless e-commerce platforms to complex enterprise dashboards, our developers utilize the latest tech stacks (React, Next.js, and Firebase) to ensure your project is fast, secure, and future-proof.
                        </p>
                    </div>

                    {/* Feature list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-[#bd8b31]/50 transition-colors">
                            <HiOutlineLightningBolt className="text-[#bd8b31] text-3xl shrink-0" />
                            <div>
                                <h4 className="text-white font-bold">Fast-Performance</h4>
                                <p className="text-gray-500 text-sm">Optimized for speed and SEO rankings.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-[#bd8b31]/50 transition-colors">
                            <HiOutlineDeviceMobile className="text-[#bd8b31] text-3xl shrink-0" />
                            <div>
                                <h4 className="text-white font-bold">Fully Responsive</h4>
                                <p className="text-gray-500 text-sm">Pixel-perfect on every mobile device.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: THE CONTACT FORM */}
                <div className="relative" data-aos="fade-left">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#bd8b31] to-[#634a1a] rounded-3xl blur opacity-20"></div>
                    <div className="relative bg-[#0f0f0f] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
                        <h3 className="text-white text-2xl font-bold mb-6 italic">Ready to start your project?</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-gray-400 text-xs uppercase font-bold tracking-widest block mb-2">Name</label>
                                <input 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#bd8b31] focus:outline-none transition-all" 
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs uppercase font-bold tracking-widest block mb-2">Email</label>
                                <input 
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#bd8b31] focus:outline-none transition-all" 
                                    placeholder="john@agency.com"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs uppercase font-bold tracking-widest block mb-2">Project Brief</label>
                                <textarea 
                                    required
                                    rows="4"
                                    value={formData.project}
                                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#bd8b31] focus:outline-none transition-all resize-none" 
                                    placeholder="Tell us about your vision..."
                                />
                            </div>

                            <button className="w-full bg-[#bd8b31] hover:bg-[#a17628] text-white font-black uppercase tracking-[0.2em] py-5 rounded-xl transition-all shadow-lg active:scale-95">
                                Send Inquiry
                            </button>

                            {status && (
                                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-500 text-center font-bold text-sm uppercase">
                                    Inquiry received! We&apos;ll be in touch soon.
                                </div>
                            )}
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default WebDevService;