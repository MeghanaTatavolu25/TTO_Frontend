import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../styles/products.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import icon from '../Img/icon.png'
import Chatbot from "../chatbot/Chatbot"

const ResearchLab = () => {
  const { LabName, LabCode } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]); // Set initial value to null
  const [selectedSection, setSelectedSection] = useState('overview');
  const [showDescription, setShowDescription] = useState(true);
  const [labDescription, setLabDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:3002/api/technologies')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));

      fetch('http://localhost:3002/api/researchlabs')
      .then(response => response.json())
      .then(data => {
        const matchingLab = data.find(lab => lab.Research_Lab === LabName);
        if (matchingLab) {
          setLabDescription(matchingLab.Description);
        }
      })
      .catch(error => console.log(error));
  }, [LabName]);
  const getMediaURL = (product) => {
    if (product.ProductVideo?.key) {
      return `https://tto-asset.s3.ap-south-1.amazonaws.com/${product.ProductVideo.key}`;
    } else if (product.ProductImage?.key) {
      return `https://tto-asset.s3.ap-south-1.amazonaws.com/${product.ProductImage.key}`;
    } else {
      return icon; // Return the default icon if both video and image are not available
    }
  };
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedSection('overview'); // Set selectedSection to 'overview' when clicking on a product
    setShowDescription(false);
  };
  const handleDescriptionClick = () => {
    setSelectedProduct([]); // Set selectedProduct to null when clicking on the description
    setShowDescription(!showDescription);
  };
  const handleNavLinkClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <>
    <Chatbot />
      <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: "0", padding: "8vw 3vw 0" }}>
        <a href="/" style={{ textDecoration: 'none', color: '#9D9D9D' }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
          }}>
          <span>Home</span>
        </a>
        <span style={{ color: '#9D9D9D' }}> / </span>
        <a href="/ResearchLabs" style={{ textDecoration: 'none', color: '#9D9D9D' }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
          }}>
          <span>Technology Catalogue</span>
        </a>
        <span style={{ color: '#9D9D9D' }}> / </span>
        {selectedProduct && (
          <>
            <a href="" style={{ textDecoration: 'none', color: '#9D9D9D' }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1369CB';
                e.target.style.fontWeight = 600;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#9D9D9D';
                e.target.style.fontWeight = 500;
              }}>
              <span>{LabCode}</span>
            </a>
            {!showDescription && (
              <>
                <span style={{ color: '#9D9D9D' }}> / </span>
                <span style={{ color: '#1F669F', fontWeight: 500 }}>{selectedProduct.NameOfProduct}</span>
              </>
            )}
          </>
        )}
        <script>
          function log() {
            console.log("ss", products.NameOfProduct)
          }
        </script>
      </p>


        <Container style={{ maxWidth: "96%", fontFamily: 'Prompt', paddingTop: "1.2vw"}}>
        <div className="app">
        <div className="sidebar">
          <div className="sidebar-heading">{LabName}</div>
          <div
            className={`description-heading ${showDescription ? 'active' : ''}`}
            onClick={handleDescriptionClick}
            >
            Description
          </div>
          <div className="projects-heading"> Technologies : </div>
          <div className="line"></div>
          <div className="products-list">
            {products.filter(product => product.CentreName === LabCode).map(product => (
                <div key={product._id}>
                    <div
                        key={product._id}
                        className={`product ${selectedProduct === product ? 'active' : ''}`}
                        onClick={() => handleProductClick(product)}
                    >
                        <h3  className="underline-on-hover" style={{ width: '23vw', fontWeight: 300, fontSize: "1.2vw", lineHeight: "1.7vw", cursor: "pointer", margin: "0.2vw 0 1.1vw" }}>{product.NameOfProduct}</h3>
                    </div>
                  </div>
            ))}
          </div>
        </div>
            <div className="content">
            {showDescription && (
              <>
                <h2 style={{fontWeight: 500, fontSize: "1.4vw",lineHeight:"2vw", letterSpacing: "-0.02em",color: "#2C2C2C"}}>Description</h2>
                <p className="lab-description">{labDescription}</p>
              </>
            )}
              {!showDescription && selectedProduct && (
                <>
              <h2 style={{fontWeight: 500, fontSize: "1.4vw",lineHeight:"2vw", letterSpacing: "-0.02em",color: "#2C2C2C"}}>{selectedProduct.NameOfProduct}</h2>
                  <div className="video">
                  {selectedProduct.ProductVideo?.key ? (
                    <video controls style={{ width: "63vw", height: "15.4vw", borderRadius: "8px", margin: "0vw 0 0.3vw" }}>
                      <source src={getMediaURL(selectedProduct)} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={getMediaURL(selectedProduct)} alt="Product" style={{ width: "63vw", height: "15.4vw", borderRadius: "8px", margin: "0vw 0 0.3vw" }} />
                  )}
                  </div>
                  <div className="faculty-name">
                  Faculty Name: &nbsp;&nbsp;{selectedProduct.FacultyName}
                  </div>
                  <div className="keywords">
                  Keywords: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {selectedProduct.keywords}
                  </div>
                  <div className="nav-bar">
                  <div
                      className={`nav_link ${selectedSection === 'overview' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('overview')}
                  >
                      Overview
                  </div>
                  <div
                      className={`nav_link ${selectedSection === 'technology' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('technology')}
                      style={{marginLeft:"4.1vw"}}
                  >
                      Type of work
                  </div>
                  <div
                      className={`nav_link ${selectedSection === 'market-use-case' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('market-use-case')}
                      style={{marginLeft:"4.1vw"}}
                  >
                      State of work
                  </div>
                  <div
                      className={`nav_link ${selectedSection === 'current-traction' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('current-traction')}
                      style={{marginLeft:"4.1vw"}}
                  >
                      Potential Applications
                  </div>
                  <div
                      className={`nav_link ${selectedSection === 'linked-patent' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('linked-patent')}
                      style={{marginLeft:"4.1vw"}}
                  >
                      Related Publications
                  </div>
                  <div
                      className={`nav_link ${selectedSection === 'demo-link' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('demo-link')}
                      style={{marginLeft:"4.1vw"}}
                  >
                      Demo Link
                  </div>
                  </div>
                  <div className={`section ${selectedSection === 'overview' ? 'active' : ''}`} id="overview">
                    <p>{selectedProduct.Description}</p>
                  </div>
                  <div className={`section ${selectedSection === 'technology' ? 'active' : ''}`} id="technology">
                    <p>{selectedProduct.TypeOfWork}</p>
                  </div>
                  <div className={`section ${selectedSection === 'market-use-case' ? 'active' : ''}`} id="market-use-case">
                    <p>{selectedProduct.CurrentStateOfWork}</p>
                  </div>
                  <div className={`section ${selectedSection === 'current-traction' ? 'active' : ''}`} id="current-traction">
                    <p>{selectedProduct.PotentialApplication}</p>
                  </div>
                  <div className={`section ${selectedSection === 'linked-patent' ? 'active' : ''}`} id="linked-patent">
                    <p>{selectedProduct.RelatedPublication}</p>
                  </div>
                  <div className={`section ${selectedSection === 'demo-link' ? 'active' : ''}`} id="demo-link">
                    <p><a href={selectedProduct.DemoLink}>{selectedProduct.demoLink}</a></p>
                  </div>
                </>
              )}
            </div>
            </div>
        </Container>
    </>
  );
}

export default ResearchLab;
