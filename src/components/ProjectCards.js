import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function ProjectCards() {
  return (
    <div className='cards'>
      {/* <h1>Featured Projects</h1> */}
      <div className='cards__container'>
        <div className='cards__wrapper'>          
          <ul className='cards__items'>
            <CardItem 
            src='/images/ScreenShot2.jpg'
            text='This is a test card for a project'
            label="Project1"
            path='/services'
            /> 
            <CardItem 
            src='/images/ScreenShot2.jpg'
            text='This is a test card for a project'
            label="Project1"
            path='/services'
            /> 
            <CardItem 
            src='/images/ScreenShot2.jpg'
            text='This is a test card for a project'
            label="Project1"
            path='/services'
            /> 
          </ul>
          <br></br>
          <ul className='cards__items'>
            <CardItem 
            src='/images/ScreenShot2.jpg'
            text='This is a test card for a project'
            label="Project1"
            path='/services'
            /> 
            <CardItem 
            src='/images/ScreenShot2.jpg'
            text='This is a test card for a project'
            label="Project1"
            path='/services'
            /> 
            <CardItem 
            src='/images/ScreenShot2.jpg'
            text='This is a test card for a project'
            label="Project1"
            path='/services'
            /> 
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProjectCards;