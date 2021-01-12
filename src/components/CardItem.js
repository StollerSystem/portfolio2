import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';
import { Button } from './Button';

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link' >
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <a target='_blank' href={props.live}>
              <img src={props.src} alt='Project' className='cards__item__img' />
            </a>
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
          <div className='cards__item__buttons'>
            <a target='_blank' href={props.live}>
              <Button
              className='btns'
              buttonStyle='btn--outline'
              buttonSize='btn--large'>
              LIVE
              </Button>
            </a>
            <a target='_blank' href={props.repo}>
              <Button
              className='btns'
              buttonStyle='btn--outline'
              buttonSize='btn--large'>
              REPO
              </Button>
            </a>
          </div>
        </div>
      </li>
    </>
  )
}

export default CardItem;