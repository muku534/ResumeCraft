import { useRouter } from "next/router";

const TemplatePage = () => {
    const router = useRouter();
    const { templateId, pdfURL } = router.query;

    return (
        <div>
            <h1>Template ID: {templateId}</h1>
            <iframe src={pdfURL} width="50%" height="800px" title="" />
        </div>
    );
};

export default TemplatePage;
