import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './../styles/DayTemplate.css'
import { FaClock } from 'react-icons/fa'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

const DayTemplate = ({currentDay, setCurrentDay, currentTour}) => {
    const {day} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = () =>{
          setCurrentDay(currentTour.dayWisePlan.find((plan) => plan.dayNo == day))
        }

        fetchData()
    },[day, setCurrentDay, currentTour])

    const handleEdit = (event) => {
      event.preventDefault()
      navigate('/tour/day/edit')
    }

    const saveAsPDF = () => {
        const container = document.getElementById('day-details');
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

  return (
    <div id="day-details" className="day-template">
            <div className="hero-section">
                <h2 className="title">{currentDay.title}</h2>
                <p className="description">{currentDay.description}</p>
            </div>
            
            <div className="timeframes">
                {currentDay.timeframes && currentDay.timeframes.map((timeframe) => (
                    <div className="timeframe-card" key={timeframe.timeId}>
                        <h5 className="task">{timeframe.task}</h5>
                        <div className="time">
                            <FaClock className="clock-icon" />
                            <div>
                                <strong>Start:</strong> {timeframe.startTime}<br />
                                <strong>End:</strong> {timeframe.endTime}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="day-temp-last-div">
                <button style={{background:'yellow'}} onClick={saveAsPDF}>Save as pdf</button>
                <button style={{background:'rgba(58, 58, 224, 0.82)', color:'#ffffff'}} onClick={handleEdit}>Edit</button>
            </div>
    </div>
  )
}

export default DayTemplate