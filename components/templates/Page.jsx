"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { auth, db, storage } from "@/app/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import ColoredDots from "../style/ColoredDots ";
import { ref, listAll, getDownloadURL } from "firebase/storage"; // Updated imports
import { Document, Page, pdfjs } from 'react-pdf';
import { getSession, signOut } from "next-auth/react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Templates = () => {
    // State variables to manage user and templates
    const [user, setUser] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const templatesRef = ref(storage, "Resume Templates");
                const templatesList = await listAll(templatesRef);
                const templatesData = await Promise.all(
                    templatesList.items.map(async (item) => {
                        const pdfURL = await getDownloadURL(item);
                        const thumbnail = await generateThumbnail(pdfURL);
                        return {
                            id: item.name,
                            pdfURL,
                            thumbnail
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

    const generateThumbnail = async (pdfURL) => {
        try {
            const pdf = await pdfjs.getDocument(pdfURL).promise;
            const page = await pdf.getPage(1);
            const scale = 0.5;
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            await page.render(renderContext).promise;
            const thumbnailURL = canvas.toDataURL();
            return thumbnailURL;
        } catch (error) {
            console.error("Error generating thumbnail:", error);
            return null;
        }
    };

    const handleTemplateClick = async (pdfURL) => {
        if (!user) {
            alert("Please login first.");
            return;
        }
        try {
            // await db.collection("users").doc(user.uid).update({
            //     templatePDF: pdfURL
            // });
            // router.push(`/templates?pdfURL=${encodeURIComponent(pdfURL)}`);
            alert(pdfURL)
        } catch (error) {
            console.error("Error selecting template:", error);
            alert("Failed to select template. Please try again later. Error: " + error.message);
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
            className="space-y-4 border cursor-pointer border-2 border-gray-100 rounded-lg p-5 shadow-xl hover:shadow-2xl relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        // onClick={onClick}
        >
            {/* <div className="flex justify-center">
                <Image src={thumbnail} width={300} height={250} alt="Thumbnail" />
            </div> */}
            <div className="flex justify-center">
                <iframe src={pdfURL} width="100%" height="400px" title="" />
            </div>
            {/* <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document> */}
            {isHovered && (
                <div className="absolute inset-0 flex justify-center items-center ">
                    <Link href={`/templates/${templateId}?pdfURL=${encodeURIComponent(pdfURL)}`} passHref>
                        <Button color="primary" className="mt-5">Use this templates</Button>
                    </Link>
                    {/* <Button color="primary" className="mt-5" onClick={onClick}>Use this templates</Button> */}
                </div>
            )}
        </div>
    );
};

export default Templates;
