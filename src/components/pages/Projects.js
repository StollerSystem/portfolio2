import React, { useEffect } from 'react';
import '../../App.css';
// import ProjectCards from '../ProjectCards';
// import { Link as Scroll } from 'react-scroll';
// import '../HeroSection.css';
import { callGame } from './game/game.js';

export default function Projects() {

  // componentDidMount() {
  //   callGame();
  // }

  useEffect(() => {
    
    var canvas = document.getElementById("defaultCanvas0");
    // console.log(canvas)
    if (!canvas) {
      
      callGame();
    } 
    return () => {
      window.location.reload(false);
      // console.log("unmount")
      // if (canvas) {
      //   canvas.remove();
      // }
    }
  });

  return (
    <>
      <div className="game-container" id="game" />


      {/* <div className='projects'>
        <h1 >PROJECTS</h1>
        <div className='projects-btns'>
          <Scroll to='cards' smooth='true'>
            <i className="fas fa-chevron-down fa-3x"></i>
          </Scroll>
        </div>
      </div>
      <ProjectCards /> */}
    </>
  )
};