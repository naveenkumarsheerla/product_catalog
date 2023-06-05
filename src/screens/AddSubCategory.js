import { Button, FormControl, InputLabel, Select, MenuItem, TextField, styled, Box, Paper, Grid, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import S3 from 'react-s3';
import { Buffer } from 'buffer';

const config = {
    bucketName: 'catalog-naveen',
    dirName: 'subcategory',
    region: 'ap-south-1',
    accessKeyId: 'AKIARCBKP67OI4YJPLHG',
    secretAccessKey: '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',
};
const AddSubCategory = () => {

    const [value, setValue] = useState([]);
    const [data, setData] = useState({})
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const [selectedId, setSelectedId] = useState('')
    const [fileName, setFileName] = useState('');
  

    useEffect(() => {
        fetch('https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/get-category')
            .then(res => res.json())
            .then((data) => {
                setValue(data)
                // console.log(data.items)
            })
            .catch(error => console.log(error))

    }, [])



    const handlesubmit = (e) => {
        e.preventDefault()


        console.log(selectedId)
        console.log(data)

        fetch('https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/post-subCategory',
            {
                method: "POST",
                body: JSON.stringify({ ...data, categoryName: selectedId }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 1000)
                window.location.reload();
            })

    }


    const handleFileUpload = async (e) => {
        global.Buffer = Buffer;
        const file = e.target.files[0];
        const options = {
            ...config,
            fileName: file.name,
        };

        try {
            const response = await S3.uploadFile(file, options);
            setData((data) => ({
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: '20px',
        ...(isBelow480px && {
            minHeight: '60vh',
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
            fontSize: "0.6rem",
        }),
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
            fontSize: "0.6rem",
        }),
    }));

    const handleClearButtonClick = () => {
        setValue([])
        setData({ ...data, name: '' })
    };



    return (
        <>

            <div style={containerStyles}>
                <form onSubmit={handlesubmit}>
                    <Grid container justifyContent="center">
                        <Grid item xs={8} sm={12} md={12}>
                            <Paper elevation={10} style={formStyles}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    backgroundColor="white"
                                    alignItems="center"
                                    justifyContent="center"
                                    padding="5px 20px"
                                >
                                    <h3 className="Auth-form-title">Add&nbsp;Sub&nbsp;Category</h3>
                                    <FormControl fullWidth sx={{ m: 1 }}>

                                        <TextField


                                            label="Category"
                                            id="categoryId"
                                            size='small'
                                            value={selectedId}
                                            select
                                            onChange={(event) => setSelectedId(event.target.value)}
                                            sx={textFieldStyles}
                                        >

                                            {value.map((item) => (
                                                <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>

                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <TextField
                                            label="Add sub category"
                                            variant="outlined"
                                            size='small'
                                            type="text"
                                            defaultValue={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
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
                                            defaultValue={data.image}
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
                                                <p style={{ fontSize: '0.7rem', marginTop: '0.1rem', color: 'darkgreen' }}>
                                                    {fileName.substring(0,10)+"..."}
                                                </p>
                                            </center>
                                        )}
                                    </FormControl>


                                    <div style={{ textAlign: 'center' }}>
                                        <ClearButton type="button"
                                            onClick={handleClearButtonClick}
                                        >
                                            Clear
                                        </ClearButton>
                                        <SaveButton
                                            type="submit"
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


        </>
    )
}

export default AddSubCategory