import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PdfConverter = () => {
  const saveAsPDF = () => {
    const container = document.getElementById('container-to-pdf');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    html2canvas(container, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4', // A4 paper size
      });

      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();

      const ratio = Math.min(pageWidth / containerWidth, pageHeight / containerHeight);
      const imgWidth = containerWidth * ratio;
      const imgHeight = containerHeight * ratio;

      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        if (heightLeft > 0) {
          pdf.addPage();
          position = -pageHeight;
        }
      }

      pdf.save('output.pdf');
    });
  };

  return (
    <div>
      <div id="container-to-pdf" style={{ width: '600px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h1>My Styled Content</h1>
        <p style={{ color: 'blue', padding: '10px', backgroundColor: 'lightgray' }}>
          This content will be saved as a PDF, including its styles. Ensure the content fits within the container.
        </p>
        {/* Add more content here to test the multi-page functionality */}
        <p style={{ color: 'black', padding: '10px' }}>
          Add more content to see if the PDF splits the content across multiple pages correctly.
        </p>
      </div>
      <button onClick={saveAsPDF}>Save as PDF</button>
    </div>
  );
};

export default PdfConverter;
