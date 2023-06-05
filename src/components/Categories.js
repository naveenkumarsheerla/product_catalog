// import React, { useEffect, useState } from "react";
// import { Card, Col, Row } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import Button from '@mui/material/Button';
// import "../Components/Categories.css"

// export const Categories = () => {

//   const [data, setData] = useState([]);
//   const [cmtrId, setCmtrId] = useState('');

//   const [customerData, setCustomerData] = useState([]);

//   useEffect(() => {
//     const storedCmtrId = localStorage.getItem('cmtrId');
//     if (storedCmtrId) {
//       setCmtrId(storedCmtrId);
//       fetchProductData(storedCmtrId);
//     }
//   }, []);

//   const fetchProductData = (cmtrId) => {
//     fetch(`https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/categories/${cmtrId}`)
//       .then((response) => response.json())
//       .then((result) => {
//         setData(result);
//       })
//       .catch(error => console.log(error));
//   };

//   const getNumber = () => {
//     const value = document.getElementById('getNumber').value;
//     console.log(value)
//     setCmtrId(value);
//     fetchProductData(value);
//   }

//   useEffect(() => {
//     localStorage.setItem('cmtrId', cmtrId);
//   }, [cmtrId]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetchProductData(cmtrId);
//   }

//   return (
//     <>
//       <div className="inputbox">
//         <form onSubmit={handleSubmit} className="d-flex align-items-center" style={{ margin: '0.5rem' }}>
//           <input
//             type="number"
//             className="form-control inputbox"
//             id="getNumber"
//             name="getNumber"
//             defaultValue={cmtrId}
//             placeholder="Enter Customer ID"
//             style={{ width: '15rem' }}
//           />
//           <button className="btn btn-primary ml-2" onClick={getNumber}>Submit</button>
//         </form>
//       </div>

//       <div>
//         <Row xs={2} sm={2} md={3} xl={4} lg={4} className="g-3 m-2 " >
//           {(customerData.length > 0 ? customerData : data).map((categories, index) =>
//           (
//             <Col key={index} >
//               <Link to={`${categories.name}`} style={{ textDecoration: 'none', color: '#832729' }}>
//                 <Card className="card" >
//                   <Card.Img variant="top" src={categories.image} alt="" className="image" />
//                   <Card.Body >
//                     <center>
//                       <Card.Title><small style={{ fontSize: "1rem" }}>{categories.name}</small></Card.Title>
//                     </center>
//                   </Card.Body>
//                   <center><button className="btn-viewmore">VIEW&nbsp;MORE</button></center>
//                 </Card>
//               </Link>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </>
//   )
// }

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
