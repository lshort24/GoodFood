import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {Box, Button, Container, Paper, TextField, Typography, Alert, CircularProgress} from '@mui/material';

function renderErrorMessage(errorMessage) {
    if (errorMessage.length === 0) {
        return null;
    }

    return (
        <Alert severity="error">
            {errorMessage}
        </Alert>
    )
}

function renderLoadingMessage(loading) {
    if (loading) {
        return (
            <div>
                <CircularProgress />
            </div>
        )
    }

    return null;
}

function RecipeForm ({recipe, loading, errorMessage, onSave}) {
    const [formData, setFormData] = useState(recipe);

    useEffect(() => {
        if (recipe != null) {
            console.log('setting formData because it is not null.')
            setFormData(recipe);
        }
    }, [recipe]);

    const handleFieldChange = event => {
        console.log('setting formData because it changed.');
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSaveButtonClick = () => {
        onSave(formData);
    }

    const renderForm = (formData) => {
        if (formData === null) {
            return null;
        }

        return (
            <Paper>
                <Box p={2}>
                    <Box>
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            variant="outlined"
                            value={formData.title}
                            onChange={handleFieldChange}
                        />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <Button
                            variant="contained"
                            disabled={loading}
                            onClick={handleSaveButtonClick}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Paper>
        )
    }

    return (
        <Container sx={{paddingTop: '72px'}}>
            <Typography variant="h4">
                Recipe Form
            </Typography>

            {renderLoadingMessage(loading)}
            {renderErrorMessage(errorMessage)}
            {renderForm(formData)}
        </Container>
    )
}

RecipeForm.propTypes = {
    recipe: PropTypes.shape({
        title: PropTypes.string
    }),
    loading: PropTypes.bool,
    errorMessage: PropTypes.string,
    onSave: PropTypes.func.isRequired,
}

RecipeForm.defaultValues = {
    recipe: null,
    loading: false,
    errorMessage: ''
}

export default RecipeForm;