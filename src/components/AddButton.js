import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

// Components
import { Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const styles = {
    addButton: {
        display: 'flex',
    },
    addIcon: {
        border: '1px solid #7c9c60',
        borderRadius: '5px',
        backgroundColor: 'white',
        marginRight: '8px',
        height: '24px',
        width: '24px',
        color: '#7c9c60',
    },
    addLink: {
        height: '24px',
        lineHeight: '24px',
        color: '#7c9c60',
    },
}

function AddButton({classes}) {
    return (
        <Link to="new">
            <div className={classes.addButton}>
                <div>
                    <Add className={classes.addIcon}/>
                </div>
                <div className={classes.addLink}>
                    Add Recipe
                </div>
            </div>
        </Link>
    )
}

AddButton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddButton);