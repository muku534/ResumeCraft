import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Document, Page, pdfjs } from 'react-pdf'; // Import necessary components from react-pdf

const TemplateEditor = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        // Ensure that pdfjs is in worker mode
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }, []);

    // Function to handle loading of the PDF
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const templates = [
        { id: 'cv1', imageURL: '/assets/demo-1.png' },
        { id: 'cv2', imageURL: '/assets/demo-2.png' },
        { id: 'cv3', imageURL: '/assets/demo-3.png' },
    ];

    const router = useRouter();
    const { templateId } = router.query;

    useEffect(() => {
        if (templateId !== undefined) {
            console.log("Editor opened for templateId:", templateId);
        }
        if (!templateId) {
            console.error("Template ID not provided");
        }
    }, [templateId]);

    // Find the template object based on templateId
    const selectedTemplate = templates.find(template => template.id === templateId);

    return (
        <div className="flex">
            <div className="w-1/2">
            <div className="w-1/2">
                {/* Add your editor components and logic here */}
                <div>
                    <h2>Editor Options</h2>
                    {/* Add input fields for name, email, phone, etc. */}
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="tel" placeholder="Phone" />
                    {/* Add more input fields as needed */}
                </div>
            </div>
            </div>
           
        </div>
    );
};

export default TemplateEditor;
