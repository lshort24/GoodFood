import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, Chip } from 'material-ui';

class SearchBar extends Component {
   constructor() {
      super();
      this.state = {
         searchText: '',
         selectedTags: []
      }
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

      const tagChips = this.state.selectedTags.length === 0
         ? null
         : this.state.selectedTags.map((tag) => {
            return (
               <Chip onRequestDelete={() => {
                        this.deleteTag(tag)
                     }}
                     style={chipStyles.chip}
                     key={tag.replace(' ', '')}
               >
                  {tag}
               </Chip>
            )
         });

      return(
         <div>
            <div>
               <AutoComplete
                  searchText={this.state.searchText}
                  floatingLabelText="Filter by tag"
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.props.tagList}
                  onUpdateInput={this.handleUpdateInput}
                  onNewRequest={this.handleNewRequest}
               />
            </div>
            <div style={chipStyles.wrapper}>
               {tagChips}
            </div>
         </div>
      )
   }

   handleUpdateInput = (searchText) => {
      this.setState({
         searchText: searchText,
      });
   };

   handleNewRequest = (tag) => {
      const tags = [...this.state.selectedTags, tag];

      this.setState({
         searchText: '',
         selectedTags: tags
      });

      this.props.onUpdate(tags);
   };

   deleteTag(tag) {
      const tags = this.state.selectedTags.filter(t => t !== tag);
      this.setState({
         selectedTags: tags
      });
      this.props.onUpdate(tags);
   }
}

SearchBar.propTypes = {
   tagList: PropTypes.array,
   onUpdate: PropTypes.func
};

export default SearchBar;