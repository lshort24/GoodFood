import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Box, Button, Container, Paper, TextField, Typography} from '@mui/material';

function RecipeForm ({title, onSave}) {
    const [titleValue, setTitleValue] = useState(title);

    const handleTitleChange = event => {
        setTitleValue(event.target.value);
    };
    const handleSaveButtonClick = () => {
        const recipe = {
            title: titleValue,
        }
        onSave(recipe);
    }
    return (
        <Container sx={{paddingTop: '72px'}}>
            <Typography variant="h4">
                Recipe Form
            </Typography>

            <Paper>
                <Box p={2}>
                    <Box>
                        <TextField
                            id="title"
                            label="Title"
                            variant="outlined"
                            value={titleValue}
                            onChange={handleTitleChange}
                        />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <Button
                            variant="contained"
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
    title: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
}

export default RecipeForm;