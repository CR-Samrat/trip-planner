import { React } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/DayEditForm.css'

function DayEditForm({newData, setNewData, currentDay, currentTour, setCurrentTour}) {

  const [title, setTitle] = useState(currentDay.title ? currentDay.title : "");
  const [description, setDescription] = useState(currentDay.description ? currentDay.description : "");
  const [timeframes, setTimeframes] = useState(currentDay.timeframes ? 
                            currentDay.timeframes.map(({ timeId, ...rest }) => rest) : 
                            [{ startTime: '', endTime: '', task: '' }]);

  const navigate = useNavigate();

  // Function to handle the change in input fields
  const handleTimeframeChange = (index, event) => {
    const newTimeframes = [...timeframes];
    newTimeframes[index][event.target.name] = event.target.value;
    setTimeframes(newTimeframes);
  };

  // Function to remove a timeframe
  const removeTimeframe = (index) => {
    const newTimeframes = timeframes.filter((_, i) => i !== index);
    setTimeframes(newTimeframes);
  };

  // Function to add a new timeframe set
  const addTimeframe = () => {
    setTimeframes([...timeframes, { startTime: '', endTime: '', task: '' }]);
  };

  // Function to handle form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = {
      dayNo: currentDay.dayNo,
      title: title,
      description: description,
      timeframes: timeframes,
    };
    console.log('Form Data:', JSON.stringify(formData, null, 2));
    
    await axios.post(`http://localhost:8080/tours/day/update/${currentTour.tourId}`,formData,{
        headers: {'Content-Type' : 'application/json'}
    }).then(response => {
                    console.log("response :",response.data)
                    setNewData(newData + 1)
                    console.log(newData)
                    setCurrentTour(response.data)
                    navigate(`/tour/day/${currentDay.dayNo}`)
    }).catch((err) => {
        console.error(err);
    })

  };

  return (
    <div className='day-form-container'>
    <form className="day-edit-form" onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {timeframes && timeframes.map((timeframe, index) => (
        <div className="timeframe-container" key={index}>
          <h3>Timeframe {index + 1}</h3>
          <div className='start-end-time-container'>
          <div>
            <label>Start Time:</label>
            <input
              type="text"
              name="startTime"
              value={timeframe.startTime}
              onChange={(event) => handleTimeframeChange(index, event)}
              required
            />
          </div>
          <div>
            <label>End Time:</label>
            <input
              type="text"
              name="endTime"
              value={timeframe.endTime}
              onChange={(event) => handleTimeframeChange(index, event)}
              required
            />
          </div>
          </div>
          <div>
            <label>Task:</label>
            <input
              type="text"
              name="task"
              value={timeframe.task}
              onChange={(event) => handleTimeframeChange(index, event)}
              required
            />
          </div>
          <button type="button" style={{backgroundColor:'red'}} onClick={() => removeTimeframe(index)}>
            Remove Timeframe
          </button>
        </div>
      ))}

      <button type="button" onClick={addTimeframe}>
        + Add Timeframe
      </button>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gridGap:'1em'}}>
      <button className='final-button' type="submit">Submit</button>
      <button className='final-button' type="button" onClick={() => navigate(`/tour/day/${currentDay.dayNo}`)}>Cancel</button>
      </div>
    </form>
    </div>
  );
}

export default DayEditForm;
