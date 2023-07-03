// import React from "react"
// import "../styles/Patent.css"
// import bg from "../assets/cc.jpg"
// import Navbar from "../components/Navbar"
// import Navbar2 from "../components/Navbar2"
// import cvit from "../assets/cvit.png"
// import ButtonRow from "../components/Buttonrow"
// import { Maximize } from "@material-ui/icons"
// import { Grid, Paper, Button, Divider } from '@material-ui/core';
// import { useState, useEffect } from "react";
// import Container from 'react-bootstrap/Container';
// import { Select, MenuItem } from '@material-ui/core';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import calendarIcon from "../Img/calendar.png";
// import { Typography, Checkbox, FormControlLabel, Box, TextField, IconButton } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { FaCalendarAlt } from "react-icons/fa";
// import 'react-calendar/dist/Calendar.css';
// import { Search } from '@material-ui/icons';
// import Modal from 'react-modal';

// import ResponsiveImage from "../components/ResponsiveImage"

// import { InputBase } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';

// import upload from '../Img/upload.png'
// import axios from 'axios';

// // Modal.setAppElement('#yourAppElement');

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//     },
// };


// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//         width: 300,
//         backgroundColor: '#e7f2fb',
//         padding: theme.spacing(2),
//         minHeight: '100vh',
//         padding: ' 0 2em'
//     },
//     filterGroup: {
//         marginTop: theme.spacing(2),
//     },


//     patent-pagination: {
//         display: 'flex',
//         listStyleType: 'none',
//         margin: 0,
//         padding: 0,
//     },

//     heading: {
//         fontFamily: 'Prompt',
//         fontStyle: 'normal',
//         fontWeight: 400,
//         fontSize: '22px',
//         lineHeight: '45px',
//         letterSpacing: '-0.04em',
//         color: '#2C2C2C        '
//     },

//     eachitem: {
//         fontFamily: 'Montserrat',
//         fontStyle: 'normal',
//         fontWeight: 500,
//         color: '#4591C5',
//         lineHeight: '5px',

//     },



//     tableitem: {
//         fontFamily: 'Hahmlet',
//         fontStyle: 'normal',
//         fontWeight: 500,
//         color: '#2C2C2C',
//         lineHeight: '2em',
//         fontSize: '19px',

//     }
//     ,
//     checkbox: {
//         color: '#4591C5  ', // set the color to blue
//         '&$checked': {
//             color: '#0E66AC          ', // set the color of the checked state to blue
//         },
//         // border: '1px solid #0E66AC',

//         borderRadius: '4px'
//     },

//     checked: {},
// }));


// const SearchBar = ({ setSearchQuery }) => {
//     return (
//         <Paper
//             elevation={0}
//             style={{
//                 backgroundColor: '#EEEEEE',
//                 display: 'flex',
//                 alignItems: 'center',
//                 padding: '6px',
//                 borderRadius: '0.86vw',
//                 height: '3.5vw',

//             }}
//         >
//             <IconButton
//                 type="submit"
//                 aria-label="search"
//                 style={{
//                     padding: 10,
//                 }}
//             >
//                 <SearchIcon style={{ fontSize: "2vw" }} />
//             </IconButton>
//             <InputBase
//                 placeholder="Search Patents"
//                 style={{
//                     fontSize: "1vw",
//                     flex: 1,
//                 }}
//                 onChange={(e) => { setSearchQuery(e.target.value); console.log(e.target.value) }}
//             />
//         </Paper>
//     );
// };



