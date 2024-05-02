"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { auth, db, storage } from "@/src/app/firebase";
import Link from "next/link";
// import { useRouter } from "next/router";
import ColoredDots from "../style/ColoredDots ";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage"; // Updated imports
import { Document, Page, pdfjs } from 'react-pdf';
import { getSession, signOut } from "next-auth/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Templates = () => {
    // State variables to manage user and templates
    const [user, setUser] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    // Fetch user data on component mount
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     const fetchTemplates = async () => {
    //         try {
    //             const templatesRef = ref(storage, "ResumeTemplates");
    //             const templatesList = await listAll(templatesRef);
    //             const templatesData = await Promise.all(
    //                 templatesList.items.map(async (item) => {
    //                     const pdfURL = await getDownloadURL(item);
    //                     return {
    //                         id: item.name,
    //                         pdfURL,
    //                     };
    //                 })
    //             );
    //             setTemplates(templatesData);
    //         } catch (error) {
    //             console.error("Error fetching templates:", error);
    //         }
    //     };

    //     fetchTemplates();
    // }, []);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const templatesRef = ref(storage, "ResumeTemplates");
                const templatesList = await listAll(templatesRef);
                const templatesData = await Promise.all(
                    templatesList.items.map(async (item) => {
                        const pdfURL = await getDownloadURL(item);
                        // Directly pass pdfURL to the proxy route
                        const proxyURL = `/api/proxyPdf?url=${encodeURIComponent(pdfURL)}`;
                        return {
                            id: item.name,
                            pdfURL: proxyURL, // Updated pdfURL with the proxy URL
                        };
                    })
                );
                setTemplates(templatesData);
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        };

        fetchTemplates();
    }, []);

    const handleTemplateClick = async (pdfURL) => {
        if (!user) {
            alert("User authentication failed. Please try again.");
            return;
        }
        try {
            // Check if the user exists in the users collection
            const userDoc = await getDoc(doc(db, "Users", user.uid));
            if (!userDoc.exists()) {
                alert("User not found in the database. Please try again.");
                return;
            }

            // Proceed with handling the template click
            const response = await fetch(pdfURL);
            if (!response.ok) {
                throw new Error('Failed to fetch PDF file.');
            }
            const pdfBlob = await response.blob();

            // Upload the PDF file to Firebase Storage
            const storageRef = ref(storage, `${user.uid}/uploaded_template.pdf`);
            await uploadBytes(storageRef, pdfBlob);
            const uploadedPdfURL = await getDownloadURL(storageRef);

            // Store the uploaded PDF URL in the user's document
            await setDoc(doc(db, "Users", user.uid), { templatePDF: uploadedPdfURL }, { merge: true });
            console.log("PDF uploaded and URL stored successfully!");

            // Navigate the user to the editor page immediately and pass the PDF URL as a query parameter
            // router.push(`/editor?pdfURL=${encodeURIComponent(uploadedPdfURL)}`);
            router.push(`/editor?pdfURL=${encodeURIComponent(uploadedPdfURL)}`);
        } catch (error) {
            console.error("Error handling template click:", error);
            alert("Failed to handle template click. Please try again later. Error: " + error.message);
        }
    };

    return (
        <div id="Templates">
            <section className="bg-white antialiased bg-cover " style={{ backgroundImage: `url('/assets/ring-bg.png')`, backgroundRepeat: 'no-repeat' }}>
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-5 mt-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="flex justify-center mb-5">
                            <ColoredDots />
                        </div>
                        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-2xl dark:text-gray-800">
                            Our Creative Templates
                        </h2>
                        <hr className="w-32 h-1 mx-auto my-2 bg-indigo-300 border-0 rounded md:my-1 dark:bg-indigo-300"></hr>
                        <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </p>
                    </div>

                    <div className="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {templates.map((template) => (
                            <ProjectCard
                                key={template.id}
                                templateId={template.id}
                                thumbnail={template.thumbnail}
                                pdfURL={template.pdfURL} // Pass pdfURL as a prop
                                onClick={() => handleTemplateClick(template.pdfURL)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProjectCard = ({ title, description, thumbnail, templateId, pdfURL, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div
            className="space-y-4 border cursor-pointer border-2 border-gray-100 rounded-lg  shadow-xl hover:shadow-2xl relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        // onClick={onClick}
        >
            {/* <div className="flex justify-center">
                <Image src={thumbnail} width={300} height={250} alt="Thumbnail" />
            </div> 
        
            <div className="flex justify-center">
                <iframe src={pdfURL} width="100%" height="400px" title="" />
            </div>
        */}

            <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} width={350} scale={1} />
            </Document>


            {isHovered && (
                <div className="absolute inset-0 flex justify-center items-center ">
                    {/* <Link href={`/templates/${templateId}?pdfURL=${encodeURIComponent(pdfURL)}`} passHref>
                        <Button color="primary" className="mt-5">Use this templates</Button>
                    </Link>*/}
                    <Button color="primary" className="mt-5" onClick={onClick}>Use this templates</Button>
                </div>
            )}
        </div>
    );
};

export default Templates;
