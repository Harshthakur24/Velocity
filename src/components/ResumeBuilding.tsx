"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-separator";

import {
  PlusCircle,
  Trash2,
  Download,
  Briefcase,
  GraduationCap,
  Code,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: { institution: string; degree: string; year: string }[];
  skills: string[];
}

export default function ProfessionalDarkResume() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", year: "" }],
    skills: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: keyof ResumeData,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (section === "skills" && typeof index === "number") {
      setResumeData((prev) => ({
        ...prev,
        skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
      }));
    } else if (
      section &&
      typeof index === "number" &&
      Array.isArray(resumeData[section])
    ) {
      setResumeData((prev) => ({
        ...prev,
        [section]: (prev[section] as any[]).map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    } else {
      setResumeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addItem = (section: "experience" | "education" | "skills") => {
    setResumeData((prev) => ({
      ...prev,
      [section]:
        section === "skills"
          ? [...prev[section], ""]
          : [...prev[section], {} as any],
    }));
  };

  const removeItem = (
    section: "experience" | "education" | "skills",
    index: number
  ) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const downloadPDF = () => {
    const input = document.getElementById("resume-preview");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("resume.pdf");
      });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-black-800 text-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-center">Resume Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Personal Information section */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <Input
              name="name"
              placeholder="Full Name"
              value={resumeData.name}
              onChange={handleInputChange}
              className="mb-2 bg-gray-800 text-gray-100 border-gray-700"
            />
            <Input
              name="title"
              placeholder="Professional Title"
              value={resumeData.title}
              onChange={handleInputChange}
              className="mb-2 bg-gray-800 text-gray-100 border-gray-700"
            />
            <Input
              name="email"
              placeholder="Email"
              type="email"
              value={resumeData.email}
              onChange={handleInputChange}
              className="mb-2 bg-gray-800 text-gray-100 border-gray-700"
            />
            <Input
              name="phone"
              placeholder="Phone"
              type="tel"
              value={resumeData.phone}
              onChange={handleInputChange}
              className="mb-2 bg-gray-800 text-gray-100 border-gray-700"
            />
            <Input
              name="location"
              placeholder="Location"
              value={resumeData.location}
              onChange={handleInputChange}
              className="mb-2 bg-gray-800 text-gray-100 border-gray-700"
            />
            <Textarea
              name="summary"
              placeholder="Professional Summary"
              value={resumeData.summary}
              onChange={handleInputChange}
              className="bg-gray-800 text-gray-100 border-gray-700"
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded border-gray-700 bg-gray-800"
              >
                <Input
                  name="company"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleInputChange(e, "experience", index)}
                  className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
                />
                <Input
                  name="position"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => handleInputChange(e, "experience", index)}
                  className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
                />
                <Input
                  name="duration"
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => handleInputChange(e, "experience", index)}
                  className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
                />
                <Textarea
                  name="description"
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => handleInputChange(e, "experience", index)}
                  className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem("experience", index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                </Button>
              </div>
            ))}
            <Button onClick={() => addItem("experience")}>
              <PlusCircle className="w-4 h-4 mr-2" /> Add Experience
            </Button>
          </section>

          {/* Education section */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded border-gray-700 bg-gray-800"
              >
                <Input
                  name="institution"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleInputChange(e, "education", index)}
                  className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
                />
                <Input
                  name="degree"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleInputChange(e, "education", index)}
                  className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
                />
                <Input
                  name="year"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => handleInputChange(e, "education", index)}
                  className="mb-2 bg-gray-700 text-gray-100 border-gray-600"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem("education", index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                </Button>
              </div>
            ))}
            <Button onClick={() => addItem("education")}>
              <PlusCircle className="w-4 h-4 mr-2" /> Add Education
            </Button>
          </section>

          {/* Skills section */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="mb-2 flex items-center">
                <Input
                  placeholder="Skill"
                  value={skill}
                  onChange={(e) => handleInputChange(e, "skills", index)}
                  className="mr-2 bg-gray-800 text-gray-100 border-gray-700"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem("skills", index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button onClick={() => addItem("skills")}>
              <PlusCircle className="w-4 h-4 mr-2" /> Add Skill
            </Button>
          </section>
        </div>

        {/* Resume Preview section */}
        <div
          id="resume-preview"
          className="bg-gray-800 text-gray-100 p-8 rounded-lg shadow-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Resume Preview</h2>
            <Button variant="outline" onClick={downloadPDF}>
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
          <div className="space-y-6">
            <div className="text-center border-b border-gray-700 pb-6">
              <h3 className="text-4xl font-bold text-blue-400">
                {resumeData.name}
              </h3>
              <p className="text-xl text-gray-400 mt-2">{resumeData.title}</p>
              <div className="flex justify-center space-x-4 text-sm mt-4 text-gray-400">
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" /> {resumeData.email}
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" /> {resumeData.phone}
                </p>
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> {resumeData.location}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-blue-400 flex items-center">
                <User className="w-5 h-5 mr-2" /> Professional Summary
              </h4>
              <p className="text-gray-300">{resumeData.summary}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-blue-400 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" /> Work Experience
              </h4>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-gray-200">
                      {exp.position}
                    </p>
                    <p className="text-gray-400 text-sm">{exp.duration}</p>
                  </div>
                  <p className="text-gray-300">{exp.company}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-blue-400 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" /> Education
              </h4>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-gray-200">{edu.degree}</p>
                    <p className="text-gray-400 text-sm">{edu.year}</p>
                  </div>
                  <p className="text-gray-300">{edu.institution}</p>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-blue-400 flex items-center">
                <Code className="w-5 h-5 mr-2" /> Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map(
                  (skill, index) =>
                    skill && (
                      <span
                        key={index}
                        className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
