import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import "../styles/Navbar2.css";

const ResponsiveNavbar = () => {
  return (
    <Navbar
      style={navbarStyle}
      className="fixed-top"
    >
      <Nav
        className="mx-auto d-flex justify-content-center"
        style={{ gap: '5.5vw', fontSize: '1.5vw' }}
      >
        <NavLink
          exact
          to="/"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle} // Add activeStyle for active link styling
        >
          Home
        </NavLink>
        <NavLink
          to="/Researchlabs"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
        >
          Research Labs
        </NavLink>
        <NavLink
          to="/patents"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
        >
          Patent
        </NavLink>
        {/* <NavLink
          to="/publications"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
        >
          Publications
        </NavLink> */}
        <a
          href="https://canvas.iiithcanvas.com/"
          style={navLinkStyle}
          target="_blank"

        >
          IIITH-Canvas
        </a>
        <a
          href="https://devportal.iiithcanvas.com/login"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
          target="_blank"
        >
          API's
        </a>
        <a
          href="https://portal2022-rndshowcase.iiit.ac.in/expo-hall/"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
          target="_blank"
        >
          R&amp;D Showcase
        </a>
        <NavLink
          to="/team"
          style={navLinkStyle}
          activeStyle={activeNavLinkStyle}
        >
          The Team
        </NavLink>
      </Nav>
    </Navbar>
  );
};

const navbarStyle = {
  background: 'linear-gradient(90deg, #09A5AF 16.15%, #546B81 85.67%)',
  height: '2.5vw',
  position: 'fixed',
  marginTop: '4.5%',
  right: '0',
  left: '0',
  
};

const navLinkStyle = {
  fontSize: '1.2vw',
  fontFamily: 'Hahmlet',
  color: '#FFFFFF',
  fontWeight: 500,
};

const activeNavLinkStyle = {
  textDecoration: 'underline', // Add underline for active link
};

export default ResponsiveNavbar;
