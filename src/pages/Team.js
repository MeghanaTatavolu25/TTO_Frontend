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
import LoadingSpinner from '../Img/loading.gif'; 

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 12;
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch('https://ttobackend.iiithcanvas.com/api/teams')
      .then(response => response.json())
      .then(data => {
        // Sort the teams based on the 'Sequence' field
        const sortedTeams = data.sort((a, b) => a.Sequence - b.Sequence);
        setTeams(sortedTeams);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
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
      <p style={{ fontFamily: "Prompt", fontSize: "1.145vw", margin: "0", padding: "8vw 3vw 0" }}>
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
      <Container style={{ maxWidth: "78%", fontFamily: 'Prompt', padding: "1.5vw 0 0", letterSpacing: "0em" }}> 
      <div style={{ width:'100%' }}>
          <div style={{ color: "#343434", fontSize: "2.49vw", fontWeight: 400, margin: "0", letterSpacing: "-0.04em", width: "77%" }}>Meet our team</div>
        </div>
        <div style={{ background: "#343434", height: "0.156249vw", marginTop:'0.5vw' }}></div>
      <div className="profile-container">
        {isLoading ? ( // Display loading symbol if isLoading is true
          <div style={{ height: '25vw' }}>
            <img src={LoadingSpinner} alt="Loading" style={{ width: '5vw', height: '5vw', margin: '12vw 36vw 0' }} />
          </div>
        ) : (
          currentProfiles.map((profile, index) => (
            <div className="profile" key={index}>
              {profile ? (
                <div className="profile-photo">
                  {profile.ProfilePhoto && profile.ProfilePhoto.key && (
                    <img src={`https://tto-asset.s3.ap-south-1.amazonaws.com/${profile.ProfilePhoto.key}`} alt="Profile" />
                  )}
                </div>
              ) : (
                // Render empty space placeholder
                <div style={{ width: '100%', height: '12.39vw' }} />
              )}
              <p className="profile-name">{profile.Name}</p>
              <p className="profile-designation">{profile.Designation}, IIIT Hyderabad</p>
              <div className="profile-icons">
                <a href={profile.LinkedinId} className="profile-icon" target="_blank" rel="noopener noreferrer">
                  <img src={linkedin} alt="LinkedIn" />
                </a>
                <a href={`mailto:${profile.EmailId}`} className="profile-icon">
                  <img src={email} alt="Email" />
                </a>
                {/* Add a conditional check before rendering the faculty URL icon */}
                {profile.FacultyUrl && typeof profile.FacultyUrl === 'string' && profile.FacultyUrl.startsWith('https') && (
                  <a href={profile.FacultyUrl} className="profile-icon" target="_blank" rel="noopener noreferrer">
                    <img src={iiitfacultylink} alt="Faculty Page" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
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

