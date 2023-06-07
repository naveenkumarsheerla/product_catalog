import React, { useState } from 'react'
import { TextField, Button, Grid, FormControl, Box, Paper, useMediaQuery } from '@mui/material';
import S3 from 'react-s3';
import { Buffer } from 'buffer';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const config = {
    bucketName: 'catalog-naveen',
    dirName: 'category',
    region: 'ap-south-1',
    accessKeyId: 'AKIARCBKP67OI4YJPLHG',
    secretAccessKey: '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',
};

const AddCategory = () => {
    const [formData, setFormData] = useState({});
    const [fileName, setFileName] = useState('');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const navigate =useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        navigate('/addsubcategory')

        fetch("https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/post-category", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => (response.json()))
            .then((data) => {
                setFormData(data)
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 1000)
                window.location.reload();
            })
            .catch((error) => console.log(error));


    };

    const handleFileUpload = async (e) => {
        global.Buffer = Buffer;
        const file = e.target.files[0];
        const options = {
            ...config,
            fileName: file.name,
        };

        try {
            const response = await S3.uploadFile(file, options);
            setFormData((data) => ({
                ...data,
                image: response.location,

            }))
            setFileName(file.name);
            console.log('Image uploaded successfully:', response.location);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    const isBelow480px = useMediaQuery('(max-width:480px)');

    const containerStyles = {
        // minHeight: '100vh',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: '120px',
        ...(isBelow480px && {
              padding:'50px 0'
        }),
    };

    const formStyles = {
        padding: '20px',
        borderRadius: 3,
        // boxShadow: '5px 5px 10px #ccc',
    };



    const textFieldStyles = {
        width: '100%',

        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1976D2',
            },
            '&:hover fieldset': {
                borderColor: '#1976D2',
            },
        },
        '& .MuiInputBase-input': {
            color: '#1976D2',
            fontSize: '15px',
            fontFamily: 'Open Sans',
        },
        '& .MuiInputLabel-root': {
            color: '#1976D2',
            fontSize: '13px',
            fontFamily: 'Open Sans',
        },
    };

    const uploadButtonStyles = {
        width: '100%',

        borderColor: '#f09916',
        '&:hover': {
            borderColor: '#f09916',
        },
        ...(isBelow480px && {
            width: '100%',
        }),
    };


    const ClearButton = styled(Button)(({ theme }) => ({
        color: "white",
        padding: "3px 18px",
        backgroundColor: "#f56420",
        border: "1px solid #f56420",
        borderRadius: "20px",
        fontWeight: "bold",
        margin: "15px 4px",
        fontSize: "0.8rem",
        '&:hover': {
            backgroundColor: '#f09916',
            borderColor: "#f09916",
        },
        ...(isBelow480px && {
            fontSize:'0.6rem'
        })
    }));

    const SaveButton = styled(Button)(({ theme }) => ({
        color: "white",
        padding: "3px 20px",
        backgroundColor: "#1976D2",
        border: "1px solid #1976D2",
        borderRadius: "20px",
        fontWeight: "bold",
        margin: "15px 4px",
        fontSize: "0.8rem",
        '&:hover': {
            backgroundColor: '#065cb3',
            borderColor: "#065cb3",
        },
        ...(isBelow480px && {
            fontSize:'0.6rem'
        })
    }));


    return (

        <div style={containerStyles}>
            <form onSubmit={handleSubmit}>
                <Grid container justifyContent="center">
                    <Grid item xs={8} sm={6} mb={4} lg={4} xl={4} >
                        <Paper elevation={10} style={formStyles}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                backgroundColor="white"
                                alignItems="center"
                                justifyContent="center"
                                padding="5px 20px"
                            >
                                <h3 className="Auth-form-title">Add Category</h3>


                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        label="Add category"
                                        variant="outlined"
                                        size='small'
                                        type="text"
                                        defaultValue={formData.name}
                                        onChange={(e) => setFormData(data => ({ ...data, name: e.target.value }))}
                                        sx={textFieldStyles}
                                    />

                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        label="Customer Id"
                                        variant="outlined"
                                        size='small'
                                        type="number"
                                        defaultValue={formData.customerId}
                                        onChange={(e) => setFormData(data => ({ ...data, customerId: parseInt(e.target.value) }))}
                                        sx={textFieldStyles}
                                    />

                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }}>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        id="productImage"
                                        name="productImage"
                                        defaultValue={formData.image}
                                        onChange={handleFileUpload}
                                        sx={{ display: 'none' }}

                                    />
                                    <label htmlFor="productImage">
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            sx={uploadButtonStyles}
                                        >
                                            <span
                                                style={{
                                                    fontSize: '11px',
                                                    color: '#f09916'
                                                }}
                                            >
                                                Upload Image
                                            </span>

                                        </Button>
                                    </label>
                                    {fileName && (
                                        <center>
                                        <p style={{ fontSize: '0.7rem', marginTop:'0.1rem' ,color:'darkgreen' }}>
                                            {fileName}
                                        </p>
                                        </center>
                                    )}

                                </FormControl>
                                <div style={{ textAlign: 'center' }}>
                                    <ClearButton type="button"
                                        onClick={() => setFormData({ name: '', image: '' })}
                                        className="clear-button"

                                    >
                                        Clear
                                    </ClearButton>
                                    <SaveButton
                                        type="submit"
                                        className="save-button"
                                    >
                                        Save
                                    </SaveButton>
                                </div>
                                <div className="showcontent">
                                    {showSuccessMessage && (
                                        <div className="success-message">Successfully updated!</div>
                                    )}
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </div >

    )
}

export default AddCategory