// function Component1({ setSearchQuery, setactiveLab, setactiveStatus , activeLab ,activeStatus}) {
//     const classes = useStyles();
//     const [showMoreFilters, setShowMoreFilters] = useState(false);
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [users, setUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [usersPerPage] = useState(5);
//     const [centers, setCenters] = useState([]);
//     const [faculties, setFaculties] = useState([]);
//     const indexOfLastUser = currentPage * usersPerPage;
//     const indexOfFirstUser = indexOfLastUser - usersPerPage;
//     const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
//     const totalPages = Math.ceil(users.length / usersPerPage);
//     const pages = [];
//     const [patents, setPatents] = useState([]);

//     useEffect(() => {
//         fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/patents/patents')
//           .then(response => response.json())
//           .then(data => {
//             // Remove duplicates using Set
//             const uniqueNames = Array.from(new Set(data.map(patent => patent.Center_Name)));
//             // Create an array of objects with unique Center_Name
//             const uniquePatents = uniqueNames.map(name => {
//               // Find the first object with the unique name and return it
//               return data.find(patent => patent.Center_Name === name);
//             });
//             setPatents(uniquePatents);
//           });
//       }, []);
    
//     for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//     }
//     useEffect(() => {
//         // Call your API here and store the response in searchResults state
//         fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/center/centers')
//             .then(response => response.json())
//             .then(data => setCenters(data));
//             fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/center/centers')
//             .then(response => response.json())
//             .then(data => setCenters(data));
//     }, []);
//     console.log(activeLab);

//     return (
//         <>
//             <div>
//                 <SearchBar setSearchQuery={setSearchQuery} />
//                 <Grid container spacing={1} style={{ paddingTop: "0.5vw" }}>
//                     <Grid item xs={12} sm={12} md={12}>
//                         <a href=""><p onClick={() => { setactiveLab(""); setactiveStatus("") }} style={{ width:'100%',color: "#A0A0A0", fontSize: "1.3vw", fontWeight:300}}>Reset Filters</p></a>
//                     </Grid>
//                 </Grid>
//                 <p style={{ color: '#2C2C2C', fontSize: "1.65vw", fontWeight: '400', paddingTop: "0.2vw" }}>
//                     Patent Status
//                     <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>
//                 </p>
//                 <div style={{ fontSize: "1.28vw", fontWeight: 300, lineHeight:'1.6vw' }}>
//                 <a href="#"><p style={{ color: activeStatus === "Filed" ? "#1369CB" : "#2C2C2C", }} onClick={() => setactiveStatus("Filed")}>Filed</p></a>
//                 <a href="#"><p style={{ color: activeStatus === "Published" ? "#1369CB" : "#2C2C2C", }} onClick={() => setactiveStatus("Published")}>Published</p></a>
//                 <a href="#"><p style={{ color: activeStatus === "Granted" ? "#1369CB" : "#2C2C2C", }} onClick={() => setactiveStatus("Granted")}>Granted</p></a>
//                 </div>
//             </div>
//             <div>
//                 <p style={{ color: '#2C2C2C', fontSize: "1.65vw", fontWeight: '400',paddingTop: "0.2vw" }}>
//                     Research Lab
//                     <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0', }}></Grid>

//                 </p>
//                 <div className="product-list" >
//                 {patents.map(patent => (
//                     <a href="#" key={patent.Center_Name}>
//                     <p style={{ color: activeLab === patent.Center_Name ? "#1369CB" : "#2C2C2C", lineHeight: '1.6vw' }} onClick={() => setactiveLab(patent.Center_Name)}>
//                         {patent.Center_Name}
//                     </p>
//                     </a>
//                 ))}
//                 </div>

//             </div>
//             <div>
//                 <p style={{ color: '#2C2C2C', fontSize: "1.65vw", fontWeight: '400',paddingTop: "1vw" }}>
//                     Search By Date
//                     <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>
//                 </p>
//                 <Grid container spacing={0}>
//                     <Grid item xs={12} sm={12} md={12} style={{ padding: "1vw 0 5vw 0" }}>
//                         <Typography style={{ color: '#2C2C2C', fontSize: "0.97vw", fontWeight: '400', fontFamily: "Prompt" }}>Start Date</Typography>
//                         <div style={{ position: "relative", width: "100%" }}>
//                             <label style={{ position: "relative", width: "100%" }}>
//                                 <DatePicker
//                                 selected={startDate}
//                                 onChange={(date) => setStartDate(date)}
//                                 dateFormat="dd/MM/yyyy"
//                                 placeholderText=""
//                                 className="custom-datepicker"
//                                 />
//                                 <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
//                             </label>
                        
//                         </div>
//                     </Grid>
//                     <Grid item xs={12} sm={12} md={12}>
//                         <Typography style={{ color: '#2C2C2C', fontSize: "0.97vw", fontWeight: '400', fontFamily: "Prompt" }}>End Date</Typography>
//                         <div style={{ position: "relative", width: "100%" }}>
//                             <label style={{ position: "relative", width: "100%" }}>
//                                 <DatePicker
//                                 selected={endDate}
//                                 onChange={(date) => setEndDate(date)}
//                                 dateFormat="dd/MM/yyyy"
//                                 placeholderText=""
//                                 className="custom-datepicker"
//                                 />
//                                 <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
//                             </label>
                        
//                         </div>
//                     </Grid>
//                 </Grid>
//             </div>
//         </>
//     )
// }


// import { FiChevronDown } from 'react-icons/fi';
// import { act } from "react-dom/test-utils"

// const DropdownMenu = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const handleToggle = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleOptionClick = (option) => {
//         // Handle the click event for each option
//         console.log('Clicked option:', option);
//     };

//     return (
//         <div className="dropdown-menu">
//             <div className="dropdown-toggle" onClick={handleToggle}>
//                 Sort By <FiChevronDown />
//             </div>
//             {isOpen && (
//                 <div className="dropdown-options">
//                     <div className="option" onClick={() => handleOptionClick('oldest')}>
//                         Oldest
//                     </div>
//                     <div className="option" onClick={() => handleOptionClick('newest')}>
//                         Newest
//                     </div>
//                     <div className="option" onClick={() => handleOptionClick('current')}>
//                         Current
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// function Component2(searchQuery) {
//     const [patents, setPatents] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [patentsPerPage] = useState(7);
  
//     useEffect(() => {
//       fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/patents/patents')
//         .then(response => response.json())
//         .then(data => setPatents(data));
//     }, []);
  
//     const filterpatents = patents.filter(tech => {
//       return tech.Title.toLowerCase().includes(searchQuery.searchQuery.toLowerCase());
//     });
  
//     if (searchQuery.sortvar == 1) {
//       filterpatents.sort((a, b) => a.Year - b.Year);
//     } else if (searchQuery.sortvar == 2) {
//       filterpatents.sort((a, b) => b.Year - a.Year);
//     }
  
//     if (searchQuery.activeLab) {
//       filterpatents = filterpatents.filter(patent => patent.Center_Name == searchQuery.activeLab);
//     }
//     if (searchQuery.activeStatus) {
//       filterpatents = filterpatents.filter(patent => patent.Status == searchQuery.activeStatus);
//     }
  
//     // Pagination
//     const indexOfLastPatent = currentPage * patentsPerPage;
//     const indexOfFirstPatent = indexOfLastPatent - patentsPerPage;
//     const currentPatents = filterpatents.slice(indexOfFirstPatent, indexOfLastPatent);
  
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(filterpatents.length / patentsPerPage); i++) {
//       pageNumbers.push(i);
//     }
  
//     const paginate = pageNumber => setCurrentPage(pageNumber);
  
//     return (
//       <div className="headerContainer" style={{ textAlign: 'left' }}>
//         <div>
//           {currentPatents.map(result => (
//             <Grid item xs={10} sm={10} md={10} style={{ paddingBottom: '2.6vw' }} key={result.id}>
//               <p style={{ fontWeight: '300', fontSize: '1.4vw' }}>
//                 {result.PatentStatusComment} | <span style={{ color: '#1191A3' }}>{result.Center_Name}</span> |{' '}
//                 <span style={{ color: '#08C089' }}>{result.Year}</span>{' '}
//               </p>
//               <p style={{ fontWeight: '500', color: '#2C2C2C', fontSize: '1.63vw' }}>{result.Title}</p>
//               <p style={{ fontWeight: '300', color: '#525252', fontSize: '1.42vw' }}>
//                 Application/Patent No - {result.Patent_Number}, Application - {result.Application_Number}
//               </p>
//               <p style={{ fontWeight: '400', color: '#A7A6A6', fontSize: '1.22vw' }}>
//                 {result.Faculty.map(result2 => (
//                   <p>{result2}</p>
//                 ))}
//               </p>
//             </Grid>
//           ))}
//         </div>
//         <div className="pagination">
//           <div className="pagination-box">
//             {pageNumbers.map(number => (
//               <span
//                 key={number}
//                 className={`pagination-button ${number === currentPage ? 'current' : ''}`}
//                 onClick={() => paginate(number)}
//               >
//                 {number}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// function Patent() {
//     const [sortOption, setSortOption] = useState();
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [sortvar, setsortvar] = useState(0);
//     const [sortstring, setsortstring] = useState("None");
//     const [activeLab, setactiveLab] = useState("");
//     const [activeStatus, setactiveStatus] = useState("");

//     const handleOptionClick = (event) => {
//         if (event.target.value == 0 || event.target.value == 2) {
//             setsortvar(1);
//             setsortstring("Oldest"); // Update 'var' value to 1
//         }
//         else {
//             setsortvar(2);
//             setsortstring("Newest");
//         }
//     };

//     const handleSortChange = (event) => {
//         setSortOption(event.target.value);
//         setIsDropdownOpen(false);
//     };

//     const handleSortClick = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     return (
//         <>
//             <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: "10vw 3vw 0"}}>
//               <a href="/"
//                 style={{ textDecoration: 'none', color: '#9D9D9D'}} 
//                 onMouseEnter={(e) => {
//                 e.target.style.color = '#1369CB';
//                 e.target.style.fontWeight = 600;
//                 }}
//                 onMouseLeave={(e) => {
//                 e.target.style.color = '#9D9D9D';
//                 e.target.style.fontWeight = 500;
//                 }}
//                 >
//                     <span>Home </span>/
//                 </a>
//                 <span style={{ color: '#1F669F', fontWeight: 500 }}> Patent</span>
//             </p>
//             <Container style={{ maxWidth: "78%", margin:'auto', fontFamily: 'Prompt', padding: "1vw 0 0", letterSpacing:"0em"}}>

//                 <div style={{display: "flex"}}>
//                 <div style={{color: "#343434", fontSize: "2.5vw", fontWeight: 400, margin: "0", letterSpacing:"-0.04em", width:"77%"}}>All Patents</div>
//                 <div className='dropdown' style={{ fontSize: "1.4vw", fontWeight: 300, margin: "0.7vw 0 0", letterSpacing: "-0.04em", width: "23%" }}>
//                 <label htmlFor="sort" style={{ color: "#343434",fontSize: "1.4vw" }}>Sort By :&nbsp;</label>
//                 <select onChange={handleOptionClick} style={{ flex: '1', maxWidth: '300px', color: "#1369CB", border: "none", outline: 0  }}>
//                         <option  disabled selected> None </option>
//                         <option onClick={() => handleOptionClick(0)} value={1}> Newest </option>
//                         <option onClick={() => handleOptionClick(1)} value={2} > Oldest </option>
//                 </select>
//                 </div>
//                 </div>
//                 <div style={{ background: "#343434", height:"0.2vw"}}></div>
//             </Container>
//             <div style={{ marginTop: "1vw", display: "flex", width: "100%" }}>
//                     <div
//                         style={{
//                             paddingTop: "1em",
//                             width: '18%',
//                             marginLeft:'11vw',
//                             fontFamily: 'Prompt',
//                             height: 'auto',
//                             minHeight: '84vh',
//                             overflowY: 'auto',
//                             overflowX:'hidden',
//                         }}
//                     >
//                         <Component1 setSearchQuery={setSearchQuery} setactiveLab={setactiveLab} setactiveStatus={setactiveStatus} activeLab={activeLab} activeStatus={activeStatus}/>
//                     </div>

//                     <div style={{
//                         width: '72%',
//                         marginLeft:'4vw',
//                         fontFamily: 'Prompt',
//                         paddingBottom: "10vw"
//                     }}>
//                         <Component2 searchQuery={searchQuery} sortvar={sortvar} activeLab={activeLab} activeStatus={activeStatus} />
//                     </div>
//                 </div>
//         </>
//     );
// }
// export default Patent;











import React from "react"
import "../styles/Patent.css"
import bg from "../assets/cc.jpg"
import Navbar from "../components/Navbar"
import Navbar2 from "../components/Navbar2"
import cvit from "../assets/cvit.png"
import ButtonRow from "../components/Buttonrow"
import { Maximize } from "@material-ui/icons"
import { Grid, Paper, Button, Divider } from '@material-ui/core';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { Select, MenuItem } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from "../Img/calendar.png";
import { Typography, Checkbox, FormControlLabel, Box, TextField, IconButton } from '@material-ui/core';

import { FaCalendarAlt } from "react-icons/fa";
import 'react-calendar/dist/Calendar.css';
import { Search } from '@material-ui/icons';
import Modal from 'react-modal';

import ResponsiveImage from "../components/ResponsiveImage"

import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import upload from '../Img/upload.png'
import axios from 'axios';

// Modal.setAppElement('#yourAppElement');


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



function Component1({ setSearchQuery, setactiveLab, setactiveStatus , activeLab ,activeStatus}) {
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
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
            // Remove duplicates using Set
            const uniqueNames = Array.from(new Set(data.map(patent => patent.Center_Name)));
            // Create an array of objects with unique Center_Name
            const uniquePatents = uniqueNames.map(name => {
              // Find the first object with the unique name and return it
              return data.find(patent => patent.Center_Name === name);
            });
            setPatents(uniquePatents);
          });
      }, []);
    
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    useEffect(() => {
        // Call your API here and store the response in searchResults state
        fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/center/centers')
            .then(response => response.json())
            .then(data => setCenters(data));
            fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/center/centers')
            .then(response => response.json())
            .then(data => setCenters(data));
    }, []);
    console.log(activeLab);

    return (
        <>
            <div>
                <SearchBar setSearchQuery={setSearchQuery} />
                <Grid container spacing={1} style={{ paddingTop: "0.5vw" }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <a href=""><p onClick={() => { setactiveLab(""); setactiveStatus("") }} style={{ width:'100%',color: "#A0A0A0", fontSize: "1.3vw", fontWeight:300}}>Reset Filters</p></a>
                    </Grid>
                </Grid>
                <p style={{ color: '#2C2C2C', fontSize: "1.65vw", fontWeight: '400', paddingTop: "0.2vw" }}>
                    Patent Status
                    <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>
                </p>
                <div style={{ fontSize: "1.28vw", fontWeight: 300, lineHeight:'1.6vw' }}>
                <a href="#"><p style={{ color: activeStatus === "Filed" ? "#1369CB" : "#2C2C2C", }} onClick={() => setactiveStatus("Filed")}>Filed</p></a>
                <a href="#"><p style={{ color: activeStatus === "Published" ? "#1369CB" : "#2C2C2C", }} onClick={() => setactiveStatus("Published")}>Published</p></a>
                <a href="#"><p style={{ color: activeStatus === "Granted" ? "#1369CB" : "#2C2C2C", }} onClick={() => setactiveStatus("Granted")}>Granted</p></a>
                </div>
            </div>
            <div>
                <p style={{ color: '#2C2C2C', fontSize: "1.65vw", fontWeight: '400',paddingTop: "0.2vw" }}>
                    Research Lab
                    <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0', }}></Grid>

                </p>
                <div className="product-list" >
                {patents.map(patent => (
                    <a href="#" key={patent.Center_Name}>
                    <p style={{ color: activeLab === patent.Center_Name ? "#1369CB" : "#2C2C2C", lineHeight: '1.6vw' }} onClick={() => setactiveLab(patent.Center_Name)}>
                        {patent.Center_Name}
                    </p>
                    </a>
                ))}
                </div>

            </div>
            <div>
                <p style={{ color: '#2C2C2C', fontSize: "1.65vw", fontWeight: '400',paddingTop: "1vw" }}>
                    Search By Date
                    <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>
                </p>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} style={{ padding: "1vw 0 5vw 0" }}>
                        <Typography style={{ color: '#2C2C2C', fontSize: "0.97vw", fontWeight: '400', fontFamily: "Prompt" }}>Start Date</Typography>
                        <div style={{ position: "relative", width: "100%" }}>
                            <label style={{ position: "relative", width: "100%" }}>
                                <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
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
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
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
    )
}


