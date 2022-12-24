import React, {useCallback} from 'react';
import {useQuery, useMutation, gql} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import RecipeForm from '../components/RecipeForm';

function EditRecipeController() {
    const params = useParams();

    const [cookies] = useCookies(['accessToken']);

    const accessToken = cookies['accessToken'];
    const [update, { loading: saveLoading, error: saveError }] = useMutation(UPDATE, {
        context: {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        },
    });

    const handleSave = useCallback((recipe) => {
        console.log(`saving recipe with id ${params.id} with title ${recipe.title}`, recipe);
        update({variables: {
            id: params.id,
            title: recipe.title,
            description: recipe.description,
            prepTime: recipe.prepTime,
        }})
            .then((response) => {
                // noinspection JSUnresolvedVariable
                console.log('Recipe after save.', response.data.updateRecipe);
            });
    }, [update, params]);

    const variables = {
        id: params.id
    }

    const {loading, error, data} = useQuery(GET_RECIPE_BY_ID, {variables})
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
    description
    prepTime
  }
}
`

const UPDATE = gql`
mutation updateRecipe (
    $id: ID!, 
    $title: String
    $description: String
    $prepTime: String
) {
  updateRecipe(
    input: {
      id:$id, 
      title: $title
      description: $description
      prepTime: $prepTime
    }
  ) {
      id
      title
      description
      prepTime
    }
}
`
export default EditRecipeController;