import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Pagination.css"
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import icon from '../Img/icon.png';


const ResearchLabs = () => {
  const [researchLabs, setResearchLabs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 9;
  const totalPages = Math.ceil(researchLabs.length / itemsPerPage);

  useEffect(() => {
    fetch('http://localhost:3002/api/researchlabs')
      .then(response => response.json())
      .then(data => {
        setResearchLabs(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const getPageItems = () => {
    const filteredItems = researchLabs.filter(research_lab =>
      research_lab.Research_Lab.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  };

  return (
    <>
      <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: "0", padding: " 10vw 3vw 0" }}>
        <a href="/" style={{ textDecoration: 'none', color: '#9D9D9D' }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
          }}>
          <span>Home </span>/
        </a>
        <span style={{ color: '#1F669F', fontWeight: 500 }}> Research Labs</span>
      </p>
      <Container style={{ maxWidth: "78%", fontFamily: 'Prompt', padding: "1.7vw 0 0", letterSpacing: "0em" }}>
        <div style={{ display: "flex" }}>
          <div style={{ color: "#343434", fontSize: "2.5vw", fontWeight: 400, margin: "0", letterSpacing: "-0.04em", width: "80%" }}>Research Labs</div>
          <div style={{ fontSize: "1.4vw", fontWeight: 300, margin: "0 0 0.5vw", letterSpacing: "-0.04em", width: "20%" }}>
            <Paper
              elevation={0}
              style={{
                backgroundColor: '#EEEEEE',
                display: 'flex',
                alignItems: 'center',
                padding: '6px',
                borderRadius: '0.86vw',
                maxHeight: '6vw',
                margin:'0'
              }}
            >
              <IconButton
                type="submit"
                aria-label="search"
                style={{
                  padding: 10,
                }}
              >
                <SearchIcon style={{ fontSize: "2vw" }} />
              </IconButton>
              <InputBase
                placeholder="Search Labs"
                style={{
                  fontSize: "1vw",
                  flex: 1,
                }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Paper>
          </div>
        </div>
        <div style={{ background: "#343434", height: "0.2vw" }}></div>
      </Container>

      <Container style={{ maxWidth: "82%", marginBottom: '2vw' }}>
        <Row>
          {getPageItems().length > 0 ? (
            getPageItems().map(research_lab => (
              <Col key={research_lab._id} lg={4}>
                <a href={`/ResearchLab/${research_lab.Research_Lab}/${research_lab.ResearchLabCode}`} style={{ textDecoration: 'none' }}>
                  <div className="content-container" style={{ letterSpacing: "-0.04em", lineHeight: "1.5vw", fontFamily: 'Prompt', margin: '0.9vw 1.5vw 0.5vw' }}>
                    <div style={{ display: "flex", width: '100%' }}>
                      <div style={{ width: '20%', height: '4.5vw' }}>
                        <img src={icon} alt="/" style={{ width: '100%', height: '100%' }} />
                      </div>
                      <h2  className="underline-on-hover"  style={{ width: '80%', color: "#353535", fontSize: "1.3vw", fontWeight: 300, margin: '1.1vw 0 0.5vw', display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{research_lab.Research_Lab}</h2>
                    </div>
                    <p style={{ lineHeight: '1.2vw', fontWeight: 300, marginLeft: '1.1vw', color: "#757575", fontSize: "0.93vw", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{research_lab.Description}</p>
                  </div>
                </a>
              </Col>
            ))
          ) : (
            <div style={{ textAlign: 'center', margin: '4% auto', fontSize: '1.3vw' , width:'30%'}}>
              No labs found.
            </div>
          )}
        </Row>
      </Container>

      {/* pagination  */}
      {totalPages > 1 && (
        <div className='pagination' style={{ fontFamily: "Inter" }}>
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

export default ResearchLabs;
