"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { auth, db, storage } from "@/app/firebase";
import { useRouter } from "next/router";
import ColoredDots from "../style/ColoredDots ";

const Templates = () => {
    const [user, setUser] = useState(null);
    const [templates, setTemplates] = useState([]);
    // const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Fetch templates from Firebase Storage
        const fetchTemplates = async () => {
            const templatesRef = storage.ref().child("Resume Templates");
            const templatesList = await templatesRef.listAll();

            const templatesData = await Promise.all(
                templatesList.items.map(async (item) => {
                    const imageURL = await item.getDownloadURL();
                    console.log("this is the resume :", item.name);
                    return {
                        id: item.name,
                        // imageURL,
                    };
                })
            );

            setTemplates(templatesData);
        };

        fetchTemplates();
    }, []);

    const handleTemplateClick = async (templateId) => {
        if (!user) {
            alert("Please login first.");
            return;
        }

        try {
            // Fetch the selected template PDF from Firebase Storage
            const pdfRef = storage.ref().child("Resume Templates").child(templateId);
            const pdfURL = await pdfRef.getDownloadURL();

            // Store a copy of the selected template in the user's collection in Firestore
            await db.collection("users").doc(user.uid).set({
                templateId,
                templatePDF: pdfURL
            });

            // Redirect the user to the editor page
            // router.push("/editor");
        } catch (error) {
            console.error("Error selecting template:", error);
            alert("Failed to select template. Please try again later.");
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
                                imageURL={template.imageURL}
                                onClick={() => handleTemplateClick(template.url)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProjectCard = ({ title, description, imageURL, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="space-y-4 border cursor-pointer border-2 border-gray-100 rounded-lg p-5 shadow-xl hover:shadow-2xl relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className="flex justify-center ">
                <Image src={imageURL} width={300} height={250} />
            </div>
            {isHovered && (
                <div className="absolute inset-0 flex justify-center items-center ">
                    <Button color="primary" className="mt-5" onClick={onClick}>Use this templates</Button>
                </div>
            )}
        </div>
    );
};

export default Templates;
