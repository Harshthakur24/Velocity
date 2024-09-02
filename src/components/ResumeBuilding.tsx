"use client";

import React, { useState } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { motion } from "framer-motion";
import {
  AiOutlineStar,
  AiOutlineBook,
  AiOutlineFileText,
} from "react-icons/ai";

const pdfStyles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#f9f9f9" },
  section: { marginBottom: 15 },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
  },
  heading: { fontSize: 22, marginBottom: 5, color: "#333" },
  subheading: { fontSize: 18, marginBottom: 5, color: "#555" },
  text: { fontSize: 12, marginBottom: 5, color: "#666" },
  icon: { fontSize: 14, marginRight: 8 },
  line: { borderBottom: "1px solid #ddd", marginVertical: 10 },
});

const MyDocument = ({ formData }: any) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={{ marginBottom: 20 }}>
        <Text style={pdfStyles.title}>Resume</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.heading}>{formData.name}</Text>
        <Text style={pdfStyles.subheading}>{formData.profession}</Text>
        <View style={pdfStyles.line} />
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.text}>
          <AiOutlineStar style={pdfStyles.icon} />
          <strong>Skills:</strong> {formData.skills}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.text}>
          <AiOutlineFileText style={pdfStyles.icon} />
          <strong>Experience:</strong> {formData.experience}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.text}>
          <AiOutlineBook style={pdfStyles.icon} />
          <strong>College:</strong> {formData.college}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.text}>
          <AiOutlineStar style={pdfStyles.icon} />
          <strong>Achievements:</strong> {formData.achievements}
        </Text>
      </View>
    </Page>
  </Document>
);

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    skills: "",
    experience: "",
    college: "",
    achievements: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const isFormValid = Object.values(formData).every(
    (field) => field.trim() !== ""
  );

  return (
    <div className="p-8 max-w-lg mx-auto">
      <motion.h1
        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e74e4e] via-[#764ede] to-[#6cd30b] mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Resume Builder
      </motion.h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#764ede] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </motion.div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#764ede] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </motion.div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#764ede] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </motion.div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <textarea
            placeholder="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#764ede] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </motion.div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <input
            type="text"
            placeholder="College"
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#764ede] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </motion.div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <textarea
            placeholder="Achievements"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#764ede] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {isFormValid ? (
            <PDFDownloadLink
              document={<MyDocument formData={formData} />}
              fileName="resume.pdf"
            >
              {({ loading }) => (
                <motion.button
                  type="button"
                  className="w-full bg-blue-500 text-white py-3 hover:scale-105 rounded-md hover:bg-blue-600 transition bg-gradient-to-r from-[#e74e4e] via-[#764ede] to-[#6cd30b]"
                >
                  <span className="font-semibold">Download Resume</span>
                </motion.button>
              )}
            </PDFDownloadLink>
          ) : (
            <motion.button
              type="button"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:scale-105 cursor-not-allowed opacity-50 transition bg-gradient-to-r from-[#e74e4e] via-[#764ede] to-[#6cd30b]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              <span className="font-semibold">Download Resume</span>
            </motion.button>
          )}
        </motion.div>
      </form>
    </div>
  );
};

export default ResumeBuilder;
