import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Box, Container, Paper, TextField, Typography} from '@mui/material';

function RecipeForm ({title}) {
    const [titleValue, setTitleValue] = useState(title);

    const handleTitleChange = (event) => {
        setTitleValue(event.target.value);
    };
    return (
        <Container sx={{paddingTop: '72px'}}>
            <Typography variant="h4">
                Recipe Form
            </Typography>

            <Paper>
                <Box p={2}>
                    <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        value={titleValue}
                        onChange={handleTitleChange}
                    />
                </Box>
            </Paper>
        </Container>
    )
}

RecipeForm.propTypes = {
    title: PropTypes.string.isRequired,
    onSave: PropTypes.func
}

RecipeForm.defaultValues = {
}

export default RecipeForm;