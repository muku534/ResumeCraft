import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js`;

const EditorPage = () => {
    const router = useRouter();
    const [pdfURL, setPdfURL] = useState('');

    useEffect(() => {
        // Extract pdfURL from query parameters
        const { pdfURL } = router.query;
        console.log(pdfURL);
        if (pdfURL) {
            setPdfURL(decodeURIComponent(pdfURL));
        }
    }, [router.query]);

    return (
        <div>
            <h1>Editor</h1>
            {pdfURL && (
                <div className="pdf-container">
                   
                    <div className="flex justify-center">
                        <iframe src={pdfURL} width="100%" height="400px" title="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditorPage;
