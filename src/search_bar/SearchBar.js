import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'material-ui';
import TagPicker from '../tag_picker/TagPicker';
import SearchBox from '../search_box/SearchBox';
import muiThemeable from 'material-ui/styles/muiThemeable';

const SearchBar = (props) => {
   const handleAddTag = (tag) => {
      const tags = [...props.selectedTags, tag];
      props.onUpdateTags(tags);
   };

   const handleDeleteTag = (tag) => {
      const tags = props.selectedTags.filter(t => t !== tag);
      props.onUpdateTags(tags);
   };

   const handleKeywordChange = (keywords) => {
      props.onUpdateKeywords(keywords);
   };


   const render = () => {
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

      return <div>
         <div>
            <TagPicker
               availableTags={props.availableTags}
               onAddTag={handleAddTag}
               style={styles.filterControl}
            />
            <SearchBox
               onChange={handleKeywordChange}
               value={props.keywords}
            />
         </div>
         <div style={styles.chipWrapper}>
            {tagChips}
         </div>
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

export default muiThemeable() (SearchBar);