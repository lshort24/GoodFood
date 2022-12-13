import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/styles';
import {formatBreaks, formatSteps} from "../util";
import * as DOMPurify from 'dompurify';

// Components
import { Chip } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';

// Style
import './RecipeDetail.css';
import Button from "@mui/material/Button";
import {Edit} from '@mui/icons-material';

const style = {
    root: {
        margin: '0 auto',
        maxWidth: 960,
        backgroundColor: '#e7f4ef',
        padding: '58px 10px 10px 10px'
    },
    detail: {
        border: 'solid 1px #7c9c60',
        borderRadius: 5,
        backgroundColor: '#ffffff',
        padding: 10
    },
    section: {
        marginTop: 15,
        fontSize: '1.5em',
        lineHeight: '1.1em',
    },
    title: {
        color: '#7c9c60',
        fontWeight: 'bold',
        fontSize: '2em'
    },
    photo: {
        width: 300,
        borderRadius: 10
    },
    chip: {
        marginLeft: 4,
        height: 24
    },
    chipWrapper: {
        display: 'flex',
        marginTop: 15,
        flexWrap: 'wrap',
        lineHeight: '24px'
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}

const RecipeDetail2 = ({
    classes,
    recipeId,
    title,
    description,
    photo,
    ingredients,
    directions,
    markdownRecipe,
    tags
}) => {
    const params = useParams();
    console.log('params', params);

    const formatTagChips = () => {
        if (!tags) {
            return null;
        }

        return tags.split(',')
            .map(tag => {
                return (
                    <Chip classes={{root: classes.chip}} key={tag.replace(' ', '')} label={tag.trim()}/>
                )
            })
    }

    if (recipeId === 0) {
        return null;
    }

    const photoBaseUrl = '/photos/';
    const photoImage = photo && photo.length > 0
        ? <img src={`${photoBaseUrl}/${photo}`} alt="" className={classes.photo}/>
        : null;

    let ingredientsHTML = ingredients && ingredients.length > 0
        ? <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(formatBreaks(ingredients))}} />
        : null;

    let directionsHTML = directions && directions.length > 0
        ? <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(formatSteps(directions))}} />
        : null;

    let content;
    if (markdownRecipe.length > 0) {
        const sanitized = DOMPurify.sanitize(markdownRecipe);
        content = (
            <div className={classes.section}>
                <div dangerouslySetInnerHTML={{__html: marked.parse(sanitized)}}/>
            </div>
        );
    }
    else {
        content = (
            <div>
                <div className={classes.section}>
                    <div className="recipe-detail-label">Ingredients:</div>
                    {ingredientsHTML}
                </div>
                <div className={classes.section}>
                    <div className="recipe-detail-label">Directions:</div>
                    {directionsHTML}
                </div>
            </div>
        );
    }
    return (
        <div className={classes.root}>
            <div className={classes.detail}>
                <div className={classes.titleWrapper}>
                    <div className={classes.title}>
                        {title}
                    </div>
                    <div>
                        <Link to={`/edit/${params.number}`}>
                            <Button variant="contained" startIcon={<Edit />}>
                                Edit Recipe
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={'media-hide-top-photo'}>
                    {photoImage}
                </div>
                <div>
                    <div className={'media-float-photo'}>
                        {photoImage}
                    </div>
                    <div className={classes.chipWrapper}>
                        <div className="recipe-detail-label">Tags:</div> {formatTagChips()}
                    </div>
                    <div style={{marginTop: 16}}>
                        {description}
                    </div>
                    {content}
                </div>
            </div>
        </div>
    )
}

RecipeDetail2.propTypes = {
    classes: PropTypes.object.isRequired,
    recipeId: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
    ingredients: PropTypes.string,
    directions: PropTypes.string,
    markdownRecipe: PropTypes.string
}

RecipeDetail2.defaultProps = {
    recipeId: 0,
    title: '',
    description: '',
    photo: '',
    ingredients: '',
    directions: '',
    markdownRecipe: '',
    tags: ''
}

const mapStateToProps = state => ({
    ...state.recipes.recipe
})

export default connect(mapStateToProps)(withStyles(style)(RecipeDetail2));