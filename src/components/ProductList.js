
import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
// import Image1 from "../../public/logo192.png";
import { Link, useParams } from "react-router-dom";
// import "../Components/ProductList.css"
import "../components/SearchResult.css"

export const ProductList = () => {
    const [productInfo, setProductInfo] = useState([])
    const { name } = useParams()

    useEffect(() => {
        fetch('https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/get-product')
            .then(res => res.json())
            .then(result => {
                setProductInfo(result)
                console.log(result)
                
            })
            .catch(error => console.log(error))
    }, [])


    const data = productInfo.filter((item) => item.subCategoryName === name)

    // console.log("filterdata"+data)

    return (
        <>
             {
                data ? (
                    <Row xs={1} sm={1} md={1} lg={1} xl={1} className="g-3 m-2  container-fluid">
                        {data.map((item) => (
                            <Col key={item.id} >
                                <Link to={`${item.id}`} style={{ textDecoration: 'none', color: '#202124' }}>

                                    <div className="card mb-3  " >
                                        <div className="card-content">
                                            <div className="card-content-div" >
                                                <img src={item.image[0]} alt="" className="card-img" />
                                            </div>
                                            <div className="col-md-10">
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ fontSize: "15px" }}>{item.name}</h5>
                                                    <p className="card-text"><small className="text-muted">{item.description}</small></p>
                                                    <p className="card-text"><small>Price -<b> &#x20B9;{item.price}</b></small></p>
                                                    <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                                    <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                                    <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                                    <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                                    <span className="fa fa-star "></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Link>

                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div>Loading ...</div>
                )
            }

        </>
    )
}