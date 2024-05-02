"use client";

import { useState } from "react";
import Link from "next/link";
import ColoredDots from "../style/ColoredDots ";
import Image from "next/image";
import F1 from "../../../public/assets/f1.png";
import F2 from "../../../public/assets/f2.png";
import F3 from "../../../public/assets/f3.png";
import F4 from "../../../public/assets/f4.png";
import F5 from "../../../public/assets/f5.png";
import F6 from "../../../public/assets/f6.png";
import Head from "next/head";
import { Input, Textarea } from "@nextui-org/react";

const Features = () => {
  
    

    const ProjectCard = ({ title, description, imageURL }) => {
        return (
            <div className="space-y-4 border border-2 border-gray-100 rounded-lg p-5 shadow-xl hover:shadow-2xl">
                <div className="flex justify-center">
                    <Image src={imageURL} width={80} height={80} />
                </div>
                <h3 className="text-md font-bold leading-tight text-gray-900 dark:text-gray-700">{title}</h3>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        );
    };

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
                            imageURL={F1}
                            title="Proven CV Templates to Increase Hiring Chances"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit amet."
                            link="https://github.com/muku534/bug-free-adventure"
                        />
                        <ProjectCard
                            imageURL={F2}
                            title="Creative, Modern and Clean Templates Design"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit amet."
                        />
                        <ProjectCard
                            imageURL={F3}
                            title="Easy and Intuitive Online CV and Resume Builder"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit amet."
                        />
                        <ProjectCard
                            imageURL={F4}
                            title="Free to Use. Developed by Hiring Professionals."
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit amet."
                        />
                        <ProjectCard
                            imageURL={F5}
                            title="Recruiter Approved Phrases with Module Notification"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit amet."
                        />
                        <ProjectCard
                            imageURL={F6}
                            title="Fast Easy CV and Resume Formatting"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit amet."
                        />
                    </div>
                </div>

             
            </section>
        </div>
    );
};

export default Features;
