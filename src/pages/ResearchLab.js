import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../styles/products.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

const ResearchLab = () => {
  const { LabName, LabCode } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]); // Set initial value to null
  const [selectedSection, setSelectedSection] = useState('overview');

  useEffect(() => {
    fetch('http://localhost:3002/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    // Find the first product that matches the LabCode
    const defaultProduct = products.find(product => product.CentreName === LabCode);
    if (defaultProduct) {
      setSelectedProduct(defaultProduct);
    }
  }, [products, LabCode]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleNavLinkClick = (section) => {
    setSelectedSection(section);
  };


  // Filter the products based on the LabCode
  // const filteredProducts = products.filter(product => product.CenterName === LabCode);

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
                 <a  href="/ResearchLabs" 
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
                <span> Research Labs </span>/
                </a>
                <a  href="#" 
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
                <span> {LabCode} </span>/
                </a>
                <span style={{ color: '#1F669F', fontWeight: 500 }}> {selectedProduct.NameOfProduct}  </span>
                <script>
                  function log() {
                    console.log("ss",products.NameOfProduct)
                  }
                  </script>
            </p>
            <Container style={{ maxWidth: "96%", fontFamily: 'Prompt', paddingTop: "1.2vw"}}>
            <div className="app">
            <div className="sidebar">
              <div className="sidebar-heading">{LabName}</div>
              <div className="line" style={{ background: "#535353", height: "0.1vw", width: "25vw", textAlign: "left", margin: "1.2vw 0 1.2vw" }}></div>
              <div className="product-list">
                {products.filter(product => product.CentreName === LabCode).map(product => (
                  <div key={product._id}>
                    <div
                      key={product._id}
                      className={`product ${selectedProduct === product ? 'active' : ''}`}
                      onClick={() => handleProductClick(product)}
                    >
                      <h3  className="underline-on-hover" style={{ width: '23vw', fontWeight: 300, fontSize: "1.2vw", lineHeight: "1.7vw", cursor: "pointer", margin: "1.1vw 0 1.1vw" }}>{product.NameOfProduct}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
                <div className="content">
                {selectedProduct && (
                    <>
                  <h2 style={{fontWeight: 500, fontSize: "1.4vw",lineHeight:"2vw", letterSpacing: "-0.02em",color: "#2C2C2C"}}>{selectedProduct.NameOfProduct}</h2>
                  <div className="video">
                      <video controls style={{width:"63vw", height:"15.4vw", borderRadius: "8px",margin:"0vw 0 0.3vw"}}>
                          <source src={selectedProduct.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                      </video>
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
                      <h3>Summary</h3>
                      <p>{selectedProduct.Description}</p>
                      </div>
                      <div className={`section ${selectedSection === 'technology' ? 'active' : ''}`} id="technology">
                      <h3>Type of work</h3>
                      <p>{selectedProduct.TypeOfWork}</p>
                      </div>
                      <div className={`section ${selectedSection === 'market-use-case' ? 'active' : ''}`} id="market-use-case">
                      <h3>State of work</h3>
                      <p>{selectedProduct.CurrentStateOfWork}</p>
                      </div>
                      <div className={`section ${selectedSection === 'current-traction' ? 'active' : ''}`} id="current-traction">
                      <h3>Potential Application</h3>
                      <p>{selectedProduct.PotentialApplication}</p>
                      </div>
                      <div className={`section ${selectedSection === 'linked-patent' ? 'active' : ''}`} id="linked-patent">
                      <h3>Related Publications</h3>
                      <p>{selectedProduct.RelatedPublication}</p>
                      </div>
                      <div className={`section ${selectedSection === 'demo-link' ? 'active' : ''}`} id="demo-link">
                      <h3>Demo Link</h3>
                      <p>
                          <a href={selectedProduct.DemoLink}>{selectedProduct.demoLink}</a>
                      </p>
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
