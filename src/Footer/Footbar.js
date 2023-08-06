import React from "react";
import call_img from './call.png'
import mail_img from './mail.png'
import { Grid, Paper, Button, Divider } from '@material-ui/core';
const Footbar = () => {
  return (

    <div style={{ paddingTop: "7vw" }}>
      <Grid container spacing={0} style={{ paddingBottom: "1vw", background: 'linear-gradient(136deg, #21328F 3.00%, #3084BE 64.43%, #7D4ABC 100%)', fontFamily: "Prompt" ,letterSpacing: '-0.01'}}>


        <Grid item xs={1} sm={1} md={1}></Grid>

        <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "5.5vw", paddingLeft:'4vw',paddingBottom:'2vw' }}>
          <div style={{ paddingBottom: "2vw" }}>

            <img src={call_img} alt="icon" style={{width:'3vw', height:'3vw'}} />

            <span style={{ paddingLeft: "1.1vw", fontSize: "1.0417vw", color: "#FFFFFF" }}> 91-0990897689</span>

          </div>
          <div style={{ paddingBottom: "1vw" }}>
            <img src={mail_img} alt="icon" style={{width:'3vw', height:'3vw'}} />

            <span style={{ paddingLeft: "1.1vw", fontSize: "1.0417vw", color: "#FFFFFF" }}> www.tto.iiit.ac.in</span>

          </div>

        </Grid>
        <Grid item xs={6} sm={6} md={6} style={{ paddingTop: "4.5vw" }}>
          <p style={{ color: "#FFFFFF", fontWeight: 500, fontSize: "2vw", paddingBottom: "0vw" }}>About the company</p>
          <p style={{ color: "#FFFFFF", fontWeight: 300, fontSize: "1.0417vw" }} >The Product Labs will identify potential products based on market and strategy analysis, identify suitable research as available and then build the prototypes of these products along with associated businesses and market plans. The products will then be either licensed to larger enterprises or hover off as startups leveraging Entrepreneur in Residence (EIR)s. </p>

        </Grid>
      </Grid>
    </div>
  );
}

export default Footbar;