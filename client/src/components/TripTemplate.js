import React from 'react';
import './../styles/TripTemplate.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

const TripTemplate = ({trip_details}) => {

  const navigate = useNavigate();

  const saveAsPDF = () => {
    const container = document.getElementById('trip-details');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    html2canvas(container, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
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

  const handleEdit = () =>{
    navigate("/tour/edit")
  }

  return (
    <div id="trip-details" className="trip-template">
      <div className="header">
        <h2 style={{textTransform:'uppercase'}}>{trip_details.title}</h2>
        <div className="header-info">
          <div className="info-block">
            <span>Date</span> {trip_details.date}
          </div>
          <div className="info-block">
            <span>Duration</span> {trip_details.duration} days
          </div>
        </div>
      </div>
      
      <div className="section">
        <span className="section-title">Destination</span>
        <p>{trip_details.destination}</p>
      </div>
      
      <div className="section places-foods">
        <div className="places">
          <span className="section-title">Places to See</span>
          <ol>
            {trip_details.places && trip_details.places.split(",").map((place, index) => (
              <li key={index}>{place.trim()}</li>
            ))}
          </ol>
        </div>
        <div className="foods">
          <span className="section-title">Local Food to Try</span>
          <ol>
            {trip_details.foods && trip_details.foods.split(",").map((food, index) => (
              <li key={index}>{food.trim()}</li>
            ))}
          </ol>
        </div>
      </div>
      
      <div className="days-container">
        {[...Array(trip_details.duration)].map((_, i) => (
          <div className="day-block" key={i}>
            <span>Day {i + 1}</span>
            <div className="day-content">Content for Day {i + 1}</div>
          </div>
        ))}
      </div>
      
      <div className="footer">
        <div className="notes">
          <span className="section-title">Notes:</span>
          <p>{trip_details.notes}</p>
        </div>
        <div className="expenses">
          <span className="section-title">Expenses in Total</span>
          <p>₹{trip_details.expense}</p>
        </div>
      </div>
      <div className='trip-final-div'>
        <button style={{background:'yellow'}} onClick={saveAsPDF}>Save as pdf</button>
        <button style={{background:'#3a3ae0d1', color:'#ffffff'}} onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default TripTemplate;
