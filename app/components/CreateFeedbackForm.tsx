"use client";

import { createFeedback } from "@/app/actions/feedback";
import { useState } from "react";

export default function CreateFeedbackForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await createFeedback(formData);
      alert("Your feedback has been added successfully!");
    } catch (error: any) {
      alert(error.message || "An error occurred while adding feedback");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4 max-w-lg">
      <h3 className="font-bold text-xl text-gray-800">Add New Suggestion</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          name="title"
          type="text"
          required
          placeholder="e.g., Add Dark Mode"
          className="w-full border border-gray-300 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select name="category" className="w-full border border-gray-300 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="Feature">Feature (New feature)</option>
          <option value="Bug">Bug (Technical issue)</option>
          <option value="Improvement">Improvement (Enhancement)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          required
          rows={3}
          placeholder="Explain the idea in detail..."
          className="w-full border border-gray-300 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Suggestion"}
      </button>
    </form>
  );
}