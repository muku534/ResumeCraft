// pages/api/proxyPdf.js

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    const pdfBlob = await fetch(url).then((response) => response.blob());
    const buffer = await pdfBlob.arrayBuffer();
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error proxying PDF:", error);
    res.status(500).send("Internal Server Error");
  }
}
