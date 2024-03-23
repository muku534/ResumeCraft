"use client";

import Link from "next/link";
import ColoredDots from "../style/ColoredDots ";
import BackgroundImage from "../../public/assets/benefits-bg.svg"
import CV1 from "../../public/assets/demo-1.png"
import CV2 from "../../public/assets/demo-2.png"
import CV3 from "../../public/assets/demo-3.png"

const Templates = () => {
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
                        <ProjectCard
                            title="SCS Website (React.js)"
                            description="Developed SCS (Sustainable Computer Solution), an e-commerce app built using React.js, Node.js, Express.js, MongoDB and ...."
                            link="https://github.com/muku534/bug-free-adventure"
                        />
                        <ProjectCard
                            title="CallVerse (React Native Expo)"
                            description="CallVerse, a secure and seamless chat app built using React Native Expo, Node.js, Express.js, MongoDB, and Socket.io."
                            link="https://github.com/muku534/CallVerse-new-version-"
                        />
                        <ProjectCard
                            title="SCS (React Native)"
                            description="Developed SCS (Sustainable Computer Solution), an e-commerce app built using React Native CLI, Node.js, Express.js, MongoDB."
                            link="https://github.com/muku534/bug-free-adventure-app"
                        />
                        <ProjectCard
                            title="CallVerse (React Native CLI and Firebase)"
                            description="Developed CallVerse (Chat App), a chat application using React Native CLI and Firebase. The application features a unique offering where...."
                            link="https://github.com/muku534/bug-free-adventure-app"
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
            <div className="mt-auto flex justify-center">
                <Link href={link} title="" className="text-gray-700 bg-indigo-100 justify-center hover:bg-indigo-200 inline-flex items-center focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" role="button">
                    View
                    <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Templates;
