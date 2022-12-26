import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';

import {Button, Container, Paper, Stack, TextField, Typography, Alert, CircularProgress} from '@mui/material';

function renderForm (formData, loading, loadErrorMessage, saveErrorMessage, handleFieldChange, handleSaveButtonClick, handleSaveAndCloseButtonClick, handleCloseButtonClick) {
    const errorMessage = loadErrorMessage?.length > 0 ? loadErrorMessage : saveErrorMessage;
    return (
        <>
            {errorMessage?.length > 0 && <Alert severity="error">
                {errorMessage}
            </Alert>}
            <Paper sx={{padding: 2}}>
                <Stack direction="column" spacing={2}>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        variant="outlined"
                        value={formData.title}
                        inputProps = {{maxLength:100}}
                        sx={{width: '50%'}}
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
                        sx={{width: '50%'}}
                        onChange={handleFieldChange}
                    />
                    <TextField
                        id="prepTime"
                        name="prepTime"
                        label="Prep Time"
                        variant="outlined"
                        value={formData.prepTime ?? ''}
                        inputProps = {{maxLength:100}}
                        sx={{width: '25%'}}
                        onChange={handleFieldChange}
                    />
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
        markdownRecipe: '',
    }
    const [formData, setFormData] = useState(blankRecipe);

    useEffect(() => {
        if (recipe != null) {
            setFormData(recipe);
        }
    }, [recipe]);

    const handleFieldChange = useCallback((event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }, [setFormData, formData]);

    const handleSaveButtonClick = useCallback(() => {
        onSave(formData, false);
    }, [onSave, formData]);

    const handleSaveAndCloseButtonClick = useCallback(() => {
        onSave(formData, true);
    }, [onSave, formData]);

    const handleCloseButtonClick = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <Container sx={{paddingTop: '72px'}} maxWidth="md">
            <Stack spacing={2} direction="row">
                <Typography variant="h4">
                    Recipe Form
                </Typography>
                {loading && <CircularProgress />}
            </Stack>
            {renderForm(formData, loading, loadErrorMessage, saveErrorMessage, handleFieldChange, handleSaveButtonClick, handleSaveAndCloseButtonClick, handleCloseButtonClick)}
        </Container>
    )
}

RecipeForm.propTypes = {
    recipe: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        prepTime: PropTypes.string,
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