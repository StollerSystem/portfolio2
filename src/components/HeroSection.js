import React from 'react';
// import { Button } from './Button';
import './HeroSection.css'
import { Link as Scroll } from 'react-scroll';

function HeroSection() {
  return (
    <div className='hero-container'>
      {/* <video src="/videos/SDO1.mp4" autoPlay loop muted /> */}
      {/* <video src="https://sdo.gsfc.nasa.gov/assets/img/ultra_hd/03044flares_304.mp4" autoPlay loop muted /> */}
      <video src="https://sdo.gsfc.nasa.gov/assets/img/ultra_hd/01715flares_171_sm.mp4" autoPlay loop muted />
      <h1>STOLLERSYSTEM</h1>
      <p>works by Ben Stoller</p>
      <div className='hero-btns'>
        {/* <Button 
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button 
        className='btns'
        buttonStyle='btn--primary'
        buttonSize='btn--large'
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
        <Scroll to='cards' smooth='true'>
          <i className="fas fa-chevron-down fa-3x"></i>
        </Scroll>
      </div>
    </div>
  )
}

export default HeroSection;