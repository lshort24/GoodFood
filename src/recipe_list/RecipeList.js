import React, { Component } from 'react';
import $ from 'jquery';
import SearchBar from '../search_bar/SearchBar';
import { Link } from 'react-router-dom';
import './RecipeList.css';
import { siteRoot, hostname, version } from '../env';

/**
 * @typedef    {Object} recipe
 * @property   {string} photo
 *
 * @typedef    {Object} response
 * @property   {Array}  tags
 * @property   {Array}  recipe_list
 *
 */
class RecipeList extends Component {
   constructor() {
      super();
      this.state = {
         tagFilter: [],
         tagList: [],
         recipeList : []
      }
   }

   componentDidMount() {
      $.get(`http://${hostname}${siteRoot}services/recipe_list.php?v=${version}`, (response) => {
         this.setState({
            tagList: response.tags,
            recipeList: response.recipe_list,
         })
      }).fail(() => {
         alert('Could not fetch the recipe list');
      })
   }

   render() {
      return (
         <div className="recipe-list-page">
            <SearchBar
               tagList={this.state.tagList}
               onUpdate={this.handleSearchBarUpdate}
            />
            <div>
               {this.formatRecipeList(this.state.recipeList)}
            </div>
         </div>
      );
   }

   formatRecipeList(recipeList) {
      const filterByTags = this.state.tagFilter.length > 0;

      return recipeList.map((recipe) => {
         if (filterByTags) {
            let match = false;
            this.state.tagFilter.forEach((filterTag) => {
               recipe.tags.forEach((recipeTag) => {
                  if (filterTag === recipeTag) {
                     match = true;
                     return false;
                  }
               });

               if (match) {
                  return false;
               }
            });

            if (!match) {
               return null;
            }
         }

         const detailUrl = `${siteRoot}detail/${recipe.id}`;

         // Photo
         const photoLink = recipe.photo
            ? <Link to={detailUrl} alt={recipe.title}>
               <img src={recipe.photo} className="recipe-list-item-photo" alt={recipe.title}/>
              </Link>
            : <span>&nbsp;</span>;
         const photo = <div className="recipe-list-item-photo">{photoLink}</div>;

         // Tags
         const recipeTagList = (filterByTags && recipe.tags.length > 0)
            ? <span><strong>Tags:</strong> { recipe.tags.join(', ') }</span>
            : null;

         const summary = <div className="recipe-list-item-summary">
            <div>
               <Link className="recipe-list-item-title" to={detailUrl} alt={recipe.title}>{recipe.title}</Link>
            </div>
            <div>
               {recipe.description}
            </div>
            <div>
               {recipeTagList}
            </div>
         </div>;

         return (
            <div key={recipe.id} className="recipe-list-item">
               {photo}
               {summary}
            </div>
         )
      });
   }

   handleSearchBarUpdate = (tags) => {
      this.setState({
         tagFilter: tags
      })
   };
}

export default RecipeList;