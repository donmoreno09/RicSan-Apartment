/**
 * SearchBar Component (Molecule)
 * 
 * Search input with button using Tailwind CSS.
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';

const SearchBar = ({ onSearch, placeholder = 'Search apartments...' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex gap-4 w-full max-w-2xl flex-col sm:flex-row"
    >
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" variant="primary" size="medium">
        Search
      </Button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: 'Search apartments...',
};

export default SearchBar;
