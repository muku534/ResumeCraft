import Image from "next/image";
import banner from "../../public/assets/banner2__1_-removebg.png";
import { Code } from "@nextui-org/react";
import Dollar from "../../public/assets/icons8-dollar-30.png"
import About from "../about/Page";
import { Button } from "@nextui-org/react";
import Templates from "../templates/Page";
import Features from "../features/Page";

export default function Home() {

    return (
        <>
            <main id="Home" className="flex flex-col lg:flex-row justify-center items-center bg-linear-gradient pt-20 lg:px-5">
                <div className="lg:w-1/2 lg:pr-10  flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                    <Code size="md" radius="lg" color="primary" className="flex items-center mb-4 lg:ml-5 lg:mb-0 pr-5">
                        <Image src={Dollar} width={20} height={20} className="mr-2" />
                        <span className="lg:block text-sm">Discover The Easiest ways to Build Your CV!</span>
                    </Code>


                    <div className="mb-10 lg:ml-5">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-blue-700 dark:text-text-blue-700 mb-4">Online CV Builder With Creative Templates.</h1>
                        <p className="text-lg lg:text-xl font-normal text-gray-400 tracking-tight mb-6 lg:pr-20 lg:mb-8">Our Perfect resume builder takes the hassle out of resume writing. Choose from several templates and follow easy prompts to create the perfect job-ready resume.</p>
                        <div className="flex flex-col lg:flex-row items-center lg:items-start">
                            <Button color="primary" variant="flat" className="mb-4 lg:mb-0 lg:mr-4">
                                CHOOSE TEMPLATE
                            </Button>
                            <Button color="primary" variant="flat">
                                CONTACT US
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="custom-image overflow-hidden object-cover object-center rounded">
                        <Image alt="hero" src={banner} layout="responsive" width={1500} height={1000} />
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