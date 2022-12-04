import React from 'react';
import {useQuery, useMutation, gql} from '@apollo/client';
import {useParams} from 'react-router-dom';

import RecipeForm from '../components/RecipeForm';
import { debugToken} from '../secrets';

function EditRecipeController() {
    const [calc, { data: saveData, loading: saveLoading, error: saveError }] = useMutation(CALC, {
        context: {
            headers: {
                Authorization: `Bearer ${debugToken}`,
            }
        }
    });

    const handleSave = recipe => {
        console.log('saving recipe', recipe);
        calc({variables: {x:1, y:2}});
    }

    const params = useParams();
    const variables = {
        id: params.id
    }

    const {loading, error, data} = useQuery(GET_RECIPE_BY_ID, {variables})
    if (loading || saveLoading) {
        return (
            <div style={{padding: '50px'}}>
                Loading...
            </div>
        )
    }

    if (error || saveError) {
        return (
            <div style={{padding: '50px'}}>
                Oops! there was an error
            </div>
        )
    }

    const sum = saveData ? saveData.sum : 0;
    return (
        <>
            <RecipeForm
                title={data.recipe.title}
                onSave={handleSave}
            />
            <div>
                Sum: {sum}
            </div>
        </>
    )
}

const GET_RECIPE_BY_ID = gql`
query getRecipeById ($id: ID!) {
  recipe (id: $id) {
    title
  }
}
`

const CALC = gql`
mutation test($x: Int!, $y: Int!) {
  sum(x:$x, y:$y)
}
`
export default EditRecipeController;