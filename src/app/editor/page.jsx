"use client"

import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { Document, Page, pdfjs } from 'react-pdf';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/src/app/firebase";
import { getSession, signOut } from "next-auth/react";
import { Input, Textarea } from "@nextui-org/react";
import jsPDF from 'jspdf';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const EditorPage = () => {
    const [user, setUser] = useState(null);
    // const router = useRouter();
    const [pdfURL, setPdfURL] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [templateIndex, setTemplateIndex] = useState(0);
    const [templates, setTemplates] = useState([]);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const variants = ["flat", "bordered", "underlined", "faded"];

    const [formData, setFormData] = useState({
        name: 'FIRSTNAME LASTNAME',
        phone: '+1(123) 456-7890',
        location: 'San Francisco, CA',
        email: 'contact@ResumeCraft.com',
        title: 'Digital Marketer and Business Analyst',
        linkedin: 'LinkedIn',
        website: 'www.ResumeCraft.com',
        github: 'github.com/something',
        profile: `Innovative Digital Marketing Manager with 5+ years of experience managing online marketing campaigns and leading cross-functional teams. Skilled in developing integrated marketing strategies that drive brand awareness, engagement, and conversions. Regularly exceed performance targets and possess advanced analytical and problem-solving skills. Adept at leveraging cutting-edge digital tools and platforms to achieve marketing objectives.`,
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


    // const handleInputChange = (e, fieldName) => {
    //     const { value } = e.target;
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         [fieldName]: value
    //     }));
    // };

    auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
            // User is signed in.
            setUser(currentUser);
            console.log("User UID:", currentUser.uid); // Log user UID here
        } else {
            // No user is signed in.
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

    // useEffect(() => {
    //     // Extract pdfURL from query parameters
    //     const { pdfURL } = router.query;
    //     if (pdfURL) {
    //         fetchPDF(pdfURL);
    //     }
    // }, [router.query]);

    useEffect(() => {
        if (templates.length > 0) {
            fetchPDF(templates[templateIndex]);
        }
    }, [templateIndex, templates]);

    useEffect(() => {
        const fetchPdfURL = async () => {
            try {
                if (user) { // Check if user is not null
                    const userId = user.uid; // Get current user's ID
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
    }, [user]); // Add user to the dependency array


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
        // Update PDF with new data
        try {
            const userId = user.uid; // Get current user's ID
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        updatePDF(); // Call updatePDF on each input change
    };

    const generatePDF = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Define the content of your PDF
        const content = document.getElementById("resume-container");

        // Convert the content to a PDF
        doc.html(content, {
            callback: function (pdf) {
                // Save the PDF
                pdf.save("resume.pdf");
            }
        });
    };



    return (
        <div>
            {pdfURL && (
                <div>
                    {/** <div className="flex">
                        <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={1} />
                        </Document>
                    </div>  */}

                </div>
            )}

            <Navbar>
                <NavbarBrand>
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button onClick={generatePDF} color="primary" href="#" variant="flat">
                            Download Pdf
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            <div className="flex lg:flex-row flex-col justify-center">
                <div id="resume-container" className="mt-10 mx-10 max-w-3xl px-4 py-8 shadow-xl">
                    <header className="text-center">
                        <h1 className="text-3xl font-bold">{formData.name}</h1>
                        <p className="mt-1">
                            <a href="tel:+11234567890" className="text-sm font-normal text-blue-700 mr-2">{formData.phone}</a>|
                            <span className="text-sm font-normal ml-2 mr-2">{formData.location}</span>
                            <br />
                            <a href="mailto:contact@ResumeCraft.com" className="text-sm font-normal text-blue-700  mr-2">{formData.email}</a>|
                            <a href="https://linkedin.com/company/ResumeCraft" className="text-sm font-normal text-blue-700 ml-2 mr-2">{formData.linkedin}</a>|
                            <a href="www.ResumeCraft.com" className="text-sm font-normal text-blue-700 ml-2">{formData.website}</a>
                        </p>
                    </header>
                    <section className="mt-8">
                        <h2 className="text-md font-bold">SUMMARY</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <p className="text-sm font-normal text-gray-900">{formData.profile}</p>
                    </section>
                    <section className="mt-4">
                        <h2 className="text-md font-bold">EDUCATION</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <ul className="list-disc pl-6">
                            <li className="text-sm font-normal text-gray-900">
                                <strong className="mr-2">{formData.education.degree}</strong>
                                {formData.education.institution}
                            </li>
                            <p className="text-sm font-normal text-gray-900">{formData.education.date}</p>
                            {formData.education.courses.map((course, index) => (
                                <p key={index} className="text-sm font-normal">{course}</p>
                            ))}
                        </ul>
                    </section>
                    <section className="mt-4">
                        <h2 className="text-md font-bold">SKILLS</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <div className="flex flex-row">
                            <div>
                                {Object.keys(formData.skills).map((category, index) => (
                                    <h3 key={index} className="text-sm text-gray-900 font-bold mb-1">{formData.skills[category]}</h3>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="mt-4">
                        <h2 className="text-md font-bold">EXPERIENCE</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <div className="space-y-4">
                            {formData.experience.map((exp, index) => (
                                <div key={index}>
                                    <ul className="list-disc">
                                        <div className="flex flex-row justify-between">
                                            <div>
                                                <h3 className="text-sm font-bold">{exp.position}</h3>
                                                <p className="text-sm font-normal">{exp.company}</p>
                                            </div>
                                            <div className="">
                                                <p className="text-sm font-normal">{exp.date}</p>
                                                <p className="text-sm font-normal">{exp.location}</p>
                                            </div>
                                        </div>
                                        <div className="pl-10 pt-1">
                                            {exp.responsibilities.map((responsibility, index) => (
                                                <li key={index} className="text-sm font-normal">{responsibility}</li>
                                            ))}
                                        </div>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="mt-4">
                        <h2 className="text-md font-bold">PROJECTS</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <div className="">
                            <div>
                                <ui>
                                    <div className="mb-2">
                                        <li className="text-sm font-bold">Hiring Search Tool</li>
                                        <p className="text-sm font-normal pl-5">Built a tool to search for Hiring Managers and Recruiters by using ReactJS, NodeJS, Firebase and boolean queries. Over 25000 people have used it so far, with 5000+ queries being saved and shared, and search results even better than LinkedIn! <a href="https://hiring-search.careerflow.ai/">(Try it here)</a></p>
                                    </div>
                                    <div className="mb-2">
                                        <li className="text-sm font-bold">Hiring Search Tool</li>
                                        <p className="text-sm font-normal pl-5">Built a tool to search for Hiring Managers and Recruiters by using ReactJS, NodeJS, Firebase and boolean queries. Over 25000 people have used it so far, with 5000+ queries being saved and shared, and search results even better than LinkedIn! <a href="https://hiring-search.careerflow.ai/">(Try it here)</a></p>
                                    </div>
                                </ui>
                            </div>
                            {/* Add more project items similarly */}
                        </div>
                    </section>
                    <section className="mt-4">
                        <h2 className="text-md font-bold">EXTRA-CURRICULAR ACTIVITIES</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <ul className="list-disc pl-6 ">
                            <div className="mb-2">
                                <li className="text-sm font-normal ">Actively write <a href="https://www.ResumeCraft.com/blog/">blog posts</a> and social media posts (<a href="https://www.tiktok.com/@ResumeCraft">TikTok</a>, <a href="https://www.instagram.com/ResumeCraft/?hl=en">Instagram</a>) viewed by over 20K+ job seekers per week to help people with best practices to land their dream jobs.</li>
                            </div>
                            <div className="mb-2">
                                <li className="text-sm font-normal ">Actively write <a href="https://www.ResumeCraft.com/blog/">blog posts</a> and social media posts (<a href="https://www.tiktok.com/@ResumeCraft">TikTok</a>, <a href="https://www.instagram.com/ResumeCraft/?hl=en">Instagram</a>) viewed by over 20K+ job seekers per week to help people with best practices to land their dream jobs.</li>
                            </div>
                        </ul>
                    </section>
                    <section className="mt-4">
                        <h2 className="text-md font-bold">LEADERSHIP</h2>
                        <hr className="border-gray-700 border-b-1 mb-2" />
                        <ul className="list-disc pl-6">
                            <div className="mb-2">
                                <li className="text-sm font-normal">Admin for the <a href="https://discord.com/invite/WWbjEaZ">ResumeCraft Discord community</a> with over 6000+ job seekers and industry mentors. Actively involved in facilitating online events, career conversations, and more alongside other admins and a team of volunteer moderators!</li>
                                {/* Add more leadership items similarly */}
                            </div>
                        </ul>
                    </section>
                </div>

                <div className="lg:mt-40 mt-16 lg:mx-0 mx-5">
                    <div className="flex w-full grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 flex-row mb-6 md:mb-0 gap-1">
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
                            label="Summery"
                            labelPlacement="outside"
                            value={formData.profile}
                            onChange={(e) => handleInputChange(e, "profile")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;