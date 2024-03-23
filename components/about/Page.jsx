import Link from "next/link";
import Image from "next/image";
import Thumb from "../../public/assets/d1.png";
import Step from "../../public/assets/d2.png";
import Approve from "../../public/assets/d3.png";
import { Button } from "@nextui-org/react";
import CV from "../../public/assets/cv.png";
import Correct from "../../public/assets/icons8-correct-48.png";
import ColoredDots from "../style/ColoredDots ";
import BackgroundImage from "../../public/assets/benefits-bg.svg"

const About = () => {
    return (
        <>
            <div id="About">
                <section className="bg-white antialiased">
                    <div style={{ backgroundImage: `url('/assets/benefits-bg.svg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className="container mx-auto lg:mt-40 lg:max-w-screen-xl px-4 py-8 lg:px-6 sm:py-16 lg:py-5 mt-10 " >
                            <div className="flex flex-col lg:flex-row justify-center">
                                <div className="lg:w-2/5 flex flex-col items-center">
                                    <ProjectCard
                                        imageURL={Thumb}
                                        title="Easy Online Resume Builder"
                                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium modi assumenda."
                                    />
                                    <ProjectCard
                                        imageURL={Step}
                                        title="Step By Step Expert Tips"
                                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium modi assumenda."
                                    />
                                    <ProjectCard
                                        imageURL={Approve}
                                        title="Recruiter Approved Phrases"
                                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium modi assumenda."
                                    />
                                </div>
                                <div className="lg:w-1/2 lg:pl-20 mt-2 flex flex-col md:text-left">
                                    <ColoredDots />
                                    <h1 className="title-font sm:text-3xl text-xl mb-4 font-extrabold text-gray-800">Why Choose Our Platform?</h1>
                                    <p className="mb-6 leading-relaxed text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dictum risus, non suscipit arcu. Quisque aliquam posuere tortor, sit amet convallis nunc scelerisque in.</p>
                                    <p className="mb-6 leading-relaxed text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eius molestiae facere, natus reprehenderit eaque eum, autem ipsam. Magni, error. Tempora odit laborum iure inventore possimus laboriosam qui nam. Fugit!</p>
                                    <div>
                                        <Button color="primary" variant="flat" className="mt-5">
                                            LETS BUILD YOUR CV
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div  >
                        <div className="container mx-auto lg:mt-40 lg:max-w-screen-xl px-4 py-8 lg:px-6 sm:py-16 lg:py-5 mt-10">
                            <div className="flex flex-col lg:flex-row justify-center">
                                <div className="lg:w-3/5 lg:pl-20 mt-10 flex flex-col md:text-left items-center lg:items-start">
                                    <ColoredDots />
                                    <h1 className="title-font mt-2 sm:text-3xl text-xl mb-4 font-extrabold text-gray-800">We Deliver The Best</h1>
                                    <p className="mt-5 mb-6 leading-relaxed text-gray-900 flex items-center"><Image src={Correct} height={30} width={30} className="mr-2" /> Proven CV Templates to increase Hiring Chance</p>
                                    <p className="mb-6 leading-relaxed text-gray-900 flex items-center"><Image src={Correct} height={30} width={30} className="mr-2" /> Creative and Clean Templates Design</p>
                                    <p className="mb-6 leading-relaxed text-gray-900 flex items-center"><Image src={Correct} height={30} width={30} className="mr-2" /> Easy and Intuitive Online CV Builder</p>
                                    <p className="mb-6 leading-relaxed text-gray-900 flex items-center"><Image src={Correct} height={30} width={30} className="mr-2" /> Free to use. Developed by hiring professionals.</p>
                                    <p className="mb-6 leading-relaxed text-gray-900 flex items-center"><Image src={Correct} height={30} width={30} className="mr-2" /> Fast Easy CV and Resume Formatting</p>
                                    <p className="mb-6 leading-relaxed text-gray-900 flex items-center"><Image src={Correct} height={30} width={30} className="mr-2" /> Recruiter Approved Phrases.</p>

                                </div>


                                <Image src={CV} />

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
};

const ProjectCard = ({ title, description, imageURL }) => {
    return (
        <div className="relative">
            <div className=" flex items-center border border-2 border-gray-100 rounded-lg p-4 shadow-xl hover:shadow-2xl mb-8" style={{ maxWidth: "500px" }}>
                <div className="item-stat">
                    <Image src={imageURL} width={80} height={80} className="mr-2 " />
                </div>
                <div className="lg:ml-5">
                    <h3 className="text-md font-bold leading-tight text-gray-900 dark:text-gray-700">{title}</h3>
                    <p className="text-sm mt-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default About;
