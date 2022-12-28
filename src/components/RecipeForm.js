import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useCookies} from 'react-cookie';

import {Button, Container, Grid, Paper, Stack, TextField, Typography, Alert, CircularProgress} from '@mui/material';
import {PhotoCamera} from '@mui/icons-material';

import axios from 'axios';
axios.defaults.withCredentials = true;

function renderForm (formData, loading, loadErrorMessage, saveErrorMessage, handleFieldChange, handleSaveButtonClick, handleSaveAndCloseButtonClick, handleCloseButtonClick, handleUploadPhoto) {
    const errorMessage = loadErrorMessage?.length > 0 ? loadErrorMessage : saveErrorMessage;
    const photoFileName = formData?.photo?.length ? formData.photo : 'recipe_photo_placeholder.jpeg';
    return (
        <>
            {errorMessage?.length > 0 && <Alert severity="error">
                {errorMessage}
            </Alert>}
            <Paper sx={{padding: 2}}>
                <Stack direction="column" spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <Stack direction="column" spacing={2}>
                                <TextField
                                    id="title"
                                    name="title"
                                    label="Title"
                                    variant="outlined"
                                    value={formData.title}
                                    inputProps = {{maxLength:100}}
                                    onChange={handleFieldChange}
                                />
                                <TextField
                                    id="description"
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    value={formData.description}
                                    inputProps = {{maxLength:500}}
                                    multiline={true}
                                    maxRows={3}
                                    onChange={handleFieldChange}
                                />
                                <TextField
                                    id="prepTime"
                                    name="prepTime"
                                    label="Prep Time"
                                    variant="outlined"
                                    value={formData.prepTime ?? ''}
                                    inputProps = {{maxLength:100}}
                                    onChange={handleFieldChange}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack direction="column" spacing={1} alignItems="center">
                                <img
                                    alt={`Photo of ${formData.title}`}
                                    src={`https://shortsrecipes.com/photos/${photoFileName}`}
                                    style={{maxWidth: "144px", maxHeight: "144px"}}
                                />
                                <Button variant="contained" component="label" startIcon={<PhotoCamera/>}>
                                    Upload Photo
                                    <input hidden accept="image/*" multiple type="file" onChange={handleUploadPhoto}/>
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <TextField
                        id="markdownRecipe"
                        name="markdownRecipe"
                        label="Markdown Recipe"
                        variant="outlined"
                        value={formData.markdownRecipe}
                        multiline={true}
                        minRows={10}
                        onChange={handleFieldChange}
                    />
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={handleCloseButtonClick}
                        >
                            Close
                        </Button>
                        <Button
                            variant="outlined"
                            disabled={loading || loadErrorMessage?.length > 0}
                            onClick={handleSaveButtonClick}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            disabled={loading || loadErrorMessage?.length > 0}
                            onClick={handleSaveAndCloseButtonClick}
                        >
                            Save & Close
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </>
    )
}

function RecipeForm ({recipe, loading, loadErrorMessage, saveErrorMessage, onSave, onClose}) {
    const blankRecipe = {
        title: '',
        description: '',
        prepTime: '',
        photo: '',
        markdownRecipe: '',
    }
    const [formData, setFormData] = useState(blankRecipe);
    const [validationError, setValidationError] = useState('');
    const [photoUploadWarning, setPhotoUploadWarning] = useState('');
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        if (recipe != null) {
            setFormData(recipe);
        }
    }, [recipe]);

    const updateField = useCallback((name, value) => {
        console.log("update field", formData);
        setFormData({
            ...formData,
            [name]: value
        })
    }, [formData, setFormData]);

    const handleFieldChange = useCallback((event) => {
        updateField(event.target.name, event.target.value);
    }, [updateField]);

    const handleSaveButtonClick = useCallback(() => {
        setPhotoUploadWarning('');
        onSave(formData, false);
    }, [onSave, formData, setPhotoUploadWarning]);

    const handleSaveAndCloseButtonClick = useCallback(() => {
        onSave(formData, true);
    }, [onSave, formData]);

    const handleCloseButtonClick = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleUploadPhoto = useCallback((event) => {
        event.preventDefault()
        const file = event.target.files[0];
        const url = 'https://shortsrecipes.com/api/uploadFile.php';
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('fileName', file.name);
        const accessToken = cookies['accessToken'];
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        };
        setValidationError('');
        setPhotoUploadWarning('');
        axios.post(url, uploadData, config).then((response) => {
            console.log(response.data);
            if (response.data?.error) {
                setValidationError(response.data.error.message);
            }
            else {
                updateField('photo', response.data.photoFileName);
                setPhotoUploadWarning("Image won't be saved until the recipe is saved.");
            }
        });
    }, [setValidationError, updateField, setPhotoUploadWarning, cookies]);

    const handleCloseValidationError = useCallback(()=>{
        setValidationError('');
    }, [setValidationError]);

    const handlePhotoUploadWarning = useCallback(()=>{
        setPhotoUploadWarning('');
    }, [setPhotoUploadWarning]);

    console.log('Render recipe form', formData);
    return (
        <Container sx={{paddingTop: '72px'}} maxWidth="md">
            <Stack spacing={2} direction="row">
                <Typography variant="h4">
                    Recipe Form
                </Typography>
                {loading && <CircularProgress />}
            </Stack>
            {validationError && <Alert severity="error" onClose={handleCloseValidationError}>{validationError}</Alert>}
            {photoUploadWarning && <Alert severity="warning" onClose={handlePhotoUploadWarning}>{photoUploadWarning}</Alert>}
            {renderForm(formData, loading, loadErrorMessage, saveErrorMessage, handleFieldChange, handleSaveButtonClick, handleSaveAndCloseButtonClick, handleCloseButtonClick, handleUploadPhoto)}
        </Container>
    )
}

RecipeForm.propTypes = {
    recipe: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        prepTime: PropTypes.string,
        photo: PropTypes.string,
        markdownRecipe: PropTypes.string,
    }),
    loading: PropTypes.bool,
    loadErrorMessage: PropTypes.string,
    saveErrorMessage: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

RecipeForm.defaultValues = {
    loading: false,
}

export default RecipeForm;