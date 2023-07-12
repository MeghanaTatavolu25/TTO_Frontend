import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Pagination.css"
import Container from 'react-bootstrap/Container'
import { Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

import icon from '../Img/icon.png'; // Import the default icon image

const Startups = () => {
  const [startups, setStartups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("newest");
  const itemsPerPage = 6;
  const totalPages = Math.ceil(startups.length / itemsPerPage);

  useEffect(() => {
    fetch('http://localhost:3002/api/startups')
      .then(response => response.json())
      .then(data => {
        setStartups(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const getStartupImageURL = (startup) => {
    const baseS3URL = 'https://tto-asset.s3.ap-south-1.amazonaws.com/'; // Replace with your S3 base URL
    const imageURL = `${baseS3URL}${startup.StartUpLogo?.key}`;
  
    if (imageURL.includes('DummyImage/')) {
      return icon; // Return the default icon if imageURL contains 'DummyImage/'
    }
  
    return imageURL; // Return the imageURL if it doesn't contain 'DummyImage/'
  };


  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption.value);
    setCurrentPage(1);
  };

  const getPageItems = () => {
    const sortedItems = [...startups];
    switch (sortOption) {
      case "newest":
        sortedItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        sortedItems.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "az":
        sortedItems.sort((a, b) => a.StartUp_Name.localeCompare(b.StartUp_Name));
        break;
      case "za":
        sortedItems.sort((a, b) => b.StartUp_Name.localeCompare(a.StartUp_Name));
        break;
      default:
        break;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedItems.slice(startIndex, endIndex);
  };

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "az", label: "A-Z" },
    { value: "za", label: "Z-A" },
  ];


  const customStyles = {
    control: (provided) => ({
      ...provided,
      width:'100%',
      borderRadius: '8px',
      border: '0',
      focus:'none',
      outline: '0',
      color: "#1369CB",
    }),
    option: (provided, state) => ({
      ...provided,
      background:
        'linear-gradient(0deg, #E8FCFD 0%, #E8FCFD 100%), #FFFBFE',
      color: state.isSelected ? '#1C1B1F' : 'var(--m-3-sys-light-on-surface, #1C1B1F)',
      fontSize: '16px',
      fontFamily: 'Prompt',
      fontStyle: 'normal',
      fontWeight: '400',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      '&:hover': {
        
        color: '#919192',
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#1369CB',
    }),
  };

  return (
    <>
      <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: "0", padding:" 8vw 3vw 0" }}>
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
        <span style={{ color: '#1F669F', fontWeight: 500 }}> Startup</span>
      </p>
        <Container style={{ maxWidth: "78%", fontFamily: 'Prompt', padding: "1.7vw 0 0", letterSpacing:"0em"}}>
          <div style={{display: "flex"}}>
            <div style={{color: "#343434", fontSize: "2.5vw", fontWeight: 400, margin: "0", letterSpacing:"-0.04em", width:"77%"}}>All Startups</div>
            <div className='dropdown' style={{ display:'flex',fontSize: "1.4vw", fontWeight: 300, margin: "0.7vw 0 0", letterSpacing: "-0.04em", width:'23%'}}>
              <label htmlFor="sort" style={{ color: "#343434",fontSize: "1.4vw", flexBasis:'50%', textAlign:'right' }}>Sort By :&nbsp;</label>
              <Select
                id="sort"
                options={sortOptions}
                value={sortOptions.find(option => option.value === sortOption)}
                onChange={handleSortChange}
                styles={customStyles}
                isSearchable={false}
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <div style={{ background: "#343434", height:"0.2vw"}}></div>
        </Container>

        <Container style={{ maxWidth: "82%", marginBottom:'2vw' }}>
        <Row>
        {getPageItems().map(startup => (
          <Col key={startup._id} lg={4}>
            <a href={startup.Website} style={{ textDecoration: 'none' }} target="_blank">
                <div style={{letterSpacing: "-0.04em", lineHeight: "1.5vw", fontFamily: 'Prompt', margin: '1.5vw 1.5vw 2.8vw'}}>
                  <div className="content-container" style={{display: "flex", alignItems: "flex-start", margin:'0', width:'100%'}}>
                    <div style={{width:'20%',height:'2.5vw', textAlign:'left', justifyContent:'left',marginLeft:'1.2vw'}}>
                      <img src={getStartupImageURL(startup)} alt="/" style={{width:'3.5vw',height:'100%'}} /></div>
                    <h2 className="underline-on-hover" style={{ width:'80%',color: "#353535", fontSize: "1.3vw", fontWeight: 400, margin:'0.5vw 0 1vw', display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis"}}>{startup.StartUp_Name}</h2>
                  </div>
                  <p style={{lineHeight: '1.2vw', marginLeft:'1.1vw',color: "#757575", fontSize: "1vw", fontWeight: 300,display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{startup.Idea_Description}</p>
                  <div style={{ marginTop:'20px',marginLeft:'1.1vw',color: "#A7A6A6", fontSize: "0.94vw", fontWeight: 300, lineHeight:'0.6vw'}}>
                  <p>Founder - {startup.Founder_Name}</p>
                  <p>Professor - {startup.Professor_Name}</p>
                  <p>Center - {startup.Centre_Name}</p>
                  </div>
                </div>
              </a>
          </Col>
        ))}
        </Row>
      </Container>
  
      {/* pagination  */}
      {totalPages > 1 && (
          <div className='pagination' style={{fontFamily:"Inter"}}>
            {currentPage > 1 && (
              <div className="pagination-arrow" onClick={() => handlePageClick(currentPage - 1)}>
                &lt;
              </div>
            )}
            <div className="pagination-box">
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
                      className={`pagination-button ${pageNumber === currentPage ? "current" : ""}`}
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
              <div className="pagination-arrow" onClick={() => handlePageClick(currentPage + 1)}>
                &gt;
              </div>
            )}
          </div>
        )}

    </>
  );
}

export default Startups;
