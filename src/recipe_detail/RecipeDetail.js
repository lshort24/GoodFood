import React, { Component } from 'react';
import $ from 'jquery';
import { Chip } from 'material-ui';
import './RecipeDetail.css';
import { siteRoot, hostname, version } from '../env';
import { formatBreaks, formatSteps } from '../util';

class RecipeDetail extends Component {
   constructor() {
      super();
      this.state = {
         title: '',
         tags: [],
         description: '',
         ingredients: '',
         directions: ''
      }
   }

   componentDidMount() {
      const id = this.props.match.params.number;

      $.get(`http://${hostname}${siteRoot}services/recipe_detail.php?v=${version}&id=` + id, (response) => {
         this.setState({
            title: response.title,
            tags: response.tags,
            description: response.description,
            ingredients: response.ingredients || '',
            directions: response.directions || ''
         })
      }).fail(() => {
         alert('Could not fetch the recipe list');
      })
   }

   render() {
      const chipStyles = {
         chip: {
            margin: 4,
         },
         wrapper: {
            display: 'flex',
            flexWrap: 'wrap',
         },
      };

      const tagChips = this.state.tags.length >= 0
         ? this.state.tags.map((tag) => {
               return (
                  <Chip style={chipStyles.chip} key={tag.replace(' ', '')} >
                     {tag}
                  </Chip>
               )
           })
         : null;

      const ingredients = this.state.ingredients.length > 0
         ? <div dangerouslySetInnerHTML={{__html: formatBreaks(this.state.ingredients)}} />
         : null;

      const directions = this.state.directions.length > 0
         ? <div dangerouslySetInnerHTML={{__html: formatSteps(this.state.directions)}} />
         : null;

      return (
         <div className="recipe-detail-page">
            <div className="recipe-detail">
               <div className="recipe-detail-title">
                  {this.state.title}
               </div>
               <div style={chipStyles.wrapper} className="recipe-detail-tags recipe-detail-section">
                  <div className="recipe-detail-label">Tags:</div> {tagChips}
               </div>
               <div className="recipe-detail-section">
                  <span className="recipe-detail-label">Description:</span> {this.state.description}
               </div>
               <div className="recipe-detail-section">
                  <div className="recipe-detail-label">Ingredients:</div>
                  {ingredients}
               </div>
               <div className="recipe-detail-section">
                  <div className="recipe-detail-label">Directions:</div>
                  {directions}
               </div>
            </div>
         </div>
      )
   }
}

export default RecipeDetail;