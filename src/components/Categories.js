
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import "../components/Categories.css"

export const Categories = () => {
  const [data, setData] = useState([]);
  const [cmtrId, setCmtrId] = useState('');

  useEffect(() => {
    const storedCmtrId = localStorage.getItem('cmtrId');
    if (storedCmtrId) {
      setCmtrId(storedCmtrId);
      fetchProductData(storedCmtrId);
    }
  }, []);

  const fetchProductData = (cmtrId) => {
    fetch(`https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/categories/${cmtrId}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        console.log(data)
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    localStorage.setItem('cmtrId', cmtrId);
  }, [cmtrId]);

  return (
    <>
  
      <div>
        <Row xs={2} sm={2} md={3} xl={4} lg={4} className="g-3 m-2 " >
          {data.map((categories, index) => (
            <Col key={index} >
              <Link to={`${categories.name}`} style={{ textDecoration: 'none', color: '#832729' }}>
                <Card className="card" >
                  <Card.Img variant="top" src={categories.image} alt="" className="image" />
                  <Card.Body >
                    <center>
                      <Card.Title><small style={{ fontSize: "1rem" }}>{categories.name}</small></Card.Title>
                    </center>
                  </Card.Body>
                  <center><button className="btn-viewmore">VIEW&nbsp;MORE</button></center>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}