import { FiChevronDown } from 'react-icons/fi';
import { act } from "react-dom/test-utils"

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        // Handle the click event for each option
        console.log('Clicked option:', option);
    };

    return (
        <div className="dropdown-menu">
            <div className="dropdown-toggle" onClick={handleToggle}>
                Sort By <FiChevronDown />
            </div>
            {isOpen && (
                <div className="dropdown-options">
                    <div className="option" onClick={() => handleOptionClick('oldest')}>
                        Oldest
                    </div>
                    <div className="option" onClick={() => handleOptionClick('newest')}>
                        Newest
                    </div>
                    <div className="option" onClick={() => handleOptionClick('current')}>
                        Current
                    </div>
                </div>
            )}
        </div>
    );
};



function Component2({ searchQuery, activeLab, activeStatus }) {
    const [patents, setpatents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const patentsPerPage = 7; // Number of patents to display per page
  
    useEffect(() => {
      // Call your API here and store the response in searchResults state
      fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/patents/patents')
        .then(response => response.json())
        .then(data => setpatents(data));
    }, []);
  
    // Pagination Logic
    const indexOfLastPatent = currentPage * patentsPerPage;
    const indexOfFirstPatent = indexOfLastPatent - patentsPerPage;
    const currentPatents = patents.slice(indexOfFirstPatent, indexOfLastPatent);
    const totalPages = Math.ceil(patents.length / patentsPerPage);
  
    const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const filteredPatents = currentPatents.filter(patent => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const lowerCaseTitle = patent.Title.toLowerCase();
      const lowerCaseCenterName = patent.Center_Name.toLowerCase();
      const lowerCaseStatus = patent.Status.toLowerCase();
  
      // Filter by search query, lab, and status
      return (
        lowerCaseTitle.includes(lowerCaseSearchQuery) &&
        (activeLab ? lowerCaseCenterName === activeLab.toLowerCase() : true) &&
        (activeStatus ? lowerCaseStatus === activeStatus.toLowerCase() : true)
      );
    });
    return (
      <div className="headerContainer" style={{ textAlign: "left" }}>
        <div>
          {filteredPatents.map(result => (
            <Grid item xs={10} sm={10} md={10} style={{ paddingBottom: "2.6vw" }} key={result.id}>
              <p style={{ fontWeight: "300", fontSize: "1.4vw" }}> {result.PatentStatusComment} | <span style={{ color: '#1191A3' }}> {result.Center_Name} </span>| <span style={{ color: "#08C089" }}> {result.Year} </span> </p>
              <p style={{ fontWeight: "500", color: "#2C2C2C", fontSize: "1.63vw" }}>{result.Title}</p>
              <p style={{ fontWeight: "300", color: "#525252", fontSize: "1.42vw" }}>Application/Patent No - {result.Patent_Number}, Application - {result.Application_Number}</p>
              <p style={{ fontWeight: "400", color: "#A7A6A6", fontSize: "1.22vw" }}>{result.Faculty.map(result2 => (<p>{result2}</p>))}</p>
            </Grid>
          ))}
        </div>
  
         {/* Pagination */}
      {totalPages > 1 && (
        <div className='patent-pagination' style={{ fontFamily: "Inter" }}>
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
                    className={`patent-pagination-button ${pageNumber === currentPage ? "current" : ""}`}
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
    const [sortOption, setSortOption] = useState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortvar, setsortvar] = useState(0);
    const [sortstring, setsortstring] = useState("None");
    const [activeLab, setactiveLab] = useState("");
    const [activeStatus, setactiveStatus] = useState("");

    const handleOptionClick = (event) => {
        if (event.target.value == 0 || event.target.value == 2) {
            setsortvar(1);
            setsortstring("Oldest"); // Update 'var' value to 1
        }
        else {
            setsortvar(2);
            setsortstring("Newest");
        }
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        setIsDropdownOpen(false);
    };

    const handleSortClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: "10vw 3vw 0"}}>
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
                <select onChange={handleOptionClick} style={{ flex: '1', maxWidth: '300px', color: "#1369CB", border: "none", outline: 0  }}>
                        <option  disabled selected> None </option>
                        <option onClick={() => handleOptionClick(0)} value={1}> Newest </option>
                        <option onClick={() => handleOptionClick(1)} value={2} > Oldest </option>
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
                        <Component1 setSearchQuery={setSearchQuery} setactiveLab={setactiveLab} setactiveStatus={setactiveStatus} activeLab={activeLab} activeStatus={activeStatus}/>
                    </div>

                    <div style={{
                        width: '72%',
                        marginLeft:'4vw',
                        fontFamily: 'Prompt',
                        paddingBottom: "10vw"
                    }}>
                        <Component2 searchQuery={searchQuery} sortvar={sortvar} activeLab={activeLab} activeStatus={activeStatus} />
                    </div>
                </div>
        </>
    );
}
export default Patent;