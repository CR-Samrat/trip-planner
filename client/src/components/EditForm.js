// src/components/TourForm.js
import React, { useState } from 'react';
import './../styles/TourForm.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const EditForm = ({currentTour, setCurrentTour}) => {
  const navigator = useNavigate();
  
  const [tourData, setTourData] = useState({
    title: currentTour.title,
    destination: currentTour.destination,
    date: currentTour.date,
    duration: currentTour.duration,
    places: currentTour.places,
    foods: currentTour.foods,
    note: currentTour.note,
    expense: currentTour.expense
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(tourData);

    await axios.post(`http://localhost:8080/tours/edit/tour/${currentTour.tourId}`, tourData,{
                headers: {'Content-Type' : 'application/json'}
              })
              .then((response) => {
                console.log(response.data);
                setCurrentTour(response.data);
                navigator(`/tour`)
              }).catch((err)=>{
                console.error(err)
              })
  };

  return (
    <div className="form-container">
      <h2>Create a New Tour</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={tourData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="text"
              id="date"
              name="date"
              value={tourData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={{gridTemplateColumns:'1fr'}} className="form-group">
          <div>
          <label htmlFor="destination">Destination</label>
          <textarea
            id="destination"
            name="destination"
            value={tourData.destination}
            onChange={handleChange}
            required
          />
          </div>
        </div>

        <div className="form-group">
          <div>
          <label htmlFor="duration">Duration (in days)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={tourData.duration}
            onChange={handleChange}
            required
          />
          </div>
          <div>
          <label htmlFor="totalExpense">Total Expense</label>
          <input
            type="number"
            id="totalExpense"
            name="expense"
            value={tourData.expense}
            onChange={handleChange}
            required
          />
          </div>
        </div>

        <div style={{gridTemplateColumns:'1fr'}} className="form-group">
          <div>
          <label htmlFor="placesToVisit">Places to Visit</label>
          <input
            type="text"
            id="placesToVisit"
            name="places"
            value={tourData.places}
            onChange={handleChange}
            required
          />
          </div>
        </div>

        <div style={{gridTemplateColumns:'1fr'}} className="form-group">
          <div>
          <label htmlFor="foodsToTry">Foods to Try</label>
          <input
            type="text"
            id="foodsToTry"
            name="foods"
            value={tourData.foods}
            onChange={handleChange}
            required
          />
          </div>
        </div>

        <div style={{gridTemplateColumns:'1fr'}} className="form-group">
          <div>
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            name="note"
            value={tourData.note}
            onChange={handleChange}
          />
          </div>
        </div>

        <button type="submit" className="submit-btn">Save</button>
      </form>
    </div>
  );
};

export default EditForm;
