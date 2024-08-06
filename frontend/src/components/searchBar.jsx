import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./searchBar.css";
import Autosuggest from 'react-autosuggest';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (event, { newValue }) => {
    setSearchTerm(newValue);
  };

  const fetchSuggestions = async (value) => {
    const response = await axios.get(`/api/products/search?query=${value}`);
    setSuggestions(response.data.map((product) => product.name));
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const inputProps = {
    placeholder: 'Buscar productos...',
    value: searchTerm,
    onChange: handleSearchChange,
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequest={fetchSuggestions}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={getSuggestionValue}
      inputProps={inputProps}
    />
  );
};

export default SearchBar;