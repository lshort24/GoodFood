import React from 'react';
import PropTypes from 'prop-types';
//import { Chip } from '@material-ui/core';
//import TagPicker from '../tag_picker/TagPicker';
import SearchBox from '../search_box/SearchBox';
import { withStyles } from '@material-ui/styles';

const styles = {
   chip: {
      margin: '4px',
   },
   chipWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   filterControl: {
      marginRight: '10px'
   }
};

const SearchBar = (props) => {
   /*
   const handleAddTag = (tag) => {
      const tags = [...props.selectedTags, tag];
      props.onUpdateTags(tags);
   };


   const handleDeleteTag = (tag) => {
      const tags = props.selectedTags.filter(t => t !== tag);
      props.onUpdateTags(tags);
   };
   */

   const handleKeywordChange = (keywords) => {
      props.onUpdateKeywords(keywords);
   };

   const render = () => {
      /*
      const tagChips = props.selectedTags.length === 0
         ? null
         : props.selectedTags.map((tag) => {
            return (
               <Chip
                  onRequestDelete={() => {
                     handleDeleteTag(tag)
                  }}
                  style={styles.chip}
                  key={tag.replace(' ', '')}
               >
                  {tag}
               </Chip>
            )
         });
*/
      return <div>
         <div style={{display: "flex", justifyContent: "space-between"}}>
            {/*
            <TagPicker
               availableTags={props.availableTags}
               onAddTag={handleAddTag}
               style={styles.filterControl}
            />
            */}
            <SearchBox
               onChange={handleKeywordChange}
               value={props.keywords}
            />
         </div>
         {/*
         <div style={styles.chipWrapper}>
            {tagChips}
         </div>
         */}
      </div>
   };

   return render();
};

SearchBar.propTypes = {
   selectedTags: PropTypes.array,
   availableTags: PropTypes.array,
   keywords: PropTypes.string,
   onUpdateTags: PropTypes.func,
   onUpdateKeywords: PropTypes.func
};

export default withStyles(styles) (SearchBar);