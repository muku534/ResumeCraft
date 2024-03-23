import Image from "next/image";
import banner from "../../public/assets/banner2 (1).png";
import { Code } from "@nextui-org/react";
import Dollar from "../../public/assets/icons8-dollar-30.png"
import About from "../about/Page";
import { Button } from "@nextui-org/react";
import Templates from "../templates/Page";
import Features from "../features/Page";

export default function Home() {

    return (
        <>
            <main id="Home" className="flex w-full justify-between items-center bg-linear-gradient pt-20">
                <div className="container mx-auto flex lg:px-5 md:flex-row flex-col items-center justify-center">
                    <div className="lg:flex-grow lg:mx-20 md:pt-5 flex flex-col md:text-left ">
                        <Code size="md" radius="lg" color="primary" className="flex items-center mb-4 max-w-md ml-14 md:ml-14">
                            <Image src={Dollar} width={20} height={20} className="mr-2" />
                            Discover The Easiest ways to Build Your CV!
                        </Code>


                        <div className="mb-10">
                            <h1 className="text-5xl font-bold leading-tight tracking-tight lg:pl-10 lg:pr-20 lg:ml-5 text-blue-700 dark:text-text-blue-700 mb-4" style={{ lineHeight: '1.2' }}>Online CV Builder With Creative Templates.</h1>
                            <p className="text-lg font-normal text-gray-400 tracking-tight lg:pl-10 lg:ml-5 sm:text-lg md:text-6xl lg:text-xl dark:text-gray-900" style={{ lineHeight: '1.5' }}>Our Perfect resume builder takes the hassle out of resume writing. Choose from several templates and follow easy prompts to create the perfect job-ready resume.</p>
                        </div>

                        <div className="flex flex-row ml-14">
                            <Button color="primary" variant="flat" className="mr-6">
                                CHOOSE TEMPLATE
                            </Button>
                            <Button color="primary" variant="flat">
                                CONTECT US
                            </Button>
                        </div>

                    </div>
                    {/* <!-- Add the 'hidden' class for small screens --> */}
                    <div className="custom-image overflow-hidden object-cover object-center rounded lg:block hidden">
                        <Image alt="hero" src={banner} width={1500} height={1500} />
                    </div>
                </div>
            </main>
            <div>
                <About />
                <Templates />
                <Features />
            </div>

        </>
    )
}