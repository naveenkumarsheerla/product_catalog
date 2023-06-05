import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const Subcategory = () => {
  const [productList, setProductList] = useState([]);
  const { category } = useParams();
 
  useEffect(() => {
      // fetch('https://dummyjson.com/products')
      fetch("https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/get-subCategory")
        .then((res) => res.json())
        .then((result) => {
          setProductList(result); 
          console.log(result)    
        
        })
        .catch((error) => console.log(error));
    
  }, []);

 
  const lists = productList.filter((item) => item.categoryName === category);
  console.log(lists)

  return (
    <>
      <div>
        <Row className="container-fluid g-3 m-2" xs={2} sm={2} md={3} lg={4} xl={4}>
          {lists.map((item, index) => (
            <Col key={index}>
              <Link to={`/${item.categoryName}/${item.name}`} style={{ textDecoration: "none", color: "#832729" }}>
                <Card className=" h-100 card">
                  <Card.Img className="image" variant="top" src={item.image} alt=""  />
                  <Card.Body className="cardbody">
                    <center>
                      <Card.Title className="categoriesname">{item.name}</Card.Title>
                   
                    </center>
                  </Card.Body>
                  <center>   <button className="btn-viewmore">VIEW&nbsp;MORE</button></center>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};