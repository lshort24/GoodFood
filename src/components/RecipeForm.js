import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {Box, Button, Container, Paper, TextField, Typography, Alert} from '@mui/material';

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
                Loading...
            </div>
        )
    }

    return null;
}

function RecipeForm ({recipe, loading, errorMessage, onSave}) {
    const [formData, setFormData] = useState(recipe);

    useEffect(() => {
        setFormData(recipe);
    }, [recipe]);

    const handleFieldChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSaveButtonClick = () => {
        onSave(formData);
    }

    return (
        <Container sx={{paddingTop: '72px'}}>
            <Typography variant="h4">
                Recipe Form
            </Typography>

            {renderLoadingMessage(loading)}
            {renderErrorMessage(errorMessage)}
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
    recipe: {
        title: ''
    },
    loading: false,
    errorMessage: ''
}

export default RecipeForm;