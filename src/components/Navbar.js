import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
// import { Button } from './Button';
import * as Scroll from 'react-scroll';
// import { Link as ScrollLink } from 'react-scroll';


function Navbar() {

  var scroll = Scroll.animateScroll;

  const [click, setClick] = useState(false);
  // const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
    scroll.scrollToTop({ smooth: false, duration: 0 });
  }
  // const showButton = () => {
  //   if(window.innerWidth <= 960) {
  //     setButton(false)
  //   } else {
  //     setButton(true)
  //   }
  // }

  // useEffect(() => {
  //   showButton();
  // }, [])

  // window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <i className="fas fa-globe"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              {/* <ScrollLink to='cards' smooth='true'> */}
                <Link to="/" className='nav-links' onClick={closeMobileMenu}>
                  Projects
                </Link>
              {/* </ScrollLink> */}
            </li>
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li> */}
            <li className='nav-item'>
              <Link to='/blaststuff' className='nav-links' onClick={closeMobileMenu}>
                Blast stuff
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
               Projects
              </Link>
            </li> */}

          </ul>
          {/* {button && <Button buttonStyle='btn--outline'> SIGN UP </Button>} */}
        </div>
      </nav>
    </>
  )
}

export default Navbar;