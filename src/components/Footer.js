import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      {/* <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Blah blah 
        </p>
        <p className='footer-subscription-text'>
          Blah blah 
        </p>
        
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About</h2>
          </div>
        </div>
      </div> */}
      <section className='social-media'>
        <div className='social-media-wrap'>
          <Link to='/' className='social-logo'>
            STOLLERSYSTEM<i class="fas fa-globe fa-2x"></i>
          </Link>
          <small className='website-rights'>STOLLERSYSTEM 2020</small>
          <div className='social-icons'>
            <a className='social-icon-link' target='_blank'  rel="noreferrer"  href='https://github.com/StollerSystem'><i class="fab fa-github-square fa-3x"></i></a>
            {/* <Link
              className='social-icon-link'
              to='https://github.com/StollerSystem'
              target='_blank'
              aria-label=''
            >
              <i class="fab fa-github-square fa-3x"></i>              
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer;