"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Image as ImageIcon, X, Send, CheckCircle } from "lucide-react";
import LiquidButton from "@/components/liquid/LiquidButton";
import Blob from "@/components/liquid/Blob";

export default function FeedbackSection() {
  const [showForm, setShowForm] = useState(false);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [rating, setRating]     = useState(0);
  const [comment, setComment]   = useState("");
  const [image, setImage]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`);
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) { console.error(err); }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size exceeds 5MB limit");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { setError("Please provide a star rating"); return; }
    setLoading(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, imageUrl: image }),
      });
      if (!res.ok) throw new Error("Failed to submit feedback");
      
      setSubmitted(true);
      fetchFeedbacks();
      setTimeout(() => {
        setShowForm(false);
        setSubmitted(false);
        setRating(0);
        setComment("");
        setImage(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
           <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">Artisan Community Feedback</h2>
           <p className="text-gray-500 text-lg">See what owners and makers are saying about their Vrindaa experience.</p>
        </div>
        <LiquidButton 
          variant="peach" 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <MessageSquare size={18} /> Share Your Experience
        </LiquidButton>
      </div>

      {/* Feedback Wall */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {feedbacks.map((fb, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="liquid-card flex flex-col gap-4"
          >
            <div className="flex gap-1 mb-2">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={14} className={s <= fb.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
              ))}
            </div>
            <p className="text-gray-600 italic leading-relaxed">&quot;{fb.comment}&quot;</p>
            {fb.imageUrl && (
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mt-4">
                 <img src={fb.imageUrl} alt="Feedback" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Verified Interaction</span>
              <span className="text-[10px] text-gray-400">{new Date(fb.createdAt).toLocaleDateString()}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg liquid-card !p-10 shadow-2xl"
            >
              <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>

              {submitted ? (
                <div className="text-center py-12">
                   <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
                   <p className="text-gray-500 uppercase text-[10px] font-black tracking-widest">Your experience matters</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <header>
                    <h3 className="text-2xl font-bold mb-1">Share the Magic</h3>
                    <p className="text-gray-400 text-sm">How was your journey with Vrindaa?</p>
                  </header>

                  {error && <div className="p-3 rounded-xl bg-red-50 text-red-500 text-xs font-bold">{error}</div>}

                  <div className="flex justify-center gap-2 py-4">
                    {[1,2,3,4,5].map(s => (
                      <button 
                         type="button" 
                         key={s} 
                         onClick={() => setRating(s)}
                         onMouseEnter={() => setRating(s)} // Optional: hover to select
                      >
                         <Star size={32} className={`transition-all ${s <= rating ? "fill-yellow-400 text-yellow-400 scale-110" : "text-gray-200"}`} />
                      </button>
                    ))}
                  </div>

                  <textarea 
                    required
                    placeholder="Tell us about the craftsmanship, delivery, or your general experience..."
                    className="liquid-input min-h-[120px]"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />

                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      id="feedback-img"
                      onChange={handleImageChange}
                    />
                    <label 
                      htmlFor="feedback-img"
                      className="flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-gray-100 text-gray-400 hover:border-[#7FD8FF] hover:bg-blue-50/30 transition-all cursor-pointer"
                    >
                      <ImageIcon size={20} />
                      <span className="text-sm font-medium">{image ? "Image selected" : "Add an image (Optional, < 5MB)"}</span>
                    </label>
                    {image && (
                      <div className="mt-4 relative w-24 h-24 rounded-xl overflow-hidden border-2 border-white shadow-md">
                        <img src={image} className="w-full h-full object-cover" />
                        <button onClick={() => setImage(null)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"><X size={12} /></button>
                      </div>
                    )}
                  </div>

                  <LiquidButton 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2 py-4 shadow-xl shadow-[#7FD8FF]/20"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : <><Send size={18} /> Publish My Review</>}
                  </LiquidButton>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
