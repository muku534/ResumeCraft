import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'; // Import necessary components from react-pdf

const TemplateEditor = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        // Ensure that pdfjs is in worker mode
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }, []);

    // Function to handle loading of the PDF
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    return (
        <div className="flex ">
            <div className='flex flex-row justify-between items-center'>

                <div >
                    {/* Add your editor components and logic here */}
                    <h2>Editor Options</h2>
                    {/* Add input fields for name, email, phone, etc. */}
                    <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
                    <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                    <input type="tel" placeholder="Phone" value={phone} onChange={handlePhoneChange} />
                    {/* Add more input fields as needed */}
                </div>

                <div>
                    {/* Display PDF resume template with user input */}
                    <Document
                        file="/assets/MukeshPrajapati_Resume (2).pdf" // Replace with the actual path to your PDF file
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={1} renderTextLayer={false} />
                    </Document>
                </div>

            </div>
        </div>
    );
};

export default TemplateEditor;
