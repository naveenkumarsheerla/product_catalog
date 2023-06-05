import React, { useEffect, useState } from "react";
// import "../src/table.css"
import { Button, Form, Modal } from "react-bootstrap";


export const ProductTable = () => {

  const [data, setData] = useState([])
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedData, setEditedData] = useState({});

    console.log(editedData)
  const handleDeleteClick = (id) => {
    fetch(`https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        console.log(setData((data) => data.filter((item) => item.id !== id)));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch('https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/get-product')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditedData(item);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    fetch(`https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/products/${editingItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((res) => res.json())
      .then(() => {
        setData((prevData) =>
          prevData.map((item) => (item.id === editingItem.id ? editedData : item))
        );
        setShowEditModal(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">weight</th>
            <th scope="col">categoryName</th>
            <th scope="col">subCategoryName</th>
            <th scope="col">description</th>
            <th scope="col">Edit</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.weight}</td>
                <td>{item.categoryName}</td>
                <td>{item.subCategoryName}</td>
                <td>{item.description}</td>
               <td>
                  <button onClick={() => handleEditClick(item)}>edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteClick(item.id)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          )}
        </tbody>

      </table>
      

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
              Name</Form.Label>
              <Form.Control
                type="text"
                value={editedData.name || ""}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>price</Form.Label>
              <Form.Control
                type="text"
                value={editedData.price || ""}
                onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                value={editedData.weight || ""}
                onChange={(e) => setEditedData({ ...editedData, weight: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={editedData.categoryName|| ""}
                onChange={(e) => setEditedData({ ...editedData, categoryName: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sub Category</Form.Label>
              <Form.Control
                type="text"
                value={editedData.subCategoryName || ""}
                onChange={(e) => setEditedData({ ...editedData, subCategoryName: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editedData.description || ""}
                onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};