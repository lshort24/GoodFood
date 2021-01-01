import {takeLatest, call, fork, put} from 'redux-saga/effects';
import * as actions from '../actions/recipes';
import * as api from '../../api/recipes';

function* getRecipeSummary(action) {
    try {
        const result = yield call(api.getRecipes, {
            keywords: action.payload.keywords,
            summary: true
        })
        yield put(actions.getRecipeSummarySuccess(result.data));
    }
    catch(e) {
        console.log(e);
    }
}
function* watchGetRecipeSummaryRequest() {
    yield takeLatest(actions.Types.GET_RECIPE_SUMMARY_REQUEST, getRecipeSummary);
}

function* getRecipe(action) {
    try {
        const result = yield call(api.getRecipes, {
            id: action.payload.id
        });
        yield put(actions.getRecipeSuccess(result.data));
    }
    catch(e) {
        console.log(e);
    }
}
function* watchGetRecipeRequest() {
    yield takeLatest(actions.Types.GET_RECIPE_REQUEST, getRecipe);
}

const recipesSagas = [
    fork(watchGetRecipeSummaryRequest),
    fork(watchGetRecipeRequest)
]

export default recipesSagas;