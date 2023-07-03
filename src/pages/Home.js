import React from "react"
import "../styles/Home.css"
import bg from "../assets/cc.jpg"
import Navbar from "../components/Navbar"
import Navbar2 from "../components/Navbar2"
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Grid, Paper, Button, Divider } from '@material-ui/core';

import { Row, Col, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import img2 from '../Img/image 2.png'
import img8 from '../Img/image 8.png'
import img11 from '../Img/image 11.png'
import img13 from '../Img/image 13.png'
import img14 from '../Img/image 14.png'
import landing from '../Img/landing.png'
import img16 from '../Img/image 16.png'
import img17 from '../Img/image 17.png'
import hor_img from '../Img/hehe.jpg'
import img18 from '../Img/topc.jpg'

import icon1 from '../Img/Icon1.png'
import icon2 from '../Img/icon2.png'
import icon3 from '../Img/icon3.png'
import Chatbot from "../chatbot/Chatbot"


import t1 from '../Img/t1.png'
import t2 from '../Img/t2.png'
import t3 from '../Img/t3.png'
import t4 from '../Img/t4.png'
import ImageSlider from "../components/LinkSlider"
import ResponsiveImage from "../components/ResponsiveImage"
import { Link } from 'react-router-dom'

const items = [
    {
        id: 1,
        heading: "Startup Seeding",
        icon: icon1,
        image: img2,
        text: "Innovator looking to build Deep-tech Startup",
        description: "Lorem ipsum dolor sit amet, consectetur ",
    },
    {
        id: 2,
        heading: "Technology Licensing",
        icon: icon2,
        image: img13,
        text: "Startup or Company looking for Technology",
        description: "Technology transfer and outreach at IIIT-H is facilitated by the Technology Transfer Office (TTO).TTO manages the transfer process of Intellectual Property (IP) produced in IIIT-H to appropriate bodies including industry, entrepreneurs, etc. and makes all attempts to commercialize the IP",
    },
    {
        id: 3,
        heading: "Productize",
        icon: icon3,
        image: img14,
        description: "TTO manages Product Labs that develops market relevant product prototypes from research output of the Labs at our Institute. Product labs work with industry partners to develop relevant prototypes  ",
        text: "Individual wants to build product using technology from product labs"
    },
];

const Item = ({ heading, icon, image, description, text }) => (
    <>
        <div
            style={{
                borderRadius: '2.27vw',
                background: 'linear-gradient(134deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.09) 100%)',
                boxShadow: '0px 0px 50px -25px rgba(0, 0, 0, 0.50)',
                backdropFilter: 'blur(50px)',
                height: "23.5vw",
                width:'19vw',
                padding: "1vw 1.5vw",
                transition: "transform 0.3s, box-shadow 0.3s", // Add transition for smooth animation
                transformOrigin: "center", // Set the transform origin to the center
                transform: "scale(1)", // Initial scale value
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; // Scale up on hover
                e.currentTarget.style.boxShadow =
                    "0px 0px 50px -25px rgba(0, 0, 0, 0.7), 0px 0px 30px -15px rgba(0, 0, 0, 0.3)"; // Add dark shadow when expanded
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Scale back to the original size when not hovering
                e.currentTarget.style.boxShadow =
                    "0px 0px 50px -25px rgba(0, 0, 0, 0.5)"; // Restore original shadow
            }}
        >
            <ResponsiveImage src={icon} alt="icon" maxWidth={380} maxHeight={280} />
            <div className="myheading">{heading}</div>
            <div className="mydescription">{description}</div>
        </div>
    </>
);




import { useState, useEffect } from "react";


function Home() {

    const [centers, setCenters] = useState([]);
    const [monthsAgo1, setMonthsAgo1] = useState(null);
    const [monthsAgo2, setMonthsAgo2] = useState(null);
    const [monthsAgo3, setMonthsAgo3] = useState(null);
    const [monthsAgo4, setMonthsAgo4] = useState(null);
    const [startup,setstartup]=useState([]);
    const [patent,setpatent]=useState([]);
    const [product,setproduct]=useState([]);

    useEffect(() => {
        fetch('http://localhost:3002/api/researchlabs')
            .then(response => response.json())
            .then(data => {
                // Filter out centers with valid Est_Year values
                const validCenters = data.filter(center => center.created_at);
                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.created_at - a.created_at);
                    // Get the top 10 centers from the sorted array or all centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));
                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    // Update the state with the selected center
                    setCenters(randomCenter);
                    let ageText;
                    const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo1(ageText);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter.Name);
                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);


    useEffect(() => {
        fetch('http://localhost:3002/api/startups')
            .then(response => response.json())
            .then(data => {
                // Filter out centers with valid Est_Year values
                const validCenters = data.filter(center => center.created_at);
                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.created_at - a.created_at);
                    // Get the top 10 centers from the sorted array or all centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));
                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    // Update the state with the selected center
                    setstartup(randomCenter);
                    const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    let ageText;

                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo2(ageText);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter.Name);
                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);


    useEffect(() => {
        fetch('http://localhost:3002/api/patents')
            .then(response => response.json())
            .then(data => {
                // Filter out centers with valid Est_Year values
                const validCenters = data.filter(center => center.YearofGrant);

                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.YearofGrant - a.YearofGrant);
                    // Get the top 10 centers from the sorted array or all centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));
                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    // Update the state with the selected center
                    setpatent(randomCenter);
                    const monthsDifference = calculateMonthsDifference(randomCenter.YearofGrant, new Date());
                    let ageText;
                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo3(ageText);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter.Name);
                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);


    useEffect(() => {
        fetch('http://localhost:3002/api/products')
            .then(response => response.json())
            .then(data => {
                // Filter out centers with valid Est_Year values
                const validCenters = data.filter(center => center.created_at);

                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.created_at - a.created_at);

                    // Get the top 10 centers from the sorted array or all centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));

                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    let ageText;
                    // Update the state with the selected center
                    setproduct(randomCenter);
                    const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo4(ageText);
                    // const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    // setMonthsAgo4(monthsDifference);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter.Name);
                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);
    const calculateMonthsDifference = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const monthsDifference = (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth());
        return monthsDifference;
      };
    return (
        <>
            <div className="home" style={{ height: "auto", fontFamily: "Prompt", margin:'7.6% 0 0' }} >
                <Chatbot />
                <Container style={{
                    maxWidth: "90%",
                    height: "38.8vw",
                    padding: "1.5vw 0 5vw 0",
                    backgroundImage: `linear-gradient(180deg, rgba(73, 103, 128, 0.85) 5.49%, rgba(37, 67, 90, 0) 100%), url(${landing})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>

                    <p className="text-center" style={{ fontFamily: 'Prompt', fontWeight: "600", fontSize: "3vw", color: "#FCFCFC", letterSpacing:'0.02em' }}>Technology Transfer Office</p>
                    <Grid container spacing={2} justify="space-between" style={{ padding: "6vw 2.5vw 0", width: "100%" }}>
                        <Grid item xs={3} sm={3} md={3} style={{ marginLeft: "6vw" }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Item {...items[0]} />
                            </Link>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3}>
                            <Link to="./Technologylicensing" style={{ textDecoration: 'none' }}>
                                <Item {...items[1]} />
                            </Link>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} style={{ marginRight: "5.5vw" }}>
                            <Link to="./Productize" style={{ textDecoration: 'none' }}>
                                <Item {...items[2]} />
                            </Link>
                        </Grid>
                    </Grid>
                </Container>

                <Container style={{ maxWidth: "80%", fontFamily: 'Prompt', paddingTop: "1em" }}>
                    <Grid container spacing={0} style={{ paddingBottom: "7vw" }}>
                        <Grid item xs={6} sm={6} md={6}>
                            <p style={{ color: "#2C2C2C", fontSize: "2.87vw", fontWeight: 600 }}>Research Labs</p>
                        </Grid>
                        <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353' }}></Grid>
                        <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "4em" }}>
                            <img
                                src={t1}
                                alt="Your image description"
                                style={{ width: '100%', height: 'auto' }}
                            />
                            {/* <ResponsiveImage src={t1} alt="icon" maxWidth={700} maxHeight={700}/> */}
                        </Grid>
                        <Grid item xs={1} sm={1} md={1}></Grid>
                            <Grid item xs={7} sm={7} md={7} style={{ paddingTop: "4em" }}>
                                <p style={{ color: "#434343", fontWeight: 600, fontSize: "1.77vw" }}>{centers.Research_Lab}</p>
                                <p style={{ color: "#989898", fontWeight: 500, fontSize: "1.32vw" }}>{monthsAgo1}</p>
                                <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.32vw", paddingBottom: "1em" }} >
                                {centers.Description}   
                                </p>
                                <Link to="./ResearchLabs" style={{ textDecoration: 'none',color: '#FFFFFF' }}>
                                <Button variant="contained" style={{ fontWeight: 500, textTransform: 'none', fontSize: "1.54vw", backgroundColor: '#09A5AF', color: '#FFFFFF', borderRadius: "2.7vw", padding: "0 2.2vw", height: '2.5em' }}>
                                    Explore all Labs
                                </Button>
                                </Link>
                             </Grid>
                        </Grid>
                    <Grid container spacing={0} style={{ paddingBottom: "7vw" }}>
                        <Grid item xs={6} sm={6} md={6}>
                            <p style={{ color: "#2C2C2C", fontSize: "2.87vw", fontWeight: 600 }}>Startups</p>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} container justify="flex-end">

                        </Grid>
                        <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353', margin: '0.27vw 0' }}></Grid>


                        <Grid item xs={7} sm={7} md={7} style={{ paddingTop: "4em" }}>
                            <p style={{ color: "#434343", fontWeight: 600, fontSize: "1.77vw" }}>
                                {startup.StartUp_Name}
                            </p>
                            <p style={{ color: "#989898", fontWeight: 500, fontSize: "1.32vw" }}>{monthsAgo2}</p>

                            <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.32vw", paddingBottom: "1em" }} >
                                {startup.Idea_Description}
                                </p>
                            <Link to="./Startups" style={{ textDecoration: 'none',color: '#FFFFFF' }}>
                            <Button variant="contained" style={{ fontWeight: 500, textTransform: 'none', fontSize: "1.54vw", backgroundColor: '#09A5AF', color: '#FFFFFF', borderRadius: "2.7vw", padding: "0 2.2vw", height: '2.5em' }}>
                                Explore all startups
                            </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1}></Grid>

                        <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "5em" }}>
                            <img
                                src={t2}
                                alt="Your image description"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} style={{ paddingBottom: "7vw" }}>
                        <Grid item xs={6} sm={6} md={6}>
                            <p style={{ color: "#2C2C2C", fontSize: "2.87vw", fontWeight: 600 }}>Patents</p>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} container justify="flex-end">

                        </Grid>
                        <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353', margin: '0.27vw 0' }}></Grid>

                        <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "4em" }}>
                            <img
                                src={t3}
                                alt="Your image description"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={1}></Grid>

                        <Grid item xs={7} sm={7} md={7} style={{ paddingTop: "4em" }}>
                            <p style={{ color: "#434343", fontWeight: 600, fontSize: "1.77vw", paddingBottom: "0em" }}>{patent.Title}</p>
                            <p style={{ color: "#989898", fontWeight: 500, fontSize: "1.32vw" }}>{monthsAgo3}</p>

                            <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.32vw", paddingBottom: "1em" }} >
                                {patent.Description}
                            </p>
                            <Link to="/patents" style={{ textDecoration: 'none',color: '#FFFFFF' }}>
                              <Button variant="contained" style={{ fontWeight: 500, textTransform: 'none', fontSize: "1.54vw", backgroundColor: '#09A5AF', color: '#FFFFFF', borderRadius: "2.7vw", padding: "0 2.2vw", height: '2.5em' }}>
                                Explore all patents
                              </Button>
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} style={{ paddingBottom: "7vw" }}>
                        <Grid item xs={6} sm={6} md={6}>
                            <p style={{ color: "#2C2C2C", fontSize: "2.87vw", fontWeight: 600 }}>Products</p>
                        </Grid>

                        <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353', margin: '0.27vw 0' }}></Grid>


                        <Grid item xs={7} sm={7} md={7} style={{ paddingTop: "4em" }}>
                            <p style={{ color: "#434343", fontWeight: 600, fontSize: "1.77vw", paddingBottom: "0em" }}>
                                {product.NameOfProduct}
                            </p>
                            <p style={{ color: "#989898", fontWeight: 500, fontSize: "1.32vw" }}>{monthsAgo4}</p>
                            <p style={{ color: "#434343", fontWeight: 400, fontSize: "1.32vw", paddingBottom: "1em" }} >
                                {product.Description}
                                </p>
                            <Link to="./ProductLab_Products" style={{ textDecoration: 'none',color: '#FFFFFF' }}>
                              <Button variant="contained" style={{ fontWeight: 500, textTransform: 'none', fontSize: "1.54vw", backgroundColor: '#09A5AF', color: '#FFFFFF', borderRadius: "2.7vw", padding: "0 2.2vw", height: '2.5em' }}>
                                Explore all products
                              </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1}></Grid>
                        <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "4em" }}>
                            <img
                                src={t4}
                                alt="Your image description"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>

                    </Grid>

                    <Grid container spacing={0} style={{ paddingBottom: "4vw" }}>
                        <Grid item xs={6} sm={6} md={6}>
                            <p style={{ color: "#2C2C2C", fontSize: "2.87vw", fontWeight: 600 }}>Quick Links</p>
                        </Grid>
                        <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353', margin: '0.21vw 0' }}></Grid>
                    </Grid>
                </Container>

                <Container style={{ maxWidth: "80%", fontFamily: 'Prompt', padding: "0 0 7em 0" }}>
                    <ImageSlider />
                </Container>

            </div >

        </>

    );
}
export default Home;