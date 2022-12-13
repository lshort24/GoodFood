import React, {useState} from 'react';
import {useQuery, useMutation, gql} from '@apollo/client';
import {useParams} from 'react-router-dom';

import RecipeForm from '../components/RecipeForm';
import { debugToken} from '../secrets';

function EditRecipeController() {
    const [recipe, setRecipe] = useState(null);

    const params = useParams();

    const [update, { loading: saveLoading, error: saveError }] = useMutation(UPDATE, {
        context: {
            headers: {
                Authorization: `Bearer ${debugToken}`,
            }
        },
    });

    const handleSave = recipe => {
        console.log(`saving recipe with id ${params.id} with title ${recipe.title}`, recipe);
        update({variables: {id: params.id, title: recipe.title}})
            .then((response) => {
                // noinspection JSUnresolvedVariable
                console.log('Recipe after save.', response.data.updateRecipe);
            });
    }

    const variables = {
        id: params.id
    }

    const {loading, error} = useQuery(GET_RECIPE_BY_ID, {
        variables,
        onCompleted: (data) => {
            console.log('Setting recipe after query.');
            setRecipe(data.recipe);
        },
    })

    console.log('loading flags', {loading, error, saveLoading, saveError, recipe})
    return (
        <>
            <RecipeForm
                recipe={recipe}
                loading={loading || saveLoading}
                errorMessage={(error?.message || saveError?.message) ?? ''}
                onSave={handleSave}
            />
        </>
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