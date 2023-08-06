import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Pagination.css"
import Container from 'react-bootstrap/Container'
import { Button, Row, Col } from 'react-bootstrap';
import icon from '../Img/icon.png'
import Chatbot from '../chatbot/Chatbot';

const ProductLab_Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("newest");
  const itemsPerPage = 6;
  const filteredProducts = products.filter(product => product.CentreName === 'Product Lab');
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:3002/api/productlab')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const getProductImageURL = (product) => {
    if (product.ProductImage && product.ProductImage.key) {
      const baseS3URL = 'https://tto-asset.s3.ap-south-1.amazonaws.com/'; // Replace with your S3 base URL
      const imageURL = `${baseS3URL}${product.ProductImage.key}`;
      return imageURL;
    }
    return icon; // Return default icon if no image available
  };


  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  const getPageItems = () => {
    const sortedItems = filteredProducts.slice();     switch (sortOption) {
      case "newest":
        sortedItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        sortedItems.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;      
      case "az":
        sortedItems.sort((a, b) => a.NameOfProduct.localeCompare(b.NameOfCompany));
        break;
      case "za":
        sortedItems.sort((a, b) => b.NameOfProduct.localeCompare(a.NameOfCompany));
        break;
      default:
        break;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedItems.slice(startIndex, endIndex);
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
          }}
        >
          <span>Home </span>/
        </a>
        <span style={{ color: '#1F669F', fontWeight: 500 }}> All Products
        </span>
      </p>
      <Container style={{ maxWidth: "78%", fontFamily: 'Prompt', padding: "1.7vw 0 0", letterSpacing: "0em" }}>
        <div style={{ display: "flex" }}>
          <div style={{ color: "#343434", fontSize: "2.7041vw", fontWeight: 600, margin: "0", letterSpacing: "-0.04em", width: "77%" }}>All Products</div>
          <div style={{ fontSize: "1.6vw", fontWeight: 300, margin: "0.7vw 0 0", letterSpacing: "-0.04em", width: "23%" }}>
            <label htmlFor="sort-select" style={{ color: "#343434", fontSize: "1.4vw" }}>Sort By :&nbsp;</label>
            <select id="sort-select" value={sortOption} onChange={handleSortChange} style={{ color: "#1369CB", border: "none", outline: 0 }}>
              <option >None</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>
        <div style={{ background: "#343434", height: "0.2vw" }}></div>
      </Container>
      <Container style={{ maxWidth: "82%", marginBottom: '1vw' }}>
        <Row>
          {getPageItems().map(product => (
            <Col key={product._id} lg={4}>
              <a href={`/Products/${product.CentreName}/${encodeURIComponent(product.NameOfProduct)}`} style={{ textDecoration: 'none' }}>
                <div style={{ letterSpacing: "-0.04em", lineHeight: "1.5vw", fontFamily: 'Prompt', margin: '1.1vw 1.5vw 2.2vw' }}>
                  <div className="content-container" style={{ display: "flex", alignItems: "flex-start", margin: '0', width: '100%' }}>
                    <div style={{ width: '20%', height: '4vw' }}>
                    <img src={getProductImageURL(product)} alt="/" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <h2 className="underline-on-hover" style={{ width: '80%', color: "#353535", fontSize: "1.4vw", fontWeight: 600, margin: '1.1vw 0 0.5vw', display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{product.NameOfProduct}</h2>
                  </div>
                  <p style={{ lineHeight: '1.2vw', marginLeft: '1.1vw', color: "#757575", fontSize: "1.0417vw", fontWeight: 400, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{product.Description}</p>
                  <div style={{ marginTop: '20px', marginLeft: '1.1vw', color: "#A7A6A6", fontSize: "0.94vw", fontWeight: 300, lineHeight: '0.6vw' }}>
                    <p>Professor - {product.Faculty_Name}</p>
                    <p>Center - {product.CentreName}</p>
                  </div>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>

      {/* pagination  */}
      {totalPages > 1 && (
        <div className='pagination' style={{ fontFamily: "Inter" }}>
          {currentPage > 1 && (
            <div className="pagination-arrow" onClick={() => handlePageClick(currentPage - 1)}>
              &lt;
            </div>
          )}
          <div className="pagination-box">
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
                    className={`pagination-button ${pageNumber === currentPage ? "current" : ""}`}
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
            <div className="pagination-arrow" onClick={() => handlePageClick(currentPage + 1)}>
              &gt;
            </div>
          )}
        </div>
      )}

    </>
  );
}

export default ProductLab_Products;
