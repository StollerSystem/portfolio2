import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
      <h1>Projects</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem 
            src='/images/Heptagram1.jpg'
            text='Capstone project for Epicodus - Dual Voice Geometric Step Sequencer built using React and Tone.js'
            label="HEPTAGRAM"
            live='https://heptagram.vercel.app/'
            repo='https://github.com/StollerSystem/HEPTAGRAM'
            />
            {/* <CardItem
              src='/images/Viking1.jpg'
              text='Independent project using React to build a simple website that uses Redux to handle state and components to handle data and views.'
              label='Viking Ship Tap Hall'
              live='https://stollersystem.github.io/Tap_Hall_Redux/'
              repo='https://github.com/StollerSystem/Tap_Hall_Redux'
            />              */}
          </ul>    
          <ul className='cards__items'>            
            <CardItem
              src='/images/Viking1.jpg'
              text='Independent project using React to build a simple website that uses Redux to handle state and components to handle data and views.'
              label='Viking Ship Tap Hall'
              live='https://stollersystem.github.io/Tap_Hall_Redux/'
              repo='https://github.com/StollerSystem/Tap_Hall_Redux'
            />
            <CardItem
              src='/images/DD1.jpg'
              text='A project for our first Team Week at Epicodus - An old school text based RPG, inspired by MUDs from golden age of 28.8K modems!'
              label='Dungeon Darkly'
              live='https://stollersystem.github.io/Dungeon_Darkly/'
              repo='https://github.com/StollerSystem/Dungeon_Darkly'
            />
          </ul>
          <br></br>
          <ul className='cards__items'>
            {/* <CardItem
              src='/images/'
              text=''
              label=''
              live=''
              repo=''
            /> */}

          </ul>      
        </div>
      </div>
    </div>
  )
}

export default Cards;