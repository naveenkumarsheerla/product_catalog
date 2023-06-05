import React, { useEffect, useState } from "react";
import {  Card, Row } from "react-bootstrap";
import {  useParams } from "react-router-dom";

export const SearchProductDetails = () => {
    const [productInfo, setProductInfo] = useState([]);
    const { id} = useParams();
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        fetch('https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/get-product')
            .then(res => res.json())
            .then(result => {
                setProductInfo(result);
            })
            .catch(error => console.log(error));
    }, []);

   
    const product = productInfo.find((item) => item.id == id);

    const onImageClick = (e) => {
        setSelectedImage(e.target.src);
    };

    return (
        <>
            {product ? (
                <Row className="justify-content-center container-fluid">
                    <Card.Body style={{ marginTop: '2rem', height: '20rem', width: '80vw' }}>
                        <div className="mb-2" style={{ maxWidth: '540' }}>
                            <div className="row no-gutters">
                                <div className="col-md-4" style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {product.image.map((item, index) => (
                                            <span key={index}>
                                                <img
                                                    src={item}
                                                    onClick={onImageClick}
                                                    alt=""
                                                    className={`mx-2 ${selectedImage === item ? "selected" : ""}`}
                                                    style={{ border: "1px solid #832729", width: "4vw", marginTop: '0.2rem', borderRadius: '5px' }}
                                                    onMouseEnter={() => setSelectedImage(item)}
                                                />
                                            </span>
                                        ))}

                                    </div>
                                    <div>
                                        {selectedImage && <img src={selectedImage} alt="Selected" height={'480rem'} width={'500rem'} />}
                                        {!selectedImage && <img src={product.image[0]} alt="Default" height={'480rem'} width={'500rem'} />}
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body m-2">
                                        <Row>
                                            <Card.Title style={{ marginBottom: "1rem", fontSize: "17px" }}>{product.name}</Card.Title>
                                        </Row>
                                        <Row>
                                            <Card.Text>
                                                <small className="text-muted">
                                                    {product.description}
                                                </small>
                                            </Card.Text>
                                        </Row>
                                        <Row style={{ marginTop: '2rem' }}>
                                            <Card.Title>Price - &#x20B9;<b>{product.price}</b></Card.Title>
                                        </Row>
                                        <Row style={{ marginTop: '2rem' }}>
                                            <Card.Title style={{ fontSize: "13px" }}>Weight-<b>{product.weight}</b></Card.Title>
                                        </Row>
                                        <div style={{ marginTop: "1rem" }}>
                                            <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                            <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                            <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                            <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                            <span className="fa fa-star "></span>
                                        </div>
                                        <button style={{ marginTop: "0.5rem", backgroundColor: "#832729", color: "white", fontWeight: "500", fontSize: "13px", border: "1px #832729 solid", height: "2rem", width: "23.5rem" }}>BUY NOW</button>
                                        <hr />
                                        <div style={{ fontSize: "14px", paddingBottom: "0.5rem", marginRight: "1rem" }}>Still Confused What to Buy?</div>
                                        <p style={{ fontSize: "12px" }}>Get on a live video call with our design experts, or visit your nearest Tanishq store to get a closer look and know more about the product.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Row>
            ) : (
                <div>Loading ...</div>
            )}
        </>
    );
};
