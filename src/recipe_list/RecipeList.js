import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

// Style
import { withStyles } from '@material-ui/styles';
import './RecipeList.css';

// Components
import SearchBar from '../search_bar/SearchBar';

const styles = {
   root: {
      display: 'flex',
      justifyContent: 'space-between',
   },
   recipeList: {
      marginTop: 16,
   },
   emptyResults: {
      backgroundColor: '#ffffff',
      padding: 40,
      textAlign: 'center',
   }
};

const RecipeList = ({
    classes,
    items,
}) => {
    const formatRecipeList = () => {
    if (items.length === 0) {
        return (
            <div className={classes.emptyResults}>
                Sorry, there are no recipes that match your search keywords.
            </div>
        )
    }

    return items
        .sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            else if (a.title < b.title) {
                return -1
            }
            else {
                return 0;
            }
        })
        .map(recipe => {
            const detailLinkUrl = `/detail/${recipe.recipeId}`;
            const photoBaseUrl = '/photos/';

            // Photo
            const photoLink = recipe.photo
                ? (
                    <Link to={detailLinkUrl}>
                        <img src={photoBaseUrl + recipe.photo} className="recipe-list-item-photo" alt={recipe.title}/>
                    </Link>
                )
                : <span>&nbsp;</span>;
            const photo = <div className="recipe-list-item-photo">{photoLink}</div>;

            const summary = (
                <div className="recipe-list-item-summary">
                    <div>
                        <Link className="recipe-list-item-title" to={detailLinkUrl}>{recipe.title}</Link>
                    </div>
                    <div>
                        {recipe.description}
                    </div>
                </div>
            );

            return (
                <div key={recipe.recipeId} className="recipe-list-item">
                    {photo}
                    {summary}
                </div>
            )
      });
   }

   return (
      <div className="recipe-list-page">
         <SearchBar />
         <div className={classes.recipeList}>
            {formatRecipeList()}
         </div>
      </div>
   );
}

RecipeList.propTypes = {
   classes: PropTypes.object,
   items: PropTypes.array
}

RecipeList.defaultProps = {
   items: []
}
const mapStateToProps = state => ({
   items: state.recipes.summary
})

export default connect(mapStateToProps)(
    withStyles(styles)(
        RecipeList
    )
);