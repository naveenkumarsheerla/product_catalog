import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PopupProduct = ({ show, handleClose }) => {
    const [data, setData] = useState([])

    // const handleEditClick = (item) => {
    //   setEditingItem(item);
    //   console.log(item)
    // };
  
    const onchange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value;
        setData({ ...data, [name]: fieldValue, chapter: name === "chapter" ? parseInt(fieldValue) : data.chapter });
      }
      const onSubmit = (e) => {
        e.preventDefault();}
    useEffect(() => {
      fetch('http://localhost:8000/get_person')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })
        .catch((error) => console.log(error))
    }, [])
  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Popup Screen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
            <form onSubmit={onSubmit}>
          <div className="row mb-4">
            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Chapter</label>
            <div className="col-sm-6">
              <select className="form-select" aria-label="Default select example" name='chapter' defaultValue={data.chapter} onChange={onchange}>
                <option value=''>select chapter</option>
                <option value='1'>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          <div className="row mb-4">
            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">ST NO</label>
            <div className="col-sm-6">
              <input type="number" className="form-control form-control-sm" id="colFormLabelSm" placeholder=""
                name='stNo' value={data.stNo} onChange={onchange} />
            </div>
          </div>
          <div className="row mb-4">
            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Name</label>
            <div className="col-sm-7">
              <input type="text" className="form-control form-control-sm" id="colFormLabelSm" placeholder="" name='name' value={data.name} onChange={onchange} />
            </div>
          </div>
          <div className="row mb-4">
            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm" style={{ marginLeft: '0.5rem' }}>Mobile No</label>
            <div className="col-sm-6">
              <input type="number" className="form-control form-control-sm mg" id="colFormLabelSm" placeholder="" name='mobile' value={data.mobile} onChange={onchange} />
            </div>
          </div>
          <div className="row mb-4 ">
            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm" style={{ marginLeft: '0.5rem' }} >Category</label>
            <div className="col-sm-7">
              <input type="text" className="form-control form-control-sm" id="colFormLabelSm" placeholder="" name='category' value={data.category} onChange={onchange} />
            </div>
          </div>
          <div className="row mb-4">
            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm" >Ask</label>
            <div className="col-sm-4">
              <textarea name='ask' value={data.ask} onChange={onchange}></textarea>
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default PopupProduct;