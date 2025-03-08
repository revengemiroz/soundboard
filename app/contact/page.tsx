"use client";

import React, { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen p-6 py-12 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
        <div className="text-center ">
          <MessageCircle className="w-24 h-24 text-indigo-600 mx-auto mb-4" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Have questions or need support? Send us a message.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="text"
            required
            placeholder="Subject"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
          <textarea
            required
            rows={4}
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Send size={18} /> Send Message
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          <Mail size={18} className="inline mr-2" />
          <span>support@instantsoundboard.com</span>
          <p className="text-sm text-gray-500 mt-2">
            We typically respond within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
