import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
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
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <Link to='/' className='social-logo'>
            TRVL <i className='fab fa-typo3' />
          </Link>
          <small className='website-rights'>STOLLERSYSTEM 2020</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label=''
            >
              <i className='fab fa-facebook-f' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer;