import React, { useState }from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import "../styles/Team.css"
import Container from 'react-bootstrap/Container';
import Prakash from '../TeamProfiles/Prakash.png'
import meghana from '../TeamProfiles/meghana.jpg'
import akanksha from '../TeamProfiles/akanksha.jpg'
import pravince from '../TeamProfiles/pravince.jpg'
import shashank from '../TeamProfiles/shashank.jpg'
import anuradha from '../TeamProfiles/anuradha.jpg'
import aditya from '../TeamProfiles/aditya.jpg'
import linkedin from '../Img/linkedin.png'
import email from '../Img/email.png'
import iiitfacultylink from '../Img/iiitfacultylink.png'
import 'typeface-poppins';

const Team = () => {
  // Sample profile data
  const profiles = [
    {
      id: 1,
      name: "Prakash Yalla",
      designation: "Professor",
      photo: Prakash,
      linkedin: "https://www.linkedin.com/in/veera-prakash-y-388b311/",
      email: "prakash.yalla@iiit.ac.in",
      facultyPage: "https://www.iiit.ac.in/people/faculty/Prakashyalla/"
    },
    {
        id: 2,
        name: "Akanksha Srivastava",
        designation: "Product Manager",
        photo: akanksha,
        linkedin: "https://linkedin.com/in/akankshasrivastava",
        email: "akankshasrivastava@research.iiit.ac.in",
        
      },
      {
        id: 3,
        name: "Anuradha Mahapatra",
        designation: "UIUX Designer",
        photo:anuradha,
        linkedin: "https://www.linkedin.com/in/anuradha-mahapatra-736466118/",
        email: "Anuradha.mahapatra@research.iiit.ac.in",
        
      },
      {
        id: 4,
        name: "N D Meghana",
        designation: "Research Translation Engineer",
        photo:meghana,
        linkedin: "https://linkedin.com/in/meghana-tatavolu",
        email: "meghana.tatavolu@research.iiit.ac.in",
        
      },
      {
        id: 5,
        name: "Pravince Kumar",
        designation: "Technical Product Manager",
        photo: pravince,
        linkedin: "https://www.linkedin.com/in/pravincesingh/",
        email: "pravince.kumar@students.iiit.ac.in",
        facultyPage: '#'
      },
      {
        id: 6,
        name: "Aditya Thirani",
        designation: "Technical Product Manager",
        photo: aditya,
        linkedin: "https://www.linkedin.com/in/adityathirani/",
        email: "aditya.thirani@students.iiit.ac.in",
        
      },
      
      {
        id: 7,
        name: "Shashank Nagumantri",
        designation: "Software Development Engineer",
        photo: shashank,
        linkedin: "https://www.linkedin.com/in/shashank-nagumantri",
        email: "shashankn7261@gmail.com",
        
      },
  ];

    // team-Pagination settings
    const profilesPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
  
    // Calculate the index of the first and last profile for the current page
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);
  
    // Handle team-pagination button clicks
    const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    // Calculate total number of pages
    const totalPages = Math.ceil(profiles.length / profilesPerPage);

  return (
    <>
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
            <div className="profile" key={profile.id}>
              <div className="profile-photo" ><img src={profile.photo} alt="Profile" /></div>
              <p className="profile-name">{profile.name}</p>
              <p className="profile-designation">{profile.designation}, IIIT Hyderbad</p>
              <div className="profile-icons">
                <a href={profile.linkedin} className="profile-icon" target="_blank" rel="noopener noreferrer">
                  <img src={linkedin} />
                </a>
                <a href={`mailto:${profile.email}`} className="profile-icon">
                  <img src={email} />
                </a>
                <a href={profile.facultyPage} className="profile-icon" target="_blank" rel="noopener noreferrer">
                  <img src={iiitfacultylink} />
                </a>
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
