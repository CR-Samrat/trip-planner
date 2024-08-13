import './App.css';
import DefaultPage from './components/DefaultPage';
import TripsContainer from './components/TripsContainer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TripTemplate from './components/TripTemplate';
import DayTemplate from './components/DayTemplate';
import PdfConverter from './components/PdfConverter';
import TourForm from './components/TourForm';
import { useState } from 'react';
import EditForm from './components/EditForm';
import DayEditForm from './components/DayEditForm';

function App() {

  const[currentTour, setCurrentTour] = useState({})
  const[newData, setNewData] = useState(0)
  const[currentDay, setCurrentDay] = useState({})

  return (
    <Router>
    <div className="App">
      <TripsContainer setCurrentTour={setCurrentTour} newData={newData}/>

      <Routes>
        <Route path='/' element={<DefaultPage/>}/>
        <Route path='/tour/' element={<TripTemplate trip_details={currentTour}/>}/>
        <Route path='/tour/day/:day' element={<DayTemplate currentDay={currentDay} setCurrentDay={setCurrentDay} currentTour={currentTour}/>}/>
        <Route path='/pdf' element={<PdfConverter/>}/>
        <Route path='/tour/create' element={<TourForm newData={newData} setNewData={setNewData} setCurrentTour={setCurrentTour}/>}/>
        <Route path='/tour/edit' element={<EditForm newData={newData} currentTour={currentTour} setCurrentTour={setCurrentTour}/>}/>
        <Route path='/tour/day/edit' element={<DayEditForm newData={newData} setNewData={setNewData} currentDay={currentDay} currentTour={currentTour} setCurrentTour={setCurrentTour}/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
