"use client";

import { useState } from "react";
import Link from "next/link";
import ColoredDots from "../style/ColoredDots ";
import BackgroundImage from "../../public/assets/benefits-bg.svg"
import CV1 from "../../public/assets/demo-1.png"
import CV2 from "../../public/assets/demo-2.png"
import CV3 from "../../public/assets/demo-3.png"
import Image from "next/image";
import { Button } from "@nextui-org/react";

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
                            imageURL={CV1}

                        />
                        <ProjectCard
                            imageURL={CV2}

                        />
                        <ProjectCard
                            imageURL={CV3}

                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProjectCard = ({ title, description, imageURL }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="space-y-4 border border-2 border-gray-100 rounded-lg p-5 shadow-xl hover:shadow-2xl relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-center">
                <Image src={imageURL} width={250} height={250} />
            </div>
            {isHovered && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <Button color="primary"  className="mt-5">Use this templates</Button>
                </div>
            )}
        </div>
    );
};

export default Templates;
