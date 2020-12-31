import React, {useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Actions
import {getRecipeRequest} from '../redux/actions/recipes';

// Components
import {withRouter} from 'react-router-dom';
import RecipeDetail2 from './RecipeDetail2';

const RecipeDetailRoute = ({match, getRecipeRequest}) => {
    const recipeId = parseInt(match.params.number);
    useLayoutEffect(() => {
        getRecipeRequest(recipeId);
    });


    return <RecipeDetail2 />
}

RecipeDetailRoute.propTypes = {
    match: PropTypes.object.isRequired,
    getRecipeRequest: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    getRecipeRequest
}
export default connect(null, mapDispatchToProps)(withRouter(RecipeDetailRoute));