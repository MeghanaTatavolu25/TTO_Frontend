import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Registration.css"
import { Grid, Button, Divider } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import upArrow from  '../Img/uploadArrow.png'
import axios from 'axios';

const EnterpreneurRegistration = () => {
  const [startupName, setStartupName] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [founderName, setFounderName] = useState('');
  const [coFounderName, setCoFounderName] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState('');
  const [contact, setContact] = useState('');
  const [helpNeed, setHelpNeed] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
      const newEntrepreneur ={
        StartUp_Name: startupName,
        Idea_Description:ideaDescription, 
        Founder_Name:founderName,   
        Co_Founder_Name:coFounderName,
        Email_Id:email,        
        Stage:stage,           
        Contact:contact       

      };
      axios.post('http://localhost:3002/admin/api/resources/Entrepreneur/actions/new', newEntrepreneur)
      .then(function (res) {
          window.location = "/EntrepreneurRegistration"
      });
    }
    catch(e){
      alert(e);
    }
  }

  return (
    <>
    <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: "0", padding:" 10vw 3vw 0" }}>
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
        <span style={{ color: '#1F669F', fontWeight: 500 }}> Entrepreneur Registration</span>
    </p>
    <Container style={{ maxWidth: "76%", fontFamily: 'Prompt', paddingTop: "1.2vw", letterSpacing:"0em"}}>
        <Grid container spacing={0} >
            <Grid item xs={6} sm={6} md={6}>
                <p style={{color: "#343434", fontSize: "2.4vw", fontWeight: 400, margin: "0", letterSpacing:"-0.04em" }}>Entrepreneur Registration</p>
            </Grid>
            <div className="form-container">
                <div style={{ background: "#343434", height:"0.15vw"}}></div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="startupName">
                            Startup name<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="startupName"
                            placeholder="Enter startup name"
                            value={startupName}
                            onChange={(e) => setStartupName(e.target.value)}
                            required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="ideaDescription">
                            Idea description<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="ideaDescription"
                            placeholder="Type here"
                            value={ideaDescription}
                            onChange={(e) => setIdeaDescription(e.target.value)}
                            style={{height:"9vw"}}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="founderName">
                            Founder name<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="founderName"
                            placeholder="Enter founder name"
                            value={founderName}
                            onChange={(e) => setFounderName(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="coFounderName">
                            Co - founder name<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="coFounderName"
                            placeholder="Enter name"
                            value={coFounderName}
                            onChange={(e) => setCoFounderName(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="email">
                            Email Id<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="email"
                            id="email"
                            placeholder="Enter email id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="stage">
                            Stage<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="stage"
                            placeholder="Enter stage"
                            value={stage}
                            onChange={(e) => setStage(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="contact">
                            Contact<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="tel"
                            id="contact"
                            placeholder="Enter your contact number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="helpNeed">
                            What help you need <br></br> from Product Lab/TTO<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="helpNeed"
                            placeholder="Type here"
                            value={helpNeed}
                            onChange={(e) => setHelpNeed(e.target.value)}
                            style={{height:"5.5vw"}}
                            required
                            />
                        </div>
                    </div>
                    <div className="confrim">
              <input
                  className='checkbox'
                  type="checkbox"
                  checked={confirmation}
                  onChange={(e) => setConfirmation(e.target.checked)}
              />
              <p>I hereby confirm that all the above-mentioned information is true to the best of my knowledge. If found incorrect at any stage in the process, my candidature stands cancelled.</p>
            </div>

            <div className="register">
              <button className='button' type="submit" disabled={!confirmation} style={{ cursor: confirmation ? 'pointer' : 'not-allowed' }}>
              Register
              </button>
            </div>     
          </form>
        </div>
      </Grid>
    </Container>
    </>
  );
};

export default EnterpreneurRegistration;
