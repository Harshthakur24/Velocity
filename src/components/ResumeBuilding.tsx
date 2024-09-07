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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.text}>
          <strong>Certifications:</strong> {formData.certifications}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.text}>
          <strong>Projects:</strong> {formData.projects}
        </Text>
      </View>
    </Page>
  </Document>
);

const ResumeBuilder: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    skills: "",
    experience: "",
    college: "",
    achievements: "",
    certifications: "",
    projects: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill out all sections before downloading!", {
        position: "top-right",
      });
    }
  };

  const isFormValid = Object.values(formData).every(
    (field) => field.trim() !== ""
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.h1
        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Resume<span className="text-primary"> Builder</span>
      </motion.h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          {[
            "name",
            "profession",
            "skills",
            "experience",
            "college",
            "achievements",
            "certifications",
            "projects",
            "email",
            "phone",
            "linkedin",
            "github",
          ].map((field, index) => (
            <motion.div
              key={field}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {field === "experience" || field === "achievements" ? (
                <textarea
                  placeholder={capitalizeFirstLetter(field)}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border-2 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  placeholder={capitalizeFirstLetter(field)}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border-2 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              )}
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          {isFormValid ? (
            <PDFDownloadLink
              document={<MyDocument formData={formData} />}
              fileName={`${formData.name}_resume.pdf`}
              className="w-auto bg-primary text-white py-3 rounded-md px-3 transition bg-gradient-to-r hover:bg-blue-500"
            >
              {({ loading }) =>
                loading ? "Generating PDF..." : "Download Your Resume"
              }
            </PDFDownloadLink>
          ) : (
            <button
              type="submit"
              className="w-auto bg-gray-400 cursor-not-allowed py-3 px-3 rounded-md transition"
              onClick={handleSubmit}
            >
              Download Your Resume
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default ResumeBuilder;
