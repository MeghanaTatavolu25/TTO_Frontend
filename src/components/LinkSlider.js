import React, { useState } from "react";
import "../styles/LinkSlider.css";
import { Grid, Paper, Button, Divider } from '@material-ui/core';
import t1 from '../Img/t1.png'
import t2 from '../Img/t2.png'
import t3 from '../Img/t3.png'
import t4 from '../Img/t4.png'
import t5 from '../Img/Icon1.png'
import t6 from '../Img/icon2.png'

const links = [
    { id: 1, title: "Enterprenuer", content: "Lorem ipsum dolor sit amet, consectetur ", image: t4 },
    { id: 2, title: "Industry", content: "Lorem ipsum dolor sit amet, consectetur ", image: t2 },
    { id: 3, title: "Job Seeker", content: "Lorem ipsum dolor sit amet, consectetur ", image: t3 },
    { id: 4, title: "Lorem ipsum dolor", content: "Lorem ipsum dolor sit amet, consectetur ", image: t4 },
    { id: 5, title: "Lorem ipsum dolor", content: "Lorem ipsum dolor sit amet, consectetur ", image: t2 },
    { id: 6, title: "Lorem ipsum dolor", content: "Lorem ipsum dolor sit amet, consectetur ", image: t3 },

];

export default function ImageSlider() {
    const [startIndex, setStartIndex] = useState(0);

    const slideLeft = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const slideRight = () => {
        setStartIndex((prevIndex) =>
            Math.min(prevIndex + 1, links.length - 3)
        );
    };

    return (
        <div className="link-slider">
            <div className="link-slider__buttons">
                <div className="link-slider__wrapper">

                    {/* <button onClick={slideLeft} disabled={startIndex === 0} style={{ color: startIndex === 0 ? "#808080" : "#02858D", fontSize: "5em" }}>
                        &#8249;
                    </button> */}


                    <div className="link-slider__container">
                        {links.slice(startIndex, startIndex + 3).map((link) => (
                            <Paper style={{ width: "25vw", height: "auto", boxShadow: "0px 4px 10px 5px rgba(209, 209, 209, 0.63)" ,margin:"0 0.8vw" }}  onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15)"; // Scale up on hover
                // e.currentTarget.style.boxShadow =
                //     "0px 0px 50px -25px rgba(0, 0, 0, 0.7), 0px 0px 30px -15px rgba(0, 0, 0, 0.3)"; // Add dark shadow when expanded
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Scale back to the original size when not hovering
                // e.currentTarget.style.boxShadow =
                //     "0px 0px 50px -25px rgba(0, 0, 0, 0.5)"; // Restore original shadow
            }}>
                                <div style={{ display: "flex", flexDirection: "row", margin:"0.8vw" }}>
                                    <div style={{ flex: 1, margin: "0.4vw 0.4vw 0 0" }}>
                                        <img src={link.image} alt="lorem" style={{ width: "100%" }} />
                                        
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <p style={{ fontSize: "1.6vw", color: "#434343", fontWeight: 600 }}>{link.title} </p>
                                        <p style={{ marginTop: "0.4vw", fontSize: "1.1vw", fontWeight: 400, color: "#434343" }}>{link.content}</p>
                                    </div>
                                </div>
                            </Paper>

                        ))}
                    </div>

                    {/* <button onClick={slideRight} disabled={startIndex === links.length - 3} style={{ color: startIndex === links.length - 3 ? "#808080" : "#02858D", fontSize: "5em" }}>
                        &#8250;
                    </button> */}


                </div>
            </div>

        </div>
    );
}
