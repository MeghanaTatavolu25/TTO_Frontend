import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import "../styles/Navbar2.css";

const ResponsiveNavbar = () => {
  return (
    <Navbar style={navbarStyle} className="fixed-top">
      <Nav className="mx-auto d-flex justify-content-center" style={{ gap: '5.5vw' }}>
        <NavLink exact to="/" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          <span style={activeNavLinkUnderlineStyle}></span>
          Home
        </NavLink>
        <NavLink to="/Researchlabs" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          <span style={activeNavLinkUnderlineStyle}></span>
          Technology Catalogue
        </NavLink>
        <NavLink to="/Startups" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          <span style={activeNavLinkUnderlineStyle}></span>
          Startups
        </NavLink>
        <NavLink to="/patents" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          <span style={activeNavLinkUnderlineStyle}></span>
          Patents
        </NavLink>
        <NavLink to="/ProductLab_Products" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          <span style={activeNavLinkUnderlineStyle}></span>
          Products
        </NavLink>
        <a href="https://canvas.iiithcanvas.com/" style={navLinkStyle} target="_blank">
          IIITH-Canvas
        </a>
        <a href="https://devportal.iiithcanvas.com/login" style={navLinkStyle} target="_blank">
          APIs
        </a>
        <a href="https://portal2022-rndshowcase.iiit.ac.in/expo-hall/" style={navLinkStyle} target="_blank">
          R&amp;D Showcase
        </a>
        <NavLink to="/Team" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
          <span style={activeNavLinkUnderlineStyle}></span>
          The Team
        </NavLink>
      </Nav>
    </Navbar>
  );
};

const navbarStyle = {
  background: 'linear-gradient(90deg, #21328F 0%, #3085BF 73.54%, #7D4ABC 100%)',
  height: '2.8vw',
  position: 'fixed',
  marginTop: '4.3%',
  right: '0',
  left: '0',
};

const navLinkStyle = {
  fontSize: '1vw',
  fontFamily: 'Prompt',
  letterSpacing: '0.01em',
  color: '#FFFFFF',
  fontWeight: 400,
  textDecoration: 'none', // Remove default underline
};

const activeNavLinkStyle = {
  position: 'relative', // Set position to relative for the parent NavLink
  textDecoration: 'none', // Remove default underline
};

const activeNavLinkUnderlineStyle = {
  content: '""',
  position: 'absolute',
  bottom: '-2px', // Adjust this value to control the distance between the text and the underline
  left: 0,
  width: '100%',
  height: '1.5px',
  borderRadius: '4px',
  background: '#D9D9D9',
};

export default ResponsiveNavbar;
