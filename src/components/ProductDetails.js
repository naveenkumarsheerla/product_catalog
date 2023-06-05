
import React, { useEffect, useState } from "react";
import {  Card, Col, Row } from "react-bootstrap";
import {  useParams } from "react-router-dom";
import "../components/ProductDetails.css"

export const ProductDetails = () => {
    const [productInfo, setProductInfo] = useState([]);
    const { id, name } = useParams();
    const [mainImage, setMainImage] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        fetch('https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/get-product')
            .then(res => res.json())
            .then(result => {
                setProductInfo(result);
            })
            .catch(error => console.log(error));
    }, []);

    const data = productInfo.filter((item) => item.subCategoryName === name);
    console.log(data)
    const product = data.find((item) => item.id == id);
   

    const onImageClick = (e) => {
        setSelectedImage(e.target.src);
    };

    return (
        <>
           {product ? (
                
                <Row className="justify-content-center container-fluid"> 
                   <Card.Body >
                       <div className="mb-2" >
                           {/* <div className="row no-gutters"> */}
                           <Row xs={1} sm={1} md={2} lg={2} xl={2}>
                               {/* <div className="col-md-4" style={{ display: 'flex', flexDirection: 'row' }}> */}
                               <Col sm={5} md={4} lg={4} xl={4}>
                                   {/* <div className="row"> */}
                                   <Row xs={2} sm={2} md={2} lg={2} xl={2}>
                                   <Col xs={3} sm={3} md={3} lg={3} xl={3} className="smallImageDiv" style={{ display: 'flex', flexDirection: 'column' }} >
                                       {product.image.map((item, index) => (
                                           <div className="smallImages" key={index} >
                                               <img
                                                   src={item}
                                                   onClick={onImageClick}
                                                   alt=""
                                                   className={` ${selectedImage === item ? "selected" : ""}`}
                                                   // style={{ border: "1px solid #832729", width: "5vw", marginTop: '0.2rem', borderRadius: '5px' }}
                                                   onMouseEnter={() => setSelectedImage(item)}
                                               />
                                           </div>
                                       ))}

                                   </Col>
                                   <Col xs={9} sm={9} md={9} lg={9} xl={9}  className="mainImage">
                                       {selectedImage && <img src={selectedImage} alt="Selected"  />}
                                       {!selectedImage && <img src={product.image[0]} alt="Default"  />}
                                   </Col>
                                   </Row> {/* </div> */}
                                   </Col> {/* </div> */}
                               {/* <div className="col-md-8"> */}
                               <Col sm={7} md={8} lg={8} xl={8}>
                                   <div className="card-body m-2 content">
                                       <Row>
                                           <Card.Title style={{ marginBottom: "1rem", fontSize: "1rem" }}>{product.name}</Card.Title>
                                       </Row>
                                       <Row>
                                           <Card.Text>
                                               <small className="text-muted">
                                                   {product.description}
                                               </small>
                                           </Card.Text>
                                       </Row>
                                       <Row style={{ marginTop: '2rem' }}>
                                           <Card.Title style={{fontSize:"1rem"}}>Price - &#x20B9;&nbsp;<b>{product.price}</b></Card.Title>
                                       </Row>
                                       <Row style={{ marginTop: '2rem' }}>
                                           <Card.Title style={{ fontSize: "0.8rem" }}>Weight-<b>{product.weight} </b>grms</Card.Title>
                                       </Row>
                                       <div style={{ marginTop: "1rem" }}>
                                           <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                           <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                           <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                           <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                           <span className="fa fa-star "></span>
                                       </div>
                                       <button className="buynow-btn" style={{ marginTop: "0.5rem", backgroundColor: "#832729", color: "white", fontWeight: "500", fontSize: "0.8rem", border: "1px #832729 solid"}}>BUY NOW</button>
                                       <hr />
                                       <div style={{ fontSize: "0.8rem", paddingBottom: "0.5rem", marginRight: "1rem" }}>Still Confused What to Buy?</div>
                                       <p style={{ fontSize: "0.7rem" }}>Get on a live video call with our design experts, or visit your nearest Tanishq store to get a closer look and know more about the product.</p>
                                   </div>
                                   </Col> {/* </div> */}
                               </Row>{/* </div> */}
                        </div> 
                    </Card.Body>
               </Row> 
               
           ) : (
               <div>Loading ...</div>
           )}

        </>
    );
};

