import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {useParams} from 'react-router-dom';

import RecipeForm from '../components/RecipeForm';

function EditRecipeController() {
    const params = useParams();
    const variables = {
        id: params.id
    }

    const {loading, error, data} = useQuery(GET_RECIPE_BY_ID, {variables})
    if (loading) {
        return (
            <div style={{padding: '50px'}}>
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <div style={{padding: '50px'}}>
                Oops! there was an error
            </div>
        )
    }

    return (
        <RecipeForm
            title={data.recipe.title}
        />
    )
}

const GET_RECIPE_BY_ID = gql`
query getRecipeById ($id: ID!) {
  recipe (id: $id) {
    title
  }
}
`
export default EditRecipeController;