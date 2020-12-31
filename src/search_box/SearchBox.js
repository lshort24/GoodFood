import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {OutlinedInput, Button, InputAdornment} from "@material-ui/core";
import {Search, Close} from "@material-ui/icons";

// Actions & sagas
import {updateKeywords, getRecipeSummaryRequest} from '../redux/actions/recipes';

const SearchBox = ({
    keywords,
    onChange
}) => {
    const [value, setValue] = useState(keywords);

    const handleKeyPress = (ev) => {
        if (ev.key === 'Enter') {
             ev.preventDefault();
             onChange(value);
        }
    };

    const handleBlur = () => {
        onChange(value);
    };

    const handleKeywordChange = (ev) => {
        setValue(ev.target.value);
    }

    const handleClear = () => {
        setValue('');
        onChange('');
    };

   return (
      <div>
        <OutlinedInput
            aria-label="Search"
            placeholder="Search"
            onChange={handleKeywordChange}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            value={value}
            startAdornment = {(
               <InputAdornment position="start">
                  <Search />
               </InputAdornment>
           )}
           endAdornment = {(
               <InputAdornment position={'end'}>
                   <Button onClick={handleClear}>
                       <Close />
                   </Button>
               </InputAdornment>
           )}
        />
      </div>
   )
}

SearchBox.propTypes = {
    keywords: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
    keywords: '',
}
const mapStateToProps = state => ({
    keywords: state.recipes.keywords,
})

const mapDispatchToProps = dispatch => ({
    onChange: (keywords) => {
        dispatch(updateKeywords(keywords));
        dispatch(getRecipeSummaryRequest(keywords));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);