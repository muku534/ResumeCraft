"use client"

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/src/app/firebase";
import { getSession } from "next-auth/react";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import { Input, Textarea } from "@nextui-org/react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const PlayfairDisplay = Playfair_Display({ subsets: ['latin'] });

const EditorPage = () => {
    const [user, setUser] = useState(null);
    const [pdfURL, setPdfURL] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [templateIndex, setTemplateIndex] = useState(0);
    const [templates, setTemplates] = useState([]);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: 'FIRSTNAME LASTNAME',
        phone: '+1(123) 456-7890',
        location: 'San Francisco, CA',
        email: 'contact@ResumeCraft.com',
        title: 'Digital Marketer and Business Analyst',
        linkedin: 'LinkedIn',
        website: 'www.ResumeCraft.com',
        github: 'github.com/something',
        profile: `Innovative Digital Marketing Manager with 5+ years of experience managing online marketing campaigns and leading cross-functional teams. `,
        expertise: `Content Marketing - WordPress - Content Strategy - Search Engine Ranking - Data Analysis - Visualizing with Advanced Charts - Social Media - Email Marketing - User Experience - Digital Strategy - Campaign Management - Lead Generation`,
        experience: [
            {
                position: 'Digital Marketing Strategist',
                company: 'Stellar Systems',
                location: 'Las Vegas, NV',
                date: '06/2023 - present',
                responsibilities: [
                    'Developed strategic plans for campaigns across email, social media, SEO/SEM, and display advertising techniques.',
                    'Developed and implemented digital marketing strategies that generated over $850,000 in revenue in 2023.',
                    'Oversee the execution of SEO, SEM, email, social media, and display advertising campaigns, achieving a 12% decrease in cost per acquisition.'
                ]
            },
            {
                position: 'Digital Account Manager',
                company: 'Synapse Solutions',
                location: 'Las Vegas, NV',
                date: '01/2023 - 05/2023',
                responsibilities: [
                    'Implemented promotional activities such as re-targeting campaigns for e-commerce businesses.',
                    'Monitored the performance of PPC campaigns through Google Adwords.',
                    'Managed and optimized PPC campaigns, resulting in a 5% increase in click-through rates.'
                ]
            }
        ],
        certifications: [
            'Introduction to Digital Marketing (Jan. 2023) - SEMRUSH',
            'Career Essentials in Digital Marketing by LinkedIn (Aug. 2022) - LinkedIn',
            'Visualization with Tableau (Feb. 2022) - Coursera'
        ],
        education: {
            degree: 'BSc Computer Science',
            institution: 'University of Las Vegas',
            location: 'Las Vegas, USA',
            date: '2020-2024',
            courses: [
                'Software and Hardware',
                'Data Visualization',
                'Business Intelligence',
                'Digital Marketing',
                'Time Series Analysis & Forecasting'
            ]
        },
        skills: {
            dataVisualization: 'Microsoft Power BI, Excel',
            digitalMarketing: 'Project Management, Social Media Optimization, Content Writing, Conversion Rate Optimization',
            software: 'Project (MSP), Adobe PhotoShop, Audition, Canva'
        },
        languages: {
            english: 'Native',
            french: 'Basic - Learning',
            spanish: 'Native',
            german: 'Basic - A1'
        }
    });

    const handleInputChange = (e, fieldName, nestedFieldName = null) => {
        const { value } = e.target;
        if (nestedFieldName) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [fieldName]: {
                    ...prevFormData[fieldName],
                    [nestedFieldName]: value
                }
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [fieldName]: value
            }));
        }
    };

    auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
            setUser(currentUser);
            console.log("User UID:", currentUser.uid);
        } else {
            setUser(null);
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();
            setSession(session);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (templates.length > 0) {
            fetchPDF(templates[templateIndex]);
        }
    }, [templateIndex, templates]);

    useEffect(() => {
        const fetchPdfURL = async () => {
            try {
                if (user) {
                    const userId = user.uid;
                    const userDocRef = doc(db, "Users", userId);
                    const userDocSnapshot = await getDoc(userDocRef);
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        if (userData.templatePDF) {
                            fetchPDF(userData.templatePDF);
                        } else {
                            console.log("No PDF URL found in the user's document");
                        }
                    } else {
                        console.log("User document does not exist");
                    }
                }
            } catch (error) {
                console.error("Error fetching PDF URL:", error);
            }
        };
        fetchPdfURL();
    }, [user]);

    const fetchPDF = async (pdfURL) => {
        try {
            const response = await fetch(`/api/proxyPdf?url=${encodeURIComponent(pdfURL)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch PDF file.');
            }
            const pdfBlob = await response.blob();
            setPdfURL(URL.createObjectURL(pdfBlob));
        } catch (error) {
            console.error("Error fetching PDF:", error);
        }
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const updatePDF = async () => {
        try {
            const userId = user.uid;
            const userDocRef = doc(db, "Users", userId);
            await updateDoc(userDocRef, {
                templatePDF: formData
            });
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                if (userData.templatePDF) {
                    setTemplates(userData.templatePDF);
                } else {
                    console.log("No PDF URL found in the user's document");
                }
            } else {
                console.log("User document does not exist");
            }
        } catch (error) {
            console.error("Error updating PDF:", error);
        }
    };

    const handleTemplateChange = (index) => {
        setTemplateIndex(index);
    };

    const extractLinkedInName = (url) => {
        const parts = url.split('/');
        const namePartIndex = parts.findIndex(part => part === 'in');
        if (namePartIndex !== -1 && parts[namePartIndex + 1]) {
            const nameWithHyphen = parts[namePartIndex + 1].split('-')[0];
            const name = nameWithHyphen.toUpperCase();
            return name;
        } else {
            return 'LINKEDIN';
        }
    };

    const generatePDF = async () => {
        const content = document.getElementById("resume-container");
        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("resume.pdf");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar>
                <NavbarBrand>
                    <Image src="/assets/logo (1).png" alt="Logo" width={50} height={50} />
                    <p className="font-bold text-inherit text-xl">ResumeCraft</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button onClick={generatePDF} color="primary" href="#" variant="flat">
                            Download Pdf
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            <div className="min-h-screen flex flex-row  justify-center bg-gray-100">
                <div className="max-w-3xl mx-5 my-10 p-6 bg-white rounded-lg shadow-xl">
                    <div id="resume-container" className="">
                        <h1 className="text-center pb-1 text-2xl" style={{ fontFamily: PlayfairDisplay }}>{formData.name}</h1>
                        <p className="text-center text-xs">{formData.phone} | {formData.location}</p>
                        <p className="text-center text-xs">
                            <Link href={formData.linkedin}>{formData.linkedin}</Link> |
                            <Link href={formData.website}>{formData.website}</Link> |
                            <Link href={formData.github}>{formData.github}</Link>
                        </p>

                        <h2 className="font-bold mt-5">OBJECTIVE</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <p className="text-xs">{formData.profile}</p>

                        <h2 className="font-bold mt-5">EXPERIENCE</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        {formData.experience.map((exp, index) => (
                            <div key={index} >
                                <h3 className="font-bold">{exp.position} - {exp.company}</h3>
                                <p className="text-xs">{exp.location} | {exp.date}</p>
                                <ul className="list-disc list-inside">
                                    {exp.responsibilities.map((resp, respIndex) => (
                                        <li key={respIndex} className="text-xs">{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <h2 className="font-bold mt-5">EDUCATION</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center">
                                <h3 className="font-bold">{formData.education.degree}</h3>
                                <p className="pl-1 text-xs">{formData.education.institution}</p>
                            </div>
                            <p className="text-xs">{formData.education.date}</p>
                        </div>
                        <ul className="list-disc list-inside">
                            {formData.education.courses.map((course, index) => (
                                <li key={index} className="text-xs">{course}</li>
                            ))}
                        </ul>

                        <h2 className="font-bold mt-5">CERTIFICATIONS</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <ul className="list-disc list-inside">
                            {formData.certifications.map((cert, index) => (
                                <li key={index} className="text-xs">{cert}</li>
                            ))}
                        </ul>

                        <h2 className="font-bold mt-5">SKILLS</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <p className="text-xs">Data Visualization: {formData.skills.dataVisualization}</p>
                        <p className="text-xs">Digital Marketing: {formData.skills.digitalMarketing}</p>
                        <p className="text-xs">Software: {formData.skills.software}</p>

                        <h2 className="font-bold mt-5">LANGUAGE</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <p className="text-xs">English: {formData.languages.english}</p>
                        <p className="text-xs">French: {formData.languages.french}</p>
                        <p className="text-xs">Spanish: {formData.languages.spanish}</p>
                        <p className="text-xs">German: {formData.languages.german}</p>
                    </div>
                </div>

                <div className="lg:mt-10 mt-16  p-10 lg:mx-5 mx-5 bg-white">
                    <div className="flex w-full grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-2 flex-row mb-6 md:mb-0 gap-1">
                        <Input
                            type="text"
                            label="Name"
                            labelPlacement="outside"
                            value={formData.name}
                            onChange={(e) => handleInputChange(e, "name")}
                        />
                        <Input
                            type="phone"
                            label="Phone"
                            labelPlacement="outside"
                            value={formData.phone}
                            onChange={(e) => handleInputChange(e, "phone")}
                        />
                        <Input
                            type="text"
                            label="Address"
                            labelPlacement="outside"
                            value={formData.location}
                            onChange={(e) => handleInputChange(e, "location")}
                        />
                        <Input
                            type="email"
                            label="Email"
                            labelPlacement="outside"
                            value={formData.email}
                            onChange={(e) => handleInputChange(e, "email")}
                        />
                        <Input
                            type="text"
                            label="Linkedin"
                            labelPlacement="outside"
                            value={formData.linkedin}
                            onChange={(e) => handleInputChange(e, "linkedin")}
                        />
                        <Input
                            type="text"
                            label="Website"
                            labelPlacement="outside"
                            value={formData.website}
                            onChange={(e) => handleInputChange(e, "website")}
                        />
                    </div>

                    <div className="flex w-full mt-5">
                        <Textarea
                            type="text"
                            label="Objective"
                            labelPlacement="outside"
                            value={formData.profile}
                            onChange={(e) => handleInputChange(e, "profile")}

                        />
                    </div>

                    <div className="mt-5 flex w-full grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-2 flex-row mb-6 md:mb-0 gap-1">
                        <Input
                            type="text"
                            label="Degree"
                            labelPlacement="outside"
                            value={formData.education.degree}
                            onChange={(e) => handleInputChange(e, "education", "degree")}

                        />

                        <Input
                            type="text"
                            label="Institution"
                            labelPlacement="outside"
                            value={formData.education.institution}
                            onChange={(e) => handleInputChange(e, "education", "institution")}
                        />
                        <Input
                            type="text"
                            label="location"
                            labelPlacement="outside"
                            value={formData.education.location}
                            onChange={(e) => handleInputChange(e, "education", "location")}
                        />
                        <Input
                            type="date"
                            label="Course date"
                            labelPlacement="outside"
                            value={formData.education.date}
                            onChange={(e) => handleInputChange(e, "education", "date")}
                        />

                    </div>
                    <div className="flex w-full mt-5">
                        <Textarea
                            type="text"
                            label="Courses"
                            labelPlacement="outside"
                            value={formData.education.courses}
                            onChange={(e) => handleInputChange(e, "education", "courses")}
                        />
                    </div>

                    <div className="mt-5 flex w-full grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-2 flex-row mb-6 md:mb-0 gap-1">
                        <Input
                            type="text"
                            label="Position"
                            labelPlacement="outside"
                            value={formData.experience.position}
                            onChange={(e) => handleInputChange(e, "experience", "position")}

                        />

                        <Input
                            type="text"
                            label="Company"
                            labelPlacement="outside"
                            value={formData.experience.company}
                            onChange={(e) => handleInputChange(e, "experience", "company")}
                        />
                        <Input
                            type="text"
                            label="location"
                            labelPlacement="outside"
                            value={formData.experience.location}
                            onChange={(e) => handleInputChange(e, "experience", "location")}
                        />
                        <Input
                            type="date"
                            label="Course date"
                            labelPlacement="outside"
                            value={formData.experience.date}
                            onChange={(e) => handleInputChange(e, "experience", "date")}
                        />

                    </div>
                    <div className="flex w-full mt-5">
                        <Textarea
                            type="text"
                            label="Courses"
                            labelPlacement="outside"
                            value={formData.education.courses}
                            onChange={(e) => handleInputChange(e, "education", "courses")}
                        />
                    </div>
                </div>

                {/**
                {pdfURL && (
                    <div className="mt-10">
                        <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.from(new Array(numPages), (el, index) => (
                                // <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false``} />
                                <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} scale={1} />
                            ))}
                        </Document>
                    </div>
                )}
 */}
            </div>
        </>
    );
};

export default EditorPage;
