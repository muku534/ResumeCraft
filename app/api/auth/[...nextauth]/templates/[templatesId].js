// pages/api/templates/[templateId].js

import { storage } from "@/app/firebase";

export default async function handler(req, res) {
  const { templateId } = req.query;

  try {
    const pdfRef = storage.ref().child("Resume Templates").child(templateId);
    const pdfURL = await pdfRef.getDownloadURL();
    const response = await fetch(pdfURL);
    const pdfBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).end();
  }
}
