import React from 'react';
import '../../App.css';
import { Link as Scroll } from 'react-scroll';

export default function About() {
  return (
    <>
      <div className='about'>
        <h1>ABOUT</h1>
        <div className='projects-btns'>
          <Scroll to='about-me' smooth='true'>
            <i class="fas fa-chevron-down fa-3x"></i>
          </Scroll>
        </div>
      </div>
      <div className='about-me'>
        <p>Born in Wyoming in 1985, I currently live in Portland, OR. The northwest has unparalleled beauty and I love getting out of the city and into the outdoors. Not long after moving to Oregon I started working professionally as a sound engineer. One job led to the next and eventually I started working directly for bands, accompanying them on tour and running live sound for their performance. For the last 10 years I've toured much of the US, Canada and Europe working events in small clubs to massive outdoor festivals. I have made some many great friends and partners over the years and have grown tremendously while out on the road. The time has come however to diversify my skills and explore more career opportunities in the tech industry.</p>
      </div>
    </>
  )
};