import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';

import {Box, Button, Container, Paper, TextField, Typography, Alert, CircularProgress} from '@mui/material';

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

function renderForm (formData, loading, loadErrorMessage, saveErrorMessage, handleFieldChange, handleSaveButtonClick) {
    const errorMessage = loadErrorMessage?.length > 0 ? loadErrorMessage : saveErrorMessage;
    return (
        <>
            {errorMessage?.length > 0 && <Alert severity="error">
                {errorMessage}
            </Alert>}
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
                            disabled={loading || loadErrorMessage?.length > 0}
                            onClick={handleSaveButtonClick}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}

function RecipeForm ({recipe, loading, loadErrorMessage, saveErrorMessage, onSave}) {
    const blankRecipe = {
        title: ''
    }
    const [formData, setFormData] = useState(blankRecipe);

    useEffect(() => {
        if (recipe != null) {
            console.log('setting formData because it is not null.', recipe);
            setFormData(recipe);
        }
    }, [recipe]);

    const handleFieldChange = useCallback((event) => {
        console.log('setting formData because it changed.');
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }, [setFormData, formData]);

    const handleSaveButtonClick = useCallback(() => {
        onSave(formData);
    }, [formData]);

    return (
        <Container sx={{paddingTop: '72px'}}>
            <Typography variant="h4">
                Recipe Form
            </Typography>

            {renderLoadingMessage(loading)}
            {renderForm(formData, loading, loadErrorMessage, saveErrorMessage, handleFieldChange, handleSaveButtonClick)}
        </Container>
    )
}

RecipeForm.propTypes = {
    recipe: PropTypes.shape({
        title: PropTypes.string
    }),
    loading: PropTypes.bool,
    loadErrorMessage: PropTypes.string,
    saveErrorMessage: PropTypes.string,
    onSave: PropTypes.func.isRequired,
}

RecipeForm.defaultValues = {
    loading: false,
}

export default RecipeForm;