import React, { useEffect, useState } from 'react'
import { Box,styled, Button, FormControl, Grid, MenuItem, Paper, TextField,useMediaQuery } from '@mui/material';
import S3 from 'react-s3';
import { Buffer } from 'buffer';

const config = {
    bucketName: 'catalog-naveen',
    dirName: 'product',
    region: 'ap-south-1',
    accessKeyId: 'AKIARCBKP67OI4YJPLHG',
    secretAccessKey: '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',
};

const AddProductDetails = () => {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState([]);
    const [productWeight, setProductWeight] = useState(null);
    const [productKeywords, setProductKeywords] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');

    // const imgPath = window.location.origin

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const menuprops = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    useEffect(() => {
      
        fetch('https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/get-category')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                console.log(data)
            })
            .catch(error => {
                console.error(error);
                // handle error
            });
    }, []);

    useEffect(() => {
        const id = (selectedCategory)
        console.log(typeof (id))
        if (id) {
       
            fetch(`https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/subcategories?category_name=${id}`)
                .then(response => response.json())
                .then(data => {
                    setSubCategories(data);
                    // console.log(data)
                })

                .catch(error => {
                    console.error(error);
                    // handle error
                });
        }
    }, [selectedCategory]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        console.log(typeof (event.target.value))
        setSelectedSubCategory('');
        const selectedCategoryName = event.target.value;
        setSelectedCategory(selectedCategoryName);
        const selectedCategory = categories.find(category => category.name === selectedCategoryName);

        // Set the selected category ID
        if (selectedCategory) {
            setSelectedCategoryId(selectedCategory.id);
        }
    };

    const handleSubCategoryChange = (event) => {
        setSelectedSubCategory(event.target.value);
        setSelectedSubCategory('');
        const selectedCategoryName = event.target.value;
        setSelectedSubCategory(selectedCategoryName);
        const selectedSubCategory = subCategories.find(subcategory => subcategory.name === selectedCategoryName);

        // Set the selected category ID
        if (selectedSubCategory) {
            setSelectedSubCategoryId(selectedSubCategory.id);
        }
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleBrandNameChange =(event)=>{
        setBrandName(event.target.value)

    }

    const handleProductDescriptionChange = (event) => {
        setProductDescription(event.target.value);
    };

    const handleProductPriceChange = (event) => {
        setProductPrice(event.target.value);
    };


  
    const handleFileUpload = async (e) => {
        global.Buffer = Buffer;
        const files = e.target.files;

        try {
            const uploadPromises = Array.from(files).map((file) => {
                const uniqueFileName = `${Date.now()}_${file.name}`;
                const options = {
                    ...config,
                    fileName: uniqueFileName,
                };
                return S3.uploadFile(file, options);
            });

            const uploadResponses = await Promise.all(uploadPromises);
            const uploadLocations = uploadResponses.map((response) => response.location);
            setProductImage(uploadLocations)
            console.log('Images uploaded successfully:', uploadLocations);
        } catch (error) {
            console.error('Error uploading images:', error);
        }

    };

    const handleProductWeightChange = (event) => {
        const value = event.target.value;
        const parsedValue = parseFloat(value.replace(/,/g, '').replace(/[^\d.-]/g, ''));
        const newValue = isNaN(parsedValue) ? null : parsedValue;
        setProductWeight(newValue);
    };

    const handleProductKeywordsChange = (event) => {
        setProductKeywords(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        //   console.log(selectedCategory)
        const formData = {
            categoryName: (selectedCategory),
            categoryId: (selectedCategoryId),
            subCategoryName: (selectedSubCategory),
            subCategoryId: (selectedSubCategoryId),
            brandName:(brandName),
            name: productName,
            description: productDescription,
            price: Number(productPrice),
            weight: parseFloat(productWeight),
            keyWords: productKeywords,
            image: productImage

        };
        console.log(formData)
     

        fetch('https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/post-product', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // setShowSuccessMessage(true);
                // setTimeout(() => {
                //     setShowSuccessMessage(false);
                // }, 2000)
                // window.location.reload();
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleClearButtonClick = () => {
        setSelectedCategory('');
        setSelectedSubCategory('');
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductImage([]);
        setProductWeight('');
        setProductKeywords('');
    };

    const isBelow480px = useMediaQuery('(max-width:480px)');

    const containerStyles = {
        // minHeight: '100vh',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: '10px 0',
        ...(isBelow480px && {
            // minHeight: '50vh',
            padding: '50px 0',
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
            // color: '#1976D2',
            fontSize: '14px',
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

    return (
        <>
                <div style={containerStyles}>
                <form onSubmit={handleSubmit}>
                    <Grid container justifyContent="center">
                        <Grid item xs={10} sm={6} md={4} lg={4} xl={4}>
                            <Paper elevation={10} style={formStyles}>
                        <Box
                            display="flex"
                            flexDirection="column"     
                            backgroundColor="white"
                            alignItems="center"
                            justifyContent="center"                      
                            padding="0px 20px"     
                        >

                            <h3 className="Auth-form-title">Product Details</h3>
                            {/* <Grid container> */}
                            {/* <Grid item xs={6}> */}

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    // labelId="demo-multiple-name-label"
                                    label="Category"
                                    id="category"
                                    size='small'
                                    select
                                    value={selectedCategory}
                                    // input={<OutlinedInput label="Category" />}
                                    menuprops={menuprops}
                                    onChange={handleCategoryChange}
                                    sx={textFieldStyles}
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category.id} value={category.name} >{category.name}</MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    label="Category ID"
                                    id="categoryId"
                                    variant="outlined"
                                    size='small'
                                    value={selectedCategoryId}
                                    disabled
                                    sx={textFieldStyles}
                                />
                            </FormControl>

                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <TextField
                                            id="subCategory"
                                            // name="type"
                                            // labelId="demo-multiple-name-label"
                                            size='small'
                                            select
                                            displayEmpty
                                            label="Sub Category"
                                            menuprops={menuprops}
                                            value={selectedSubCategory}
                                            onChange={handleSubCategoryChange}
                                            sx={textFieldStyles}
                                        >
                                            {subCategories.map(subCategory => (
                                                <MenuItem key={subCategory.id} value={subCategory.name}>{subCategory.name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField

                                    label="Sub Category ID"
                                    size='small'
                                    variant="outlined"
                                    value={selectedSubCategoryId}
                                    disabled
                                    sx={textFieldStyles}
                                />
                            </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        type="text"
                                        label="Brand Name"
                                        size="small"
                                        variant="outlined"
                                        value={brandName}
                                        onChange={handleBrandNameChange}
                                        sx={textFieldStyles}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        type="text"
                                        label="Product Name"
                                        size="small"
                                        variant="outlined"
                                        value={productName}
                                        onChange={handleProductNameChange}
                                        sx={textFieldStyles}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        type="number"
                                        label="Product Price"
                                        // name="productPrice"
                                        variant="outlined"
                                        size="small"
                                        value={productPrice}
                                        onChange={handleProductPriceChange}
                                        sx={textFieldStyles}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        type="text"
                                        label="Product Weight"
                                        variant="outlined"
                                        size="small"
                                        name="productWeight"
                                        value={productWeight || ''}
                                        onChange={handleProductWeightChange}
                                        sx={textFieldStyles}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                        type="text"
                                        label="Product Keywords"
                                        size="small"
                                        variant="outlined"
                                        value={productKeywords}
                                        onChange={handleProductKeywordsChange}
                                        sx={textFieldStyles}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField id="outlined-multiline-static"
                                        label="Product Description"
                                        multiline
                                        rows={2}
                                        value={productDescription}
                                        onChange={handleProductDescriptionChange}
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
                                        multiple
                                        defaultValue={productImage}
                                        onChange={handleFileUpload}
                                        sx={{ display: 'none' }}
                                    // onChange={(e) => setProductImage(data => ({ ...data, image: imgPath + /images/ + e.target.files[0].name }))}
                                    />
                                    <label htmlFor="productImage">
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            sx={uploadButtonStyles} >
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

                                </FormControl>

                            <div style={{ textAlign: 'center' }}>
                            <ClearButton type="button"
                                        onClick={handleClearButtonClick}
                                    >
                                           Cancel
                                    </ClearButton>
                                    <SaveButton
                                        type="submit"
                                    >
                                        Save
                                    </SaveButton>
                                <div className="showcontent">
                                    {showSuccessMessage && (
                                        <div className="success-message">Successfully updated!</div>
                                    )}
                                </div>
                            </div>
                            {/* </Grid> */}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </div >
        </>
    )
}

export default AddProductDetails;





