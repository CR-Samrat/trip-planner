import React from 'react'
import './../styles/DefaultPage.css'
import { useNavigate } from 'react-router-dom'

const DefaultPage = () => {
  const navigate = useNavigate()
  return (
    <div className='default-page-container'>
      <p>Please select a trip</p>
      <p style={{fontWeight:'bold', margin:'3em 0'}} >Or,</p>
      <button onClick={()=>navigate('/tour/create')}>Create Trip</button>
    </div>
  )
}

export default DefaultPage