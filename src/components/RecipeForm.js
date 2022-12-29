import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useCookies} from 'react-cookie';

import {Alert, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField} from '@mui/material';
import {PhotoCamera} from '@mui/icons-material';

import axios from 'axios';
axios.defaults.withCredentials = true;

function RecipeForm ({recipe, allTags, onSave, onClose, disableSave}) {
    const blankRecipe = {
        title: '',
        description: '',
        prepTime: '',
        photo: '',
        markdownRecipe: '',
        tags: []
    }
    const [formData, setFormData] = useState(blankRecipe);
    const [selectedTag, setSelectedTag] = useState('');
    const [validationError, setValidationError] = useState('');
    const [photoUploadWarning, setPhotoUploadWarning] = useState('');
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        if (recipe != null) {
            setFormData(recipe);
        }
    }, [recipe]);

    const updateField = useCallback((name, value) => {
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
                const {photoFileName} = response.data;
                if (photoFileName) {
                    updateField('photo', photoFileName);
                    setPhotoUploadWarning("Image won't be saved until the recipe is saved.");
                }
            }
        });
    }, [setValidationError, updateField, setPhotoUploadWarning, cookies]);

    const handleCloseValidationError = useCallback(()=>{
        setValidationError('');
    }, [setValidationError]);

    const handlePhotoUploadWarning = useCallback(()=>{
        setPhotoUploadWarning('');
    }, [setPhotoUploadWarning]);

    const handleDeleteTag = useCallback((tag) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tagItem) => {
                return tagItem.id !== tag.id;
            })
        });
    }, [formData, setFormData]);

    const handleAddTag = useCallback(() => {
        if (selectedTag === '') {
            return;
        }

        const hasTag = formData.tags.find((tag) => {
            return tag.id === selectedTag.id
        });

        if (hasTag) {
            setSelectedTag('');
            return;
        }

        setFormData({
            ...formData,
            tags: [...formData.tags, selectedTag]
        });
        setSelectedTag('');
    }, [formData, setFormData, selectedTag,setSelectedTag]);

    const handleSelectTag = useCallback((event) => {
        setSelectedTag(event.target.value)
    }, [setSelectedTag]);

    const photoFileName = formData?.photo?.length ? formData.photo : 'recipe_photo_placeholder.jpeg';

    const recipeChips = formData.tags.map((tag) => {
        const {id, name} = tag;
        return <Chip
            key={id}
            label={name}
            onDelete={() => handleDeleteTag(tag)}
        />
    });

    const chipMenu = allTags ? allTags.map((tag) => {
        return <MenuItem key={tag.id} value={tag}>{tag.name}</MenuItem>;
    }) : null;

    // noinspection JSValidateTypes
    return (
        <>
            {validationError && <Alert severity="error" onClose={handleCloseValidationError}>{validationError}</Alert>}
            {photoUploadWarning && <Alert severity="warning" onClose={handlePhotoUploadWarning}>{photoUploadWarning}</Alert>}
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
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <span>Tags:</span>
                                    {recipeChips}
                                </Stack>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <FormControl>
                                        <InputLabel id="add-tag-select-label">Choose Tag</InputLabel>
                                        <Select
                                            labelId="add-tag-select-label"
                                            label="Choose Tag"
                                            value={selectedTag}
                                            onChange={handleSelectTag}
                                            autoWidth
                                            sx={{minWidth: 116}}
                                        >
                                            {chipMenu}
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" onClick={handleAddTag}>Add</Button>
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack direction="column" spacing={1} alignItems="center">
                                <img
                                    alt={`Photo of ${formData.title}`}
                                    src={`https://shortsrecipes.com/photos/${photoFileName}`}
                                    style={{maxWidth: "144px", maxHeight: "144px"}}
                                />
                                <Button variant="contained" component="label" startIcon={<PhotoCamera/>} disabled={disableSave}>
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
                            disabled={disableSave}
                            onClick={handleSaveButtonClick}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            disabled={disableSave}
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

RecipeForm.propTypes = {
    recipe: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        prepTime: PropTypes.string,
        photo: PropTypes.string,
        markdownRecipe: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        }))
    }),
    allTags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })),
    disableSave: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

RecipeForm.defaultValues = {
    allTags: [],
    disableSave: false,
}

export default RecipeForm;