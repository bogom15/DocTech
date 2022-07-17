import React from "react";
import { useState } from "react";

const AutoComplete = () => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");
    const [IsHovering, setIsHovering] = useState(false);
    const medication = require('../medication.json');
  
  
  
    const onChange = (e: any) => {
      const userInput = e.target.value;
  
      const unLinked = medication.filter(
        (medication: any) =>
          medication.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
  
      setInput(e.target.value);
      setFilteredSuggestions(unLinked);
      setActiveSuggestionIndex(0);
      setShowSuggestions(true);
    };
  
    const onClick = (e: any) => {
      setFilteredSuggestions([]);
      setInput(e.target.innerText);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    };
    const SuggestionsListComponent = () => {
      return filteredSuggestions.length ? (
        <ul className="suggestions">
          {filteredSuggestions.map((medication:any, index) => {
            let className;
           
            if (index === activeSuggestionIndex) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={medication} onClick={onClick}  
              onMouseOver={() => setInput(filteredSuggestions[index]['name'])}>
  
                {medication.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="no-suggestions">
          <em>No suggestions for your current search</em>
        </div>
      );
    };
    const onKeyDown = (key: any) => {
      if (key.keyCode === 13 || key.keyCode === 9) {
        setInput(filteredSuggestions[activeSuggestionIndex]);
        setFilteredSuggestions([]);
      }
    };
  
    const handleClick = () => {
      setFilteredSuggestions([]);
      setInput('');
    }
    return (
      <>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
         
          value={input}
        />
      
        <button onClick={handleClick}>Clear</button>
        {showSuggestions && input && <SuggestionsListComponent />}
      </>
    );
  };

  export default AutoComplete;