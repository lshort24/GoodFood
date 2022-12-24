import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';

import {Button, Container, Paper, Stack, TextField, Typography, Alert, CircularProgress} from '@mui/material';

function renderForm (formData, loading, loadErrorMessage, saveErrorMessage, handleFieldChange, handleSaveButtonClick) {
    const errorMessage = loadErrorMessage?.length > 0 ? loadErrorMessage : saveErrorMessage;
    return (
        <>
            {errorMessage?.length > 0 && <Alert severity="error">
                {errorMessage}
            </Alert>}
            <Paper sx={{padding: 2}}>
                <Stack direction="column" spacing={2} sx={{width: '50%'}}>
                    <Stack direction="row" justifyContent="flex-start">
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            variant="outlined"
                            value={formData.title}
                            fullWidth={true}
                            inputProps = {{maxlength:100}}
                            onChange={handleFieldChange}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="flex-start">
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            variant="outlined"
                            value={formData.description}
                            inputProps = {{maxlength:500}}
                            fullWidth={true}
                            multiline={true}
                            maxRows={3}
                            onChange={handleFieldChange}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="flex-start">
                        <TextField
                            id="prepTime"
                            name="prepTime"
                            label="Prep Time"
                            variant="outlined"
                            value={formData.prepTime}
                            inputProps = {{maxlength:100}}
                            onChange={handleFieldChange}
                        />
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        disabled={loading || loadErrorMessage?.length > 0}
                        onClick={handleSaveButtonClick}
                    >
                        Save
                    </Button>
                </Stack>
            </Paper>
        </>
    )
}

function RecipeForm ({recipe, loading, loadErrorMessage, saveErrorMessage, onSave}) {
    const blankRecipe = {
        title: '',
        description: '',
        prepTime: ''
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
        onSave(formData);
    }, [formData]);

    return (
        <Container sx={{paddingTop: '72px'}}>
            <Stack spacing={2} direction="row">
                <Typography variant="h4">
                    Recipe Form
                </Typography>
                {loading && <CircularProgress />}
            </Stack>
            {renderForm(formData, loading, loadErrorMessage, saveErrorMessage, handleFieldChange, handleSaveButtonClick)}
        </Container>
    )
}

RecipeForm.propTypes = {
    recipe: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        prepTime: PropTypes.string,
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