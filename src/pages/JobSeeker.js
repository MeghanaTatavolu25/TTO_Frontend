import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/contactUs.css"
import { Grid, Button, Divider } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import upArrow from  '../Img/uploadArrow.png'
import axios from 'axios';
import Chatbot from '../chatbot/Chatbot';

const JobSeeker = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [skills, setSkills] = useState([]);
  const [resume, setResume] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', resume); // Append the resume file to the form data
  
      const newJobSeeker = {
        Name: name,
        Position: position,
        Email_id: email,
        Phone_Number: phoneNumber, // Correct the field name
        Skills: skills,
        UploadResume: {
          file: resume ? resume.name : '', // Set the file field with the resume file name
          key: '',
          bucket: '',
          mimeType: resume ? resume.type : '', // Set the mimeType field with the resume file type
        },
      };
  
      // Append the rest of the fields to the form data
      for (const [key, value] of Object.entries(newJobSeeker)) {
        if (key !== 'UploadResume') {
          formData.append(key, value);
        }
      }
  
      await axios.post('http://localhost:3002/admin/api/resources/Job_Seeker/actions/new', formData)
        .then(function (res) {
          console.log('success');
        });
    } catch (e) {
      alert(e);
    }
  }

  return (
    <>
    <Chatbot />
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
        <span style={{ color: '#1F669F', fontWeight: 500 }}> Job Seeker </span>
    </p>
    <Container style={{ maxWidth: "76%", fontFamily: 'Prompt', paddingTop: "1.2vw", letterSpacing:"0em"}}>
      <Grid container spacing={0} >
        <Grid item xs={6} sm={6} md={6}>
            <p style={{color: "#343434", fontSize: "2.4vw", fontWeight: 400, margin: "0", letterSpacing:"-0.04em" }}>Contact us</p>
            
        </Grid>
        <div className="form-container">
          <div style={{ background: "#343434", height:"0.15vw"}}></div>
          {/* changed */}
          <form onSubmit={(e)=>handleSubmit(e)}>    
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="name">
                  Name<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <input
                className='input'
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="position">
                  Position<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <input
                className='input'
                  type="text"
                  id="position"
                  placeholder="Enter position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  autoComplete="off"
                  required
                  
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="email">
                  Email Id<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <input
                className='input'
                  type="email"
                  id="email"
                  placeholder="Enter email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                  
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="phoneNumber">
                  Phone Number<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <input
                className='input'
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  autoComplete="off"
                  required
                  
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="skills">
                  Skills<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <input
                className='input'
                  type="text"
                  id="skills"
                  placeholder="Enter your skills"
                  value={skills.join(",")}
                  onChange={(e) => setSkills(e.target.value.split(","))}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="resume">
                  Upload Resume<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <label htmlFor="resume">
                  <span className="custom-upload-btn">
                    {resume ? (
                      <span className="file-name">{resume.name}</span>
                    ) : (
                      <>
                        <img src={upArrow} alt="Upload" className="upload-icon" />
                        <span className="upload">Upload</span>
                      </>
                    )}
                  </span>
                </label>
                <input
                  type="file"
                  id="resume"
                  className="custom-file-input"
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  autoComplete="off"
                  name="file" // Add the name attribute
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

export default JobSeeker;