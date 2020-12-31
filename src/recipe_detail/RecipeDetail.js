import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { markdown } from 'markdown';

import './RecipeDetail.css';
//import { siteRoot, hostname, version } from '../env';
import { formatBreaks, formatSteps } from '../util';

const styles = {
   photo: {
      width: 300,
      borderRadius: 10
   },
   chip: {
      marginLeft: 4,
      height: 24
   },
   chipWrapper: {
      display: 'flex',
      marginTop: 15,
      flexWrap: 'wrap',
      lineHeight: '24px'
   },
};

class RecipeDetail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         title: '',
         tags: [],
         description: '',
         photo: '',
         ingredients: '',
         directions: '',
         markdown: ''
      }
   }

   /*
   componentDidMount() {
      const id = this.props.match.params.number;
      const url = `https://${hostname}${siteRoot}services/recipe_detail.php?v=${version}&id=${id}`;

      fetch(url).then(response => {
         return response.json();
      }).then(data => {
         this.setState({
            title: data.title,
            tags: data.tags,
            description: data.description,
            ingredients: data.ingredients || '',
            directions: data.directions || '',
            markdown: data.markdown || '',
            photo: data.photo || ''
         })
      }).catch(error => {
         console.log("Error", error);
         alert('Could not fetch the recipe list');
      });
   }
*/

   render() {
      if (this.props.recipes.length === 0) {
         return null;
      }
      const id = this.props.match.params.number;
      const recipe = this.props.recipes.find(recipe => recipe.recipe_id = id);

      const tagChips = 'tags';
      /*
      const tagChips = this.state.tags.length >= 0
         ? this.state.tags.map((tag) => {
               return (
                  <Chip classes={{root: this.props.classes.chip}} key={tag.replace(' ', '')} label={tag}/>
               )
           })
         : null;
      */

      const photoBaseUrl = '/photos/';
      const photo = recipe.photo.length > 0
         ? <img src={`${photoBaseUrl}/${recipe.photo}`} alt="" className={this.props.classes.photo}/>
         : null;

      let ingredients = recipe.ingredients.length > 0
         ? <div dangerouslySetInnerHTML={{__html: formatBreaks(recipe.ingredients)}} />
         : null;

      let directions = recipe.directions.length > 0
         ? <div dangerouslySetInnerHTML={{__html: formatSteps(recipe.directions)}} />
         : null;

      let content;
      if (recipe.markdown_recipe.length > 0) {
         content = (
            <div className="recipe-detail-section">
               <div dangerouslySetInnerHTML={{__html: markdown.toHTML(recipe.markdown)}} className="markdown"/>
            </div>
         );
      }
      else {
         content = (
            <div>
               <div className="recipe-detail-section">
                  <div className="recipe-detail-label">Ingredients:</div>
                  {ingredients}
               </div>
               <div className="recipe-detail-section">
                  <div className="recipe-detail-label">Directions:</div>
                  {directions}
                </div>
            </div>
         );
      }
      return (
         <div className="recipe-detail-page">
            <div className="recipe-detail">
               <div className="recipe-detail-title">
                  {recipe.title}
               </div>
               <div className={'media-hide-top-photo'}>
                  {photo}
               </div>
               <div>
                  <div className={'media-float-photo'}>
                     {photo}
                  </div>
                  <div className={this.props.classes.chipWrapper}>
                     <div className="recipe-detail-label">Tags:</div> {tagChips}
                  </div>
                  <div style={{marginTop: 16}}>
                     {recipe.description}
                  </div>
                  {content}
               </div>
            </div>
         </div>
      )
   }
}

RecipeDetail.propTypes = {
   id: PropTypes.number.isRequired,
   title: PropTypes.string
}

RecipeDetail.defaultValues = {
   title: ''
}