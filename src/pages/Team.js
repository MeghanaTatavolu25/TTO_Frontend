import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import "../styles/Team.css"
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import linkedin from '../Img/linkedin.png'
import email from '../Img/email.png'
import iiitfacultylink from '../Img/iiitfacultylink.png'
import 'typeface-poppins';
import Chatbot from "../chatbot/Chatbot"

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 12;

  useEffect(() => {
    fetch('http://localhost:3002/api/teams')
      .then(response => response.json())
      .then(data => setTeams(data));
  }, []);

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = teams.slice(indexOfFirstProfile, indexOfLastProfile);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(teams.length / profilesPerPage);

  return (
    <>
    <Chatbot />
      <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: "0", padding: "8vw 3vw 0" }}>
        <a  href="/" 
          style={{ textDecoration: 'none', color: '#9D9D9D'}} 
          onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
          }}
        >
          <span>Home </span>/
        </a>
        <span style={{ color: '#1F669F', fontWeight: 500 }}> The Team
        </span>
      </p>
      <Container style={{ maxWidth: "80%", fontFamily: 'Poppins', paddingTop: "1.5vw", letterSpacing: "0em" }}> 
        <h2 item xs={6} sm={6} md={6}>
          <p style={{ color: "#343434", fontSize: "2.87vw", fontWeight: 400, margin: "0", letterSpacing:"-0.04em" }}>Meet our team</p>
        </h2>
        <div style={{ background: "#343434", height:"0.4vh"}}></div>

        <div className="profile-container">
          {currentProfiles.map((profile) => (
            <div className="profile" key={profile._id}>
              <div className="profile-photo">
                <img src={`https://tto-asset.s3.ap-south-1.amazonaws.com/${profile.ProfilePhoto.key}`} alt="Profile" />
              </div>
              <p className="profile-name">{profile.Name}</p>
              <p className="profile-designation">{profile.Designation}, IIIT Hyderabad</p>
              <div className="profile-icons">
                <a href={profile.LinkedinId} className="profile-icon" target="_blank" rel="noopener noreferrer">
                  <img src={linkedin} alt="LinkedIn" />
                </a>
                <a href={`mailto:${profile.EmailId}`} className="profile-icon">
                  <img src={email} alt="Email" />
                </a>
                {profile.FacultyUrl && (
                  <a href={profile.FacultyUrl} className="profile-icon" target="_blank" rel="noopener noreferrer">
                    <img src={iiitfacultylink} alt="Faculty Page" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* team-Pagination */}
        {totalPages > 1 && (
          <div className='team-pagination' style={{ fontFamily: "Inter" }}>
            {currentPage > 1 && (
              <div className="team-pagination-arrow" onClick={() => handlePageClick(currentPage - 1)}>
                &lt;
              </div>
            )}
            <div className="team-pagination-box">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <div
                      key={pageNumber}
                      className={`team-pagination-button ${pageNumber === currentPage ? "current" : ""}`}
                      onClick={() => handlePageClick(pageNumber)}
                    >
                      {pageNumber}
                    </div>
                  );
                } else if (
                  (pageNumber === currentPage - 2 && currentPage > 3) ||
                  (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return <span key={pageNumber}>&hellip;</span>;
                }
                return null;
              })}
            </div>
            {currentPage < totalPages && (
              <div className="team-pagination-arrow" onClick={() => handlePageClick(currentPage + 1)}>
                &gt;
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
}

export default Team;

