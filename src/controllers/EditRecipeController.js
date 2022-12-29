import React, {useCallback} from 'react';
import {useQuery, useMutation, gql} from '@apollo/client';
import {useParams, useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import RecipeForm from '../components/RecipeForm';
import {Alert, CircularProgress, Container, Stack, Typography} from "@mui/material";

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
            markdownRecipe: recipe.markdownRecipe,
            tags: recipe.tags.map((tag) => tag.id)
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
    const errorMessage = error?.message?.length > 0 ? error.message : saveError?.message;
    const disableSave = loading || error?.message?.length > 0;
    return (
        <Container sx={{paddingTop: '72px'}} maxWidth="md">
            <Stack spacing={2} direction="row">
                <Typography variant="h4">
                    Recipe Form
                </Typography>
                {(loading || saveLoading) && <CircularProgress />}
            </Stack>
            {errorMessage?.length > 0 && <Alert severity="error">{errorMessage}</Alert>}
            <RecipeForm
                recipe={data?.recipe}
                allTags={data?.tags}
                onSave={handleSave}
                onClose={handleClose}
                disableSave={disableSave}
            />
        </Container>
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
    tags {
      id
      name
    }
    markdownRecipe
  }
  tags {
    id
    name
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
    $tags: [ID]
) {
  updateRecipe(
    input: {
      id:$id, 
      title: $title
      description: $description
      prepTime: $prepTime
      photo: $photo
      markdownRecipe: $markdownRecipe
      tags: $tags
    }
  ) {
      id
      title
      description
      prepTime
      photo
      markdownRecipe
      tags {
        id
        name
      }
    }
}
`
export default EditRecipeController;