"use client";

import Link from "next/link";
import ColoredDots from "../style/ColoredDots ";

const Features = () => {
    return (
        <div id="Features">
            <section className="bg-white antialiased mb-20">
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-5 mt-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="flex justify-center mb-5">
                            <ColoredDots />
                        </div>
                        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-2xl dark:text-gray-800">
                            Our Main Features
                        </h2>
                        <hr className="w-32 h-1 mx-auto my-2 bg-indigo-300 border-0 rounded md:my-1 dark:bg-indigo-300"></hr>
                        <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </p>
                    </div>

                    <div className="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        <ProjectCard
                            title="Proven CV Templates to increase Hiring Chance"
                            description="Developed SCS (Sustainable Computer Solution), an e-commerce app built using React.js, Node.js, Express.js, MongoDB and ...."
                            link="https://github.com/muku534/bug-free-adventure"
                        />
                        <ProjectCard
                            title="Creative, Modern and Clean Templates Design"
                            description="CallVerse, a secure and seamless chat app built using React Native Expo, Node.js, Express.js, MongoDB, and Socket.io."
                        />
                        <ProjectCard
                            title="Easy and Intuitive Online CV and Resume Builder"
                            description="Developed SCS (Sustainable Computer Solution), an e-commerce app built using React Native CLI, Node.js, Express.js, MongoDB."
                        />
                        <ProjectCard
                            title="Free to use. Developed by hiring professionals."
                            description="Developed CallVerse (Chat App), a chat application using React Native CLI and Firebase. The application features a unique offering where...."
                        />
                        <ProjectCard
                            title="Recruiter Approved Phrases with Module Notification"
                            description="Developed CallVerse (Chat App), a chat application using React Native CLI and Firebase. The application features a unique offering where...."
                        />
                        <ProjectCard
                            title="Fast Easy CV and Resume Formatting"
                            description="Developed CallVerse (Chat App), a chat application using React Native CLI and Firebase. The application features a unique offering where...."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProjectCard = ({ title, description, link }) => {
    return (
        <div className="space-y-4 border border-2 border-gray-100 rounded-lg p-5 shadow-xl hover:shadow-2xl">
            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-700">{title}</h3>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">{description}</p>
           
        </div>
    );
};

export default Features;
