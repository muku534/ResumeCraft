// pages/editor/[id].js

import { useRouter } from "next/router";
import Image from "next/image";

const Editor = () => {
    const router = useRouter();
    const { id } = router.query;

    // Dummy template data to be replaced with actual data
    const templates = {
        cv1: "/assets/demo-1.png",
        cv2: "/assets/demo-2.png",
        cv3: "/assets/demo-3.png",
    };

    const selectedTemplate = templates[id];

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <h1 className="text-3xl font-bold mb-6">Editor Screen</h1>
                <h2 className="text-xl font-semibold mb-4">Selected Template</h2>
                {selectedTemplate ? (
                    <Image src={selectedTemplate} width={300} height={300} />
                ) : (
                    <p className="text-red-500">Template not found</p>
                )}
            </div>
        </div>
    );
};

export default Editor;
