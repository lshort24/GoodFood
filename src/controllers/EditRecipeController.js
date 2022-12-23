import React, {useCallback} from 'react';
import {useQuery, useMutation, gql} from '@apollo/client';
import {useParams} from 'react-router-dom';

import RecipeForm from '../components/RecipeForm';
import { debugToken} from '../secrets';

function EditRecipeController() {
    const params = useParams();

    const [update, { loading: saveLoading, error: saveError }] = useMutation(UPDATE, {
        context: {
            headers: {
                Authorization: `Bearer ${debugToken}`,
            }
        },
    });

    const handleSave = useCallback((recipe) => {
        console.log(`saving recipe with id ${params.id} with title ${recipe.title}`, recipe);
        update({variables: {id: params.id, title: recipe.title}})
            .then((response) => {
                // noinspection JSUnresolvedVariable
                console.log('Recipe after save.', response.data.updateRecipe);
            });
    }, [update, params]);

    const variables = {
        id: params.id
    }

    const {loading, error, data} = useQuery(GET_RECIPE_BY_ID, {variables})

    console.log('loading flags', {loading, error, saveLoading, saveError, data})
    return (
        <RecipeForm
            recipe={data?.recipe}
            loading={loading || saveLoading}
            loadErrorMessage={error?.message}
            saveErrorMessage={saveError?.message}
            onSave={handleSave}
        />
    )
}

const GET_RECIPE_BY_ID = gql`
query getRecipeById ($id: ID!) {
  recipe (id: $id) {
    id
    title
  }
}
`

const UPDATE = gql`
mutation updateRecipe ($id: ID!, $title: String) {
  updateRecipe(input: {id:$id, title: $title}) {
    id
    title
  }
}
`
export default EditRecipeController;