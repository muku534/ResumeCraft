

const Template = () => {
    <div className="mt-40 mx-auto max-w-3xl px-4 py-8 shadow-xl">
        <Head>
            <title>Resume | FIRSTNAME LASTNAME</title>
        </Head>

        {/* Header section */}
        <header className="text-center">
            <h1 className="text-3xl font-bold">FIRSTNAME LASTNAME</h1>
            <p className="mt-1">
                <a href="tel:+11234567890" className="text-sm font-normal text-blue-700 mr-2">+1(123) 456-7890</a>|
                <span className="text-sm font-normal ml-2 mr-2">San Francisco, CA</span>
                <br />
                <a href="mailto:contact@ResumeCraft.com" className="text-sm font-normal text-blue-700  mr-2">contact@ResumeCraft.com</a>|
                <a href="https://linkedin.com/company/ResumeCraft" className="text-sm font-normal text-blue-700 ml-2 mr-2">LinkedIn</a>|
                <a href="www.ResumeCraft.com" className="text-sm font-normal text-blue-700 ml-2">www.ResumeCraft.com</a>
            </p>
        </header>

        {/* Objective section */}
        <section className="mt-8">
            <h2 className="text-md font-bold">SUMMERY</h2>
            <hr className="border-gray-700 border-b-1 mb-2" />
            <p className="text-sm font-normal text-gray-900">Software Engineer with 2+ years of experience in XXX, seeking full-time XXX roles.</p>
        </section>

        {/* Education section */}
        <section className="mt-4">
            <h2 className="text-md font-bold">EDUCATION</h2>
            <hr className="border-gray-700 border-b-1 mb-2" />
            <ul className="list-disc pl-6">

                <div className="mb-2">
                    <div className="flex flex-row justify-between " >
                        <li className="text-sm font-normal text-gray-900">
                            <strong className="mr-2">Master of Computer Science</strong>
                            Stanford University
                        </li>
                        <p className="text-sm font-normal text-gray-900"> Expected 2020</p>
                    </div>
                    <p>
                        Relevant Coursework: A, B, C, and D
                    </p>
                </div>
                <div className="mb-2">
                    <div className="flex flex-row justify-between " >
                        <li className="text-sm font-normal text-gray-900">
                            <strong className="mr-2">Bachelor of Computer Science</strong>
                            Stanford University
                        </li>
                        <p className="text-sm font-normal text-gray-900">2014 - 2017</p>
                    </div>
                    <p>
                        Relevant Coursework: A, B, C, and D
                    </p>
                </div>
            </ul>
        </section>

        {/* Skills section */}
        <section className="mt-4">
            <h2 className="text-md font-bold">SKILLS</h2>
            <hr className="border-gray-700 border-b-1 mb-2" />
            <div className="flex flex-row">
                <div>
                    <h3 className="text-sm text-gray-900 font-bold mb-1">Technical Skills</h3>
                    <h3 className="text-sm text-gray-900 font-bold mb-1">Soft Skills</h3>
                    <h3 className="text-sm text-gray-900 font-bold mb-1">XYZ</h3>
                </div>
                <div className="pl-6">
                    <p className="text-sm font-normal mb-1">A, B, C, D</p>
                    <p className="text-sm font-normal mb-1">A, B, C, D</p>
                    <p className="text-sm font-normal mb-1">A, B, C, D</p>
                </div>
            </div>
        </section>

        {/* Experience section */}
        <section className="mt-4">
            <h2 className="text-md font-bold ">EXPERIENCE</h2>
            <hr className="border-gray-700 border-b-1 mb-2" />
            <div className="space-y-4">
                <div className="">
                    <ul className="list-disc">
                        <div className="flex flex-row justify-between">
                            <div>
                                <h3 className="text-sm font-bold">Role Name</h3>
                                <p className="text-sm font-normal">Company Name</p>
                            </div>
                            <div className="">
                                <p className="text-sm font-normal">Jan 2017 - Jan 2019</p>
                                <p className="text-sm font-normal"> San Francisco, CA</p>
                            </div>
                        </div>
                        <div className="pl-10 pt-1">
                            <li className="text-sm font-normal">Achieved X% growth for XYZ using A, B, and C skills .</li>
                            <li className="text-sm font-normal">Led XYZ which led to X% of improvement in ABC.</li>
                            <li className="text-sm font-normal">Developed XYZ that did A, B, and C using X, Y, and Z.</li>
                        </div>
                    </ul>

                </div>
                {/* Add more experience items similarly */}
            </div>
        </section>

        {/* Projects section */}
        <section className="mt-4">
            <h2 className="text-md font-bold">PROJECTS</h2>
            <hr className="border-gray-700 border-b-1 mb-2" />
            <div className="">
                <div>
                    <ui>
                        <div className="mb-2">
                            <li className="text-sm font-bold">Hiring Search Tool</li>
                            <p className="text-sm font-normal pl-5">Built a tool to search for Hiring Managers and Recruiters by using ReactJS, NodeJS, Firebase and boolean queries. Over 25000 people have used it so far, with 5000+ queries being saved and shared, and search results even better than LinkedIn! <a href="https://hiring-search.careerflow.ai/">(Try it here)</a></p>
                        </div>
                        <div className="mb-2">
                            <li className="text-sm font-bold">Hiring Search Tool</li>
                            <p className="text-sm font-normal pl-5">Built a tool to search for Hiring Managers and Recruiters by using ReactJS, NodeJS, Firebase and boolean queries. Over 25000 people have used it so far, with 5000+ queries being saved and shared, and search results even better than LinkedIn! <a href="https://hiring-search.careerflow.ai/">(Try it here)</a></p>
                        </div>
                    </ui>
                </div>
                {/* Add more project items similarly */}
            </div>
        </section>

        {/* Extra-Curricular Activities section */}
        <section className="mt-4">
            <h2 className="text-md font-bold">EXTRA-CURRICULAR ACTIVITIES</h2>
            <hr className="border-gray-700 border-b-1 mb-2" />
            <ul className="list-disc pl-6 ">
                <div className="mb-2">
                    <li className="text-sm font-normal ">Actively write <a href="https://www.ResumeCraft.com/blog/">blog posts</a> and social media posts (<a href="https://www.tiktok.com/@ResumeCraft">TikTok</a>, <a href="https://www.instagram.com/ResumeCraft/?hl=en">Instagram</a>) viewed by over 20K+ job seekers per week to help people with best practices to land their dream jobs.</li>
                </div>
                <div className="mb-2">
                    <li className="text-sm font-normal ">Actively write <a href="https://www.ResumeCraft.com/blog/">blog posts</a> and social media posts (<a href="https://www.tiktok.com/@ResumeCraft">TikTok</a>, <a href="https://www.instagram.com/ResumeCraft/?hl=en">Instagram</a>) viewed by over 20K+ job seekers per week to help people with best practices to land their dream jobs.</li>
                </div>
            </ul>
        </section>

        {/* Leadership section */}
        <section className="mt-4">
            <h2 className="text-md font-bold">LEADERSHIP</h2>
            <hr className="border-gray-700 border-b-1 mb-2" />
            <ul className="list-disc pl-6">
                <div className="mb-2">
                    <li className="text-sm font-normal">Admin for the <a href="https://discord.com/invite/WWbjEaZ">ResumeCraft Discord community</a> with over 6000+ job seekers and industry mentors. Actively involved in facilitating online events, career conversations, and more alongside other admins and a team of volunteer moderators!</li>
                    {/* Add more leadership items similarly */}
                </div>
            </ul>
        </section>
    </div>
}

export default Template;