import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, IconButton, InputBase } from '@material-ui/core';
import "../styles/Patent.css"
import Container from 'react-bootstrap/Container';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from "../Img/calendar.png";
import 'react-calendar/dist/Calendar.css';
import SearchIcon from '@material-ui/icons/Search';
import Chatbot from '../chatbot/Chatbot';


const SearchBar = ({ setSearchQuery }) => {
  return (
      <Paper
          elevation={0}
          style={{
              backgroundColor: '#EEEEEE',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '0.86vw',
              height: '3.5vw',

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
              placeholder="Search Patents"
              style={{
                  fontSize: "1vw",
                  flex: 1,
              }}
              onChange={(e) => { setSearchQuery(e.target.value); console.log(e.target.value) }}
          />
      </Paper>
  );
};


function Component1({ setSearchQuery, setactiveLab, setactiveStatus, activeLab, activeStatus, selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate }) {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [centers, setCenters] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const pages = [];
  const [patents, setPatents] = useState([]);

  useEffect(() => {
    fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/patents/patents')
      .then(response => response.json())
      .then(data => {
        const uniqueNames = Array.from(new Set(data.map(patent => patent.Center_Name)));
        const uniquePatents = uniqueNames.map(name => {
          return data.find(patent => patent.Center_Name === name);
        });
        setPatents(uniquePatents);
      });
  }, []);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
      <div>
        <SearchBar setSearchQuery={setSearchQuery} />
        <Grid container spacing={1} style={{ paddingTop: "0.5vw" }}>
          <Grid item xs={12} sm={12} md={12}>
            <a href=""><p onClick={() => { setactiveLab(""); setactiveStatus(""); setSelectedStartDate(null); setSelectedEndDate(null); }} style={{ width: '100%', color: "#A0A0A0", fontSize: "1.3vw", fontWeight: 300 }}>Reset Filters</p></a>
          </Grid>
        </Grid>
        <p style={{ color: '#2C2C2C', fontSize: "1.65vw", fontWeight: '400', paddingTop: "0.2vw" }}>
          Patent Status
          <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>
        </p>
        <div style={{ fontSize: "1.28vw", fontWeight: 300, lineHeight: '1.6vw' }}>
          <a href="#">
            <p style={{ color: activeStatus === "filed" ? "#1369CB" : "#2C2C2C" }} onClick={() => setactiveStatus(activeStatus === "filed" ? "" : "filed")}>
              Filed
            </p>
          </a>
          <a href="#">
            <p style={{ color: activeStatus === "published" ? "#1369CB" : "#2C2C2C" }} onClick={() => setactiveStatus(activeStatus === "published" ? "" : "published")}>
              Published
            </p>
          </a>
          <a href="#">
            <p style={{ color: activeStatus === "granted" ? "#1369CB" : "#2C2C2C" }} onClick={() => setactiveStatus(activeStatus === "granted" ? "" : "granted")}>
              Granted
            </p>
          </a>
        </div>
      </div>
      <div>
        <p style={{ color: '#2C2C2C', fontSize: "1.65vw", fontWeight: '400', paddingTop: "0.2vw" }}>
          Research Lab
          <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0', }}></Grid>
        </p>
        <div className="center-name" >
          {patents.map(patent => (
            <a href="#" key={patent.Center_Name}>
              <p style={{ color: activeLab === patent.Center_Name ? "#1369CB" : "#2C2C2C", lineHeight: '1.6vw' }} onClick={() => setactiveLab(activeLab === patent.Center_Name ? "" : patent.Center_Name)}>
                {patent.Center_Name}
              </p>
            </a>
          ))}
        </div>
      </div>
      <div>
        <p style={{ color: '#2C2C2C', fontSize: "1.65vw", fontWeight: '400', paddingTop: "1vw" }}>
          Search By Date
          <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>
        </p>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} style={{ padding: "1vw 0 5vw 0" }}>
            <Typography style={{ color: '#2C2C2C', fontSize: "0.97vw", fontWeight: '400', fontFamily: "Prompt" }}>Start Date</Typography>
            <div style={{ position: "relative", width: "100%" }}>
              <label style={{ position: "relative", width: "100%" }}>
                <DatePicker
                  selected={selectedStartDate}
                  onChange={(date) => setSelectedStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText=""
                  className="custom-datepicker"
                />
                <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
              </label>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography style={{ color: '#2C2C2C', fontSize: "0.97vw", fontWeight: '400', fontFamily: "Prompt" }}>End Date</Typography>
            <div style={{ position: "relative", width: "100%" }}>
              <label style={{ position: "relative", width: "100%" }}>
                <DatePicker
                  selected={selectedEndDate}
                  onChange={(date) => setSelectedEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText=""
                  className="custom-datepicker"
                />
                <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
              </label>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
function Component2({ searchQuery, sortOption, activeLab, activeStatus, selectedStartDate, selectedEndDate }) {
  const [patents, setPatents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const patentsPerPage = 7; // Number of patents to display per page

  useEffect(() => {
    fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/patents/patents')
      .then(response => response.json())
      .then(data => setPatents(data));
  }, []);

  // Apply filters
  let filterPatents = patents;

  if (searchQuery) {
    filterPatents = filterPatents.filter(patent =>
      patent.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply sorting
  if (sortOption === "Newest") {
    filterPatents = filterPatents.sort((a, b) => {
      const yearA = a.Published_Year ? parseInt(a.Published_Year.substring(0, 4), 10) : 0;
      const yearB = b.Published_Year ? parseInt(b.Published_Year.substring(0, 4), 10) : 0;
      return yearB - yearA;
    });
  } else if (sortOption === "Oldest") {
    filterPatents = filterPatents.sort((a, b) => {
      const yearA = a.Published_Year ? parseInt(a.Published_Year.substring(0, 4), 10) : 0;
      const yearB = b.Published_Year ? parseInt(b.Published_Year.substring(0, 4), 10) : 0;
      return yearA - yearB;
    });
  } else if (sortOption === "A-Z") {
    filterPatents = filterPatents.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortOption === "Z-A") {
    filterPatents = filterPatents.sort((a, b) => b.Title.localeCompare(a.Title));
  }

  if (activeLab) {
    filterPatents = filterPatents.filter(patent => patent.Center_Name === activeLab);
  }

  if (activeStatus) {
    filterPatents = filterPatents.filter(
      patent => patent.PatentStatusComment.toLowerCase() === activeStatus
    );
  }

  if (selectedStartDate && selectedEndDate) {
    filterPatents = filterPatents.filter(patent => {
      const publishedYear = new Date(patent.Published_Year).getFullYear();
      return (
        publishedYear >= selectedStartDate.getFullYear() &&
        publishedYear <= selectedEndDate.getFullYear()
      );
    });
  } else if (selectedStartDate) {
    filterPatents = filterPatents.filter(patent => {
      const publishedYear = new Date(patent.Published_Year).getFullYear();
      return publishedYear >= selectedStartDate.getFullYear();
    });
  } else if (selectedEndDate) {
    filterPatents = filterPatents.filter(patent => {
      const publishedYear = new Date(patent.Published_Year).getFullYear();
      return publishedYear <= selectedEndDate.getFullYear();
    });
  }

  // Pagination
  const indexOfLastPatent = currentPage * patentsPerPage;
  const indexOfFirstPatent = indexOfLastPatent - patentsPerPage;
  const currentPatents = filterPatents.slice(indexOfFirstPatent, indexOfLastPatent);
  const totalPages = Math.ceil(filterPatents.length / patentsPerPage);

  const handlePageClick = value => {
    setCurrentPage(value);
  };

  return (
    <div className="headerContainer" style={{ textAlign: 'left' }}>
      <div>
        {currentPatents.map(result => (
          <Grid item xs={10} sm={10} md={10} style={{ paddingBottom: '2.6vw' }} key={result.id}>
            <p style={{ fontWeight: '300', fontSize: '1.4vw' }}>
              {result.PatentStatusComment} |{' '}
              <span style={{ color: '#1191A3' }}>{result.Center_Name}</span> |{' '}
              <span style={{ color: '#08C089' }}>{new Date(result.Published_Year).getFullYear()}</span>
            </p>
            <p style={{ fontWeight: '500', color: '#2C2C2C', fontSize: '1.63vw' }}>{result.Title}</p>
            <p style={{ fontWeight: '300', color: '#525252', fontSize: '1.42vw' }}>
              Application/Patent No - {result.Patent_Number}, Application - {result.Application_Number}
            </p>
            <p style={{ fontWeight: '400', color: '#A7A6A6', fontSize: '1.22vw' }}>
              {result.Faculty.map(result2 => (
                <p>{result2}</p>
              ))}
            </p>
          </Grid>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="patent-pagination" style={{ fontFamily: 'Inter' }}>
          {currentPage > 1 && (
            <div className="patent-pagination-arrow" onClick={() => handlePageClick(currentPage - 1)}>
              &lt;
            </div>
          )}
          <div className="patent-pagination-box">
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
                    className={`patent-pagination-button ${pageNumber === currentPage ? 'current' : ''}`}
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
            <div className="patent-pagination-arrow" onClick={() => handlePageClick(currentPage + 1)}>
              &gt;
            </div>
          )}
        </div>
      )}
    </div>
  );
}


function Patent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("None");
  const [activeLab, setactiveLab] = useState("");
  const [activeStatus, setactiveStatus] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleOptionClick = (event) => {
    const optionValue = event.target.value;
    setSortOption(optionValue);
  };

  return (
      <>
      <Chatbot />
          <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: "8vw 3vw 0"}}>
            <a href="/"
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
              <span style={{ color: '#1F669F', fontWeight: 500 }}> Patent</span>
          </p>
          <Container style={{ maxWidth: "78%", margin:'auto', fontFamily: 'Prompt', padding: "1vw 0 0", letterSpacing:"0em"}}>

              <div style={{display: "flex"}}>
              <div style={{color: "#343434", fontSize: "2.5vw", fontWeight: 400, margin: "0", letterSpacing:"-0.04em", width:"77%"}}>All Patents</div>
              <div className='dropdown' style={{ fontSize: "1.4vw", fontWeight: 300, margin: "0.7vw 0 0", letterSpacing: "-0.04em", width: "23%" }}>
              <label htmlFor="sort" style={{ color: "#343434",fontSize: "1.4vw" }}>Sort By :&nbsp;</label>
              <select value={sortOption} onChange={handleOptionClick} style={{ flex: '1', maxWidth: '300px', color: "#1369CB", border: "none", outline: 0 }}>
                <option disabled value="None">None</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
              </div>
              </div>
              <div style={{ background: "#343434", height:"0.2vw"}}></div>
          </Container>
          <div style={{ marginTop: "1vw", display: "flex", width: "100%" }}>
                  <div
                      style={{
                          paddingTop: "1em",
                          width: '18%',
                          marginLeft:'11vw',
                          fontFamily: 'Prompt',
                          height: 'auto',
                          minHeight: '84vh',
                          overflowY: 'auto',
                          overflowX:'hidden',
                      }}
                  >
                  <Component1
                   setSearchQuery={setSearchQuery}
                   setactiveLab={setactiveLab}
                   setactiveStatus={setactiveStatus}
                   activeLab={activeLab}
                   activeStatus={activeStatus}
                   selectedStartDate={selectedStartDate}
                   setSelectedStartDate={setSelectedStartDate}
                   selectedEndDate={selectedEndDate}
                   setSelectedEndDate={setSelectedEndDate}
                  />
                  </div>

                  <div style={{
                      width: '72%',
                      marginLeft:'4vw',
                      fontFamily: 'Prompt',
                      paddingBottom: "10vw"
                  }}>
                <Component2
                  searchQuery={searchQuery}
                  sortOption={sortOption}
                  activeLab={activeLab}
                  activeStatus={activeStatus}
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                />
                </div>
              </div>
      </>
  );
}
export default Patent;