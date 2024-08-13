import React, { useState, useEffect } from 'react'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

const TripsContainer = ({setCurrentTour, newData}) => {

  const [selectedOption, setSelectedOption] = useState("");
  const[day, setDay] = useState(0);

  const navigate = useNavigate();

  const [trips, setTrips] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      await axios.get("http://localhost:8080/tours")
      .then((res)=>{
        console.log(res.data)
        setTrips(res.data)
      })
      .catch((err)=>{
        console.error(err)
      })
    }
  
    return () => {
      fetchData()
    }
  }, [newData])

  const handleSelectChange = (e) =>{
    console.log("Selected tour id : ",e.target.value)
    setSelectedOption(e.target.value)

    if(e.target.value){
      setCurrentTour(trips.find((trip) => trip.tourId == e.target.value))
      navigate(`/tour`)
    }else{
      setCurrentTour({})
      navigate(`/`)
    }
  }

  const handleChangeDay = (e) =>{
    console.log("Selected day : ",e.target.value)
    setDay(e.target.value)

    if(e.target.value){
      navigate(`/tour/day/${e.target.value}`)
    }else{
      navigate("/tour")
    }
  }

  const handleSelectedDays = () =>{
    let trip = trips.filter((t) => t.tourId == selectedOption)[0]
    console.log(trip)
    return trip.duration
  }

  return (
    <div className="TripsContainer">
      <div className='trip-selector'>
        <h2>Travel Planner</h2>
        <label htmlFor="trip-select">Select Your trip</label><br/>
        <select id="trip-select" value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select...</option>
          {
            trips.map((trip) => (
              <option key={trip.tourId} value={trip.tourId}>{trip.title}</option>
            ))
          }
        </select>

          {
            selectedOption ?
            <div className='select-day-div'>
              <label htmlFor="day-select">Select Your day</label><br/>
              <select id="day-select" value={day} onChange={handleChangeDay}>
                <option value="">Select...</option>
                {
                  [...Array(handleSelectedDays())].map((_, id) => (
                  <option key={id} value={id+1}>Day {id+1}</option>
                ))
                }
              </select>
            </div>: ""
          }
      </div>
      <div className="create-section">
        <Link to='/tour/create' className='create-button'>Create New</Link>
      </div>
    </div>
  )
}

export default TripsContainer