"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Image as ImageIcon, X, Send, CheckCircle, Lock } from "lucide-react";
import LiquidButton from "@/components/liquid/LiquidButton";

export default function FeedbackSection() {
  const [showForm, setShowForm] = useState(false);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [rating, setRating]     = useState(0);
  const [comment, setComment]   = useState("");
  const [image, setImage]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState("");
  const [user, setUser]         = useState<any>(null);

  useEffect(() => {
    fetchFeedbacks();
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`);
      const data = await res.json();
      setFeedbacks(data.slice(0, 6)); // Keep it minimal, only show top 6
    } catch (err) { console.error(err); }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return setError("Image size exceeds 5MB limit");
      const reader = new FileReader();
      reader.onloadend = () => { setImage(reader.result as string); setError(""); };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return setError("Please login to share your experience");
    if (rating === 0) return setError("Please select a rating");
    setLoading(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ rating, comment, imageUrl: image, userId: user.id }),
      });
      if (!res.ok) throw new Error("Feedback submission failed");
      
      setSubmitted(true);
      fetchFeedbacks();
      setTimeout(() => {
        setShowForm(false);
        setSubmitted(false);
        setRating(0);
        setComment("");
        setImage(null);
      }, 2500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16 px-4">
        <span className="text-[10px] font-black text-[#7FD8FF] uppercase tracking-[0.4em] mb-4">Voices of Vrindaa</span>
        <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6 tracking-tight">Community Experiences</h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-[#7FD8FF] to-[#CDB4FF] rounded-full mb-8" />
        
        {user ? (
          <LiquidButton variant="ghost" onClick={() => setShowForm(true)} className="flex items-center gap-2 !px-8 border border-gray-100">
            <MessageSquare size={16} /> Share Your Story
          </LiquidButton>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-gray-400 font-medium">Log in to contribute to the community</p>
            <Lock className="text-gray-200" size={20} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((fb, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="neon-card group h-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={10} className={s <= fb.rating ? "fill-[#7FD8FF] text-[#7FD8FF]" : "text-gray-100"} />
                ))}
              </div>
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{new Date(fb.createdAt).toLocaleDateString()}</span>
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 group-hover:text-gray-700 transition-colors mb-4 italic">
              &quot;{fb.comment}&quot;
            </p>

            {fb.imageUrl && (
              <div className="mt-auto relative w-full aspect-video rounded-xl overflow-hidden border border-white/40 shadow-sm mb-4">
                <img src={fb.imageUrl} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
              </div>
            )}

            <div className="flex items-center gap-2 pt-4 border-t border-white/20">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7FD8FF] to-[#CDB4FF] flex items-center justify-center text-[10px] text-white font-bold">
                {fb.user?.name?.charAt(0) || "U"}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{fb.user?.name || "Verified Enthusiast"}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/5 backdrop-blur-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg neon-card !p-12 shadow-2xl overflow-visible"
            >
              <button onClick={() => setShowForm(false)} className="absolute -top-4 -right-4 p-3 bg-white rounded-full shadow-lg text-gray-400 hover:text-black transition-colors">
                <X size={20} />
              </button>

              {submitted ? (
                <div className="text-center py-10">
                   <CheckCircle className="w-16 h-16 text-[#7FD8FF] mx-auto mb-6" />
                   <h3 className="text-2xl font-bold mb-2">Experience Recorded</h3>
                   <p className="text-[10px] font-black text-gray-300 tracking-[0.2em] uppercase">Your voice powers the community</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Share the Glow</h3>
                    <p className="text-xs text-gray-400 font-medium">Your craftsmanship journey inspires others</p>
                  </div>

                  <div className="flex justify-center gap-3">
                    {[1,2,3,4,5].map(s => (
                      <button type="button" key={s} onClick={() => setRating(s)}>
                        <Star size={28} className={`transition-all ${s <= rating ? "fill-[#7FD8FF] text-[#7FD8FF] drop-shadow-[0_0_8px_rgba(127,216,255,0.6)]" : "text-gray-100"}`} />
                      </button>
                    ))}
                  </div>

                  <textarea 
                    required
                    maxLength={300}
                    placeholder="Describe your interaction with the artisan..."
                    className="w-full bg-transparent border-b-2 border-gray-100 p-4 focus:border-[#7FD8FF] outline-none text-sm transition-all"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 overflow-hidden">
                       {image ? (
                          <div className="flex items-center gap-3 p-2 rounded-xl bg-blue-50/50">
                             <img src={image} className="w-10 h-10 object-cover rounded-md" />
                             <span className="text-[10px] text-gray-500 font-bold truncate">Visual Added</span>
                             <button type="button" onClick={() => setImage(null)}><X size={12} /></button>
                          </div>
                       ) : (
                          <label htmlFor="card-img" className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest cursor-pointer hover:text-[#7FD8FF] transition-colors">
                             <ImageIcon size={14} /> Add Visual (Max 5MB)
                          </label>
                       )}
                       <input type="file" id="card-img" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </div>
                    
                    <LiquidButton type="submit" className="!px-10 !py-4 shadow-neon" disabled={loading}>
                      {loading ? "..." : "Publish"}
                    </LiquidButton>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
