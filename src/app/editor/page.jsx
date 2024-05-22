"use client"

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/src/app/firebase";
import { getSession } from "next-auth/react";
import { Input, Textarea, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

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

            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="max-w-3xl mx-10 my-10 p-6 bg-white rounded-lg shadow-xl">
                    <div id="resume-container" className="p-2">
                        <h1 className="text-center pb-1 text-3xl font-bold">{formData.name}</h1>
                        <p className="text-center pb-1 text-xs">{formData.phone} | {formData.location}</p>
                        <p className="text-center pb-1 text-xs">LinkedIn: {formData.linkedin} | Website: {formData.website} | GitHub: {formData.github}</p>

                        <h2 className="font-bold mt-5">Profile</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <p className="text-xs">{formData.profile}</p>

                        <h2 className="font-bold mt-5">Experience</h2>
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

                        <h2 className="font-bold mt-5">Education</h2>
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

                        <h2 className="font-bold mt-5">Certifications</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <ul className="list-disc list-inside">
                            {formData.certifications.map((cert, index) => (
                                <li key={index} className="text-xs">{cert}</li>
                            ))}
                        </ul>

                        <h2 className="font-bold mt-5">Skills</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <p className="text-xs">Data Visualization: {formData.skills.dataVisualization}</p>
                        <p className="text-xs">Digital Marketing: {formData.skills.digitalMarketing}</p>
                        <p className="text-xs">Software: {formData.skills.software}</p>

                        <h2 className="font-bold mt-5">Languages</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <p className="text-xs">English: {formData.languages.english}</p>
                        <p className="text-xs">French: {formData.languages.french}</p>
                        <p className="text-xs">Spanish: {formData.languages.spanish}</p>
                        <p className="text-xs">German: {formData.languages.german}</p>
                    </div>
                </div>

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

            </div>
        </>
    );
};

export default EditorPage;
