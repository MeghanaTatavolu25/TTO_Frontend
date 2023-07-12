import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Registration.css"
import { Grid, Button, Divider } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import upArrow from  '../Img/uploadArrow.png'
import axios from 'axios';

const IndustryRegistration = () => {
  const [companyName, setCompanyName] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [query, setQuery] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
      const newIndustry ={
        Name_of_comapny:companyName,     
        Contact_person_Name:contactPersonName,  
        Position:position,            
        Email_Id:email,           
        Contact:contact,
        Query:query   

      };
      axios.post('http://localhost:3002/admin/api/resources/Industry/actions/new', newIndustry)
      .then(function (res) {
          window.location = "/IndustryRegistration"
      });
    }
    catch(e){
      alert(e);
    }
  }

  return (
    <>
    <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: "0", padding:"8vw 3vw 0" }}>
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
        <span style={{ color: '#1F669F', fontWeight: 500 }}> Industry Registration</span>
    </p>
    <Container style={{ maxWidth: "76%", fontFamily: 'Prompt', paddingTop: "1.2vw", letterSpacing:"0em"}}>
        <Grid container spacing={0} >
            <Grid item xs={6} sm={6} md={6}>
                <p style={{color: "#343434", fontSize: "2.4vw", fontWeight: 400, margin: "0", letterSpacing:"-0.04em" }}>Industry Registration</p>
            </Grid>
            <div className="form-container">
                <div style={{ background: "#343434", height:"0.15vw"}}></div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="companyName">
                            Name of the company<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="companyName"
                            placeholder="Enter company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="contactPersonName">
                            Contact person name<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="contactPersonName"
                            placeholder="Enter contact person name"
                            value={contactPersonName}
                            onChange={(e) => setContactPersonName(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="position">
                            Position<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="position"
                            placeholder="Enter position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
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
                            <label htmlFor="query">
                            Query<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="query"
                            placeholder="Type here"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{height:"8vw"}}
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

export default IndustryRegistration;
