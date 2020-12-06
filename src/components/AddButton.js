import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

// Components
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styles = {
    addButton: {
        backgroundColor: '#ffffff'
    },
    addIcon: {
        height: '1.5em',
        width: '1.5em',
    }
}

function AddButton({classes}) {
    const handleAddButtonClick = () => {
        alert('Coming Soon!');
    }

    return (
        <Button className={classes.addButton} onClick={handleAddButtonClick}>
            <Add className={classes.addIcon}/>
        </Button>
    )
}

AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddButton);