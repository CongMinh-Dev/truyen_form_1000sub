import React from 'react'
import "./backToHome.scss"
import {  useNavigate } from 'react-router-dom'

function BackToHome() {
  let navigate=useNavigate()

  const scrollToElement = () => {
    const element = document.querySelector("#header");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  
  return (
    <div className='back_home'>
      <button onClick={() => {
        navigate("/")
        scrollToElement()
      }
      }>BACK</button>
    </div>
  )
}

export default BackToHome
