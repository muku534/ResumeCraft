import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Document, Page, pdfjs } from 'react-pdf';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/app/firebase";
import { getSession, signOut } from "next-auth/react";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const EditorPage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [templateIndex, setTemplateIndex] = useState(0);
    const [templates, setTemplates] = useState([]);
    const [pdfURL, setPdfURL] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [formData, setFormData] = useState({
        // Add form data fields
        name: 'John Doe',
        title: 'Digital Marketer and Business Analyser',
        phone: '+44 1234567890',
        email: 'something@gmail.com',
        location: 'London, UK',
        linkedin: 'in/something',
        github: 'github.com/something',
        website: 'x.com/something',
        profile: `Innovative Digital Marketing Manager with 5+ years of experience managing online marketing campaigns and leading
cross-functional teams. Skilled in developing integrated marketing strategies that drive brand awareness, engagement, and
conversions. Regularly exceed performance targets and possess advanced analytical and problem-solving skills. Adept at
leveraging cutting-edge digital tools and platforms to achieve marketing objectives.`,
        expertise: `Content Marketing - WordPress - Content Strategy - Search Engine Ranking - Data Analysis - Visualizing with Advanced
Charts - Social Media - Email Marketing - User Experience - Digital Strategy - Campaign Management - Lead Generation`,
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
            digitalMarketing: 'Project Management, Social Media Optimization, Content Writing Conversion rate optimization',
            software: 'Project (MSP), Adobe PhotoShop, Audition, Canva'
        },
        languages: {
            english: 'Native',
            french: 'Basic - Learning',
            spanish: 'Native',
            german: 'Basic - A1'
        }
    });


    auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
            // User is signed in.
            setUser(currentUser);
            // console.log("image",user.photoURL);
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

    useEffect(() => {
        // Extract pdfURL from query parameters
        const { pdfURL } = router.query;
        if (pdfURL) {
            fetchTemplates();
        }
    }, [router.query]);

    useEffect(() => {
        if (templates.length > 0) {
            fetchPDF(templates[templateIndex]);
        }
    }, [templateIndex, templates]);

    useEffect(() => {
        const fetchPdfURL = async () => {
            try {
                const userId = user.uid; // Get current user's ID
                const userDocRef = doc(db, "Users", userId);
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
                console.error("Error fetching PDF URL:", error);
            }
        };

        fetchPdfURL();
    }, []);

    const fetchPDF = async (pdfURL) => {
        try {
            const pdfRef = storage.refFromURL(pdfURL);
            const pdfUrl = await pdfRef.getDownloadURL();
            setPdfURL(pdfUrl);
        } catch (error) {
            console.error("Error fetching PDF:", error);
        }
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        updatePDF(); // Call updatePDF on each input change
    };

    const updatePDF = async () => {
        // Update PDF with new data
        try {
            const userId = user.uid; // Get current user's ID
            const userDocRef = doc(db, "Users", userId);
            await updateDoc(userDocRef, {
                templateData: formData
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

    const fetchTemplates = async () => {
        try {
            const userId = user.uid; // Get current user's ID
            const userDocRef = doc(db, "Users", userId);
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
            console.error("Error fetching PDF URL:", error);
        }
    };

    const handleTemplateChange = (index) => {
        setTemplateIndex(index);
    };

    return (
        <div>
            {pdfURL && (
                <div>
                    <div className="flex">
                        <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={1} />
                        </Document>
                    </div>
                    <form>
                        {/* Add input fields for the form */}
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="location"
                            value={formData.location || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="github"
                            value={formData.github || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="website"
                            value={formData.website || ''}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="profile"
                            value={formData.profile || ''}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="expertise"
                            value={formData.expertise || ''}
                            onChange={handleInputChange}
                        />
                        {/* Experience */}
                        {formData.experience.map((exp, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name={`experience[${index}].position`}
                                    value={exp.position || ''}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name={`experience[${index}].company`}
                                    value={exp.company || ''}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name={`experience[${index}].location`}
                                    value={exp.location || ''}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name={`experience[${index}].date`}
                                    value={exp.date || ''}
                                    onChange={handleInputChange}
                                />
                                <textarea
                                    name={`experience[${index}].responsibilities`}
                                    value={exp.responsibilities || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                        {/* Certifications */}
                        {formData.certifications.map((cert, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name={`certifications[${index}]`}
                                    value={cert || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                        {/* Education */}
                        <input
                            type="text"
                            name="education.degree"
                            value={formData.education.degree || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="education.institution"
                            value={formData.education.institution || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="education.location"
                            value={formData.education.location || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="education.date"
                            value={formData.education.date || ''}
                            onChange={handleInputChange}
                        />
                        {/* Education Courses */}
                        {formData.education.courses.map((course, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name={`education.courses[${index}]`}
                                    value={course || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                        {/* Skills */}
                        <input
                            type="text"
                            name="skills.dataVisualization"
                            value={formData.skills.dataVisualization || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="skills.digitalMarketing"
                            value={formData.skills.digitalMarketing || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="skills.software"
                            value={formData.skills.software || ''}
                            onChange={handleInputChange}
                        />
                        {/* Languages */}
                        <input
                            type="text"
                            name="languages.english"
                            value={formData.languages.english || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="languages.french"
                            value={formData.languages.french || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="languages.spanish"
                            value={formData.languages.spanish || ''}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="languages.german"
                            value={formData.languages.german || ''}
                            onChange={handleInputChange}
                        />
                    </form>
                    {templates.map((template, index) => (
                        <button key={index} onClick={() => handleTemplateChange(index)}>
                            Template {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EditorPage;
