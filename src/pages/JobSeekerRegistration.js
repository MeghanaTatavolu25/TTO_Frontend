import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Registration.css"
import { Grid, Button, Divider } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import upArrow from  '../Img/uploadArrow.png'
import axios from 'axios';

const JobSeekerRegistration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState(new Date());
  const [contact, setContact] = useState('');
  const [skills, setSkills] = useState([]);
  const [resume, setResume] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
      // window.location.reload(false);
      const formData = new FormData();
      formData.append('resume', resume);
      const newJobSeeker ={
        First_Name: firstName,
        Last_Name: lastName,
        Gender: gender,
        Position: position,
        Email_id: email,
        Date_of_Birth: dob,
        Contact: contact,
        Skills: skills,
        Upload_Resume: resume.name

      };
      formData.append('jobSeekerData', JSON.stringify(newJobSeeker));
      axios.post('http://localhost:3002/admin/api/resources/Job_Seeker/actions/new', newJobSeeker)
      .then(function (res) {
          window.location = "/JobSeekerRegistration"
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
        <span style={{ color: '#1F669F', fontWeight: 500 }}> Job Seeker Registration</span>
    </p>
    <Container style={{ maxWidth: "76%", fontFamily: 'Prompt', paddingTop: "1.2vw", letterSpacing:"0em"}}>
      <Grid container spacing={0} >
        <Grid item xs={6} sm={6} md={6}>
            <p style={{color: "#343434", fontSize: "2.4vw", fontWeight: 400, margin: "0", letterSpacing:"-0.04em" }}>Job Seeker Registration</p>
            
        </Grid>
        <div className="form-container">
          <div style={{ background: "#343434", height:"0.15vw"}}></div>
          {/* changed */}
          <form onSubmit={(e)=>handleSubmit(e)}>    
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="firstName">
                  First Name<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <input
                className='input'
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="off"
                  required
                  
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="lastName">
                  Last Name<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <input
                className='input'
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="off"
                  required
                  
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="gender">
                  Gender<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  autoComplete="off"
                  required
                  className={gender ? "selected" : "placeholder"}
                  >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
                <label htmlFor="dob">
                  Date of Birth<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <input
                  type="date"
                  id="dob"
                  placeholder="Enter date of birth"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  autoComplete="off"
                  required
                  className={dob ? "selected-date" : "placeholder"}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="contact">
                  Contact<span className='required' style={{ color: "#F83333" }}>*</span>
                </label>
                <input
                className='input'
                  type="tel"
                  id="contact"
                  placeholder="Enter your contact number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
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
                      <img src={upArrow} alt="Upload" className="upload-icon" />
                      <span className="upload">Upload</span>
                    </span>
                  </label>
                  <input
                    type="file"
                    id="resume"
                    className="custom-file-input"
                    accept=".pdf,.ppt,.pptx,.doc,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                    autoComplete="off"
                    
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

export default JobSeekerRegistration;