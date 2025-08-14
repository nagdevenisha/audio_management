import React from 'react';
import { ChevronLeft, Calendar, Clock, MapPin ,Radio,Upload} from "lucide-react";

export default function Workspace() {
  return (
   <div className="min-h-screen bg-white px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-purple-600 font-medium hover:text-purple-800 transition mb-4"
      >
        <ChevronLeft className="mr-1 w-5 h-5" />
        Back to Teams
      </button>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-purple-700 mb-1">
        Quality Review Workspace
      </h1>
      <p className="text-gray-600 mb-8">
        Radio City Quality Team - Review auto-labeled segments from fingerprint
        matching system
      </p>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Select City */}
        <div className="bg-white shadow-md border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold">Select City</h2>
          </div>
          <label className="block text-sm text-gray-700 mb-2">
            Choose city
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select city...</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="bangalore">Bangalore</option>
            <option value="pune">Pune</option>
          </select>
        </div>

        {/* Select Date */}
        <div className="bg-white shadow-md border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold">Select Date</h2>
          </div>
          <label className="block text-sm text-gray-700 mb-2">
            Choose date to review
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Select Time Duration */}
        <div className="bg-white shadow-md border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold">Select Radio Station</h2>
          </div>
          <label className="block text-sm text-gray-700 mb-2">
            Choose station
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Radio Station</option>
            <option value="Radio city">Radio city</option>
            <option value="Red fm">Red fm</option>
            <option value="Radio mirchi">Radio mirchi</option>
            <option value="Radio Tadka">Radio Tadka</option>
          </select>
        </div>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 top-2">
        {/* Master Fingerprints */}
        <div className="bg-white shadow-md border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Radio className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold">Master Fingerprints</h2>
          </div>
          <button className="flex items-center justify-center w-full border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition">
            <Upload className="w-4 h-4 mr-2" /> Add Master Fingerprint
          </button>
          <p className="text-sm text-gray-500 mt-2">0 fingerprints uploaded</p>
        </div>

        {/* Recordings */}
        <div className="bg-white shadow-md border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Upload className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold">Recordings</h2>
          </div>
          <button className="flex items-center justify-center w-full border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition">
            <Upload className="w-4 h-4 mr-2" /> Add Recording
          </button>
          <p className="text-sm text-gray-500 mt-2">0 recordings uploaded</p>
        </div>
      </div>
    </div>
  )
}