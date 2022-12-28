import React, {useCallback} from 'react';
import {useQuery, useMutation, gql} from '@apollo/client';
import {useParams, useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import RecipeForm from '../components/RecipeForm';

function EditRecipeController() {
    const params = useParams();
    const history = useHistory();
    const [cookies] = useCookies(['accessToken']);

    const accessToken = cookies['accessToken'];
    const [update, { loading: saveLoading, error: saveError }] = useMutation(UPDATE, {
        context: {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        },
    });

    const handleSave = useCallback((recipe, close) => {
        console.log(`saving recipe with id ${params.id} with title ${recipe.title}`, recipe);
        update({variables: {
            id: params.id,
            title: recipe.title,
            description: recipe.description,
            prepTime: recipe.prepTime,
            photo: recipe.photo,
            markdownRecipe: recipe.markdownRecipe
        }})
            .then((response) => {
                // noinspection JSUnresolvedVariable
                console.log('Recipe after save.', response.data.updateRecipe);
                if (close) {
                    history.goBack();
                }
            });
    }, [update, params, history]);

    const handleClose = useCallback(() => {
        history.goBack();
    }, [history])

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
            onClose={handleClose}
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
    photo
    markdownRecipe
  }
}
`

const UPDATE = gql`
mutation updateRecipe (
    $id: ID!
    $title: String
    $description: String
    $prepTime: String
    $photo: String
    $markdownRecipe: String
) {
  updateRecipe(
    input: {
      id:$id, 
      title: $title
      description: $description
      prepTime: $prepTime
      photo: $photo
      markdownRecipe: $markdownRecipe
    }
  ) {
      id
      title
      description
      prepTime
      photo
      markdownRecipe
    }
}
`
export default EditRecipeController;