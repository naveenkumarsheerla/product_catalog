import { Box, Pagination, PaginationItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { margin } from "@mui/system";
import React, { useEffect, useState } from "react";
// import "../Components/ProductTable.css"
import { Form, Modal } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

export const ProductTable = () => {

  const [data, setData] = useState([])
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '100%', overflow: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>

                <TableCell><Typography variant="body1" fontWeight="bold" fontFamily="Open Sans">No.</Typography></TableCell>
                <TableCell><Typography variant="body1" fontWeight="bold" fontFamily="Open Sans">Name</Typography></TableCell>
                <TableCell><Typography variant="body1" fontWeight="bold" fontFamily="Open Sans">Price</Typography></TableCell>
                <TableCell><Typography variant="body1" fontWeight="bold" fontFamily="Open Sans">Wight</Typography></TableCell>
                <TableCell><Typography variant="body1" fontWeight="bold" fontFamily="Open Sans">CategoryId</Typography></TableCell>
                <TableCell><Typography variant="body1" fontWeight="bold" fontFamily="Open Sans">SubCategoryId</Typography></TableCell>
                <TableCell><Typography variant="body1" fontWeight="bold" fontFamily="Open Sans">Description</Typography></TableCell>
                <TableCell><Typography variant="body1" fontWeight="bold" fontFamily="Open Sans">Edit</Typography></TableCell>
                <TableCell><Typography variant="body1" fontWeight="bold" fontFamily="Open Sans">Delete</Typography></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(currentItems) && currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell>{item.subCategoryName}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditClick(item)}><EditIcon /></Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDeleteClick(item.id)}><DeleteIcon /></Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <td colSpan="8">No data available</td>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>

      
      {/* 
      <Pagination count={totalPages} page={currentPage} onChange={(event, page) => handlePageChange(page)}>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index + 1} component="div" value={index + 1} />
        ))}
      </Pagination> */}
       <Box sx={{ display: 'flex', justifyContent: 'right', margin: '10px' }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => handlePageChange(page)}
        shape="rounded"
        size="large"
        boundaryCount={2}
        // showFirstButton
        // showLastButton
        renderItem={(item) => (
          <PaginationItem
            component="div"
            {...item}
            onClick={() => handlePageChange(item.page)}
          />
        )}
      />
</Box>

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
                value={editedData.categoryId || ""}
                onChange={(e) => setEditedData({ ...editedData, categoryId: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sub Category</Form.Label>
              <Form.Control
                type="text"
                value={editedData.subCategoryId || ""}
                onChange={(e) => setEditedData({ ...editedData, subCategoryId: e.target.value })}
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