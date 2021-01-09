import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these projects</h1>
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
          </ul>
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

export default Cards;