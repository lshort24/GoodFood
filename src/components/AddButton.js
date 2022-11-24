import React from 'react';
// Material UI components
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

// Components
import { Link } from 'react-router-dom';

function AddButton() {
    return (
        <Link to="new">
            <Button variant="contained" startIcon={<AddIcon />}>
                Add Recipe
            </Button>
        </Link>
    )
}

export default AddButton;