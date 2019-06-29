import React, { Component } from 'react';
import { Chip } from 'material-ui';
import { markdown } from 'markdown';

import './RecipeDetail.css';
import { siteRoot, hostname, version } from '../env';
import { formatBreaks, formatSteps } from '../util';
import injectSheet from 'react-jss'

const styles = {
   photo: {
      float: 'right',
      width: 300,
      marginLeft: 20,
      marginBottom: 20,
      borderRadius: 10
   }
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

   componentDidMount() {
      const id = this.props.match.params.number;

      const url = `http://${hostname}${siteRoot}services/recipe_detail.php?v=${version}&id=${id}`;
      console.log('url ', url);
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

      const photoBaseUrl = 'http://shortsrecipes.com/photos/';
      const photo = this.state.photo.length > 0
         ? <img src={`${photoBaseUrl}/${this.state.photo}`} alt="" className={this.props.classes.photo}/>
         : null;

      let ingredients = this.state.ingredients.length > 0
         ? <div dangerouslySetInnerHTML={{__html: formatBreaks(this.state.ingredients)}} />
         : null;

      let directions = this.state.directions.length > 0
         ? <div dangerouslySetInnerHTML={{__html: formatSteps(this.state.directions)}} />
         : null;

      let content = null;
      if (this.state.markdown.length > 0) {
         content = (
            <div className="recipe-detail-section">
               <div className="recipe-detail-label">Directions:</div>
               <div dangerouslySetInnerHTML={{__html: markdown.toHTML(this.state.markdown)}} className="markdown"/>
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
                  {this.state.title}
               </div>
               <div style={chipStyles.wrapper} className="recipe-detail-tags recipe-detail-section">
                  <div className="recipe-detail-label">Tags:</div> {tagChips}
               </div>
               <div className="recipe-detail-section">
                  {photo}
                  <span className="recipe-detail-label">Description:</span> {this.state.description}
               </div>
               {content}
            </div>
         </div>
      )
   }
}

export default injectSheet(styles)(RecipeDetail);