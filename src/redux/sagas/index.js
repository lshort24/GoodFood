import RecipesSagas from './recipes';
import {all} from 'redux-saga/effects';

function* rootSaga() {
    yield all([
        ...RecipesSagas
    ])
}

export default rootSaga;