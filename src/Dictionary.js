/* Dear code reviewer, I was meant to use the Merriam Webster API but their automated system 
would not allow me to sign up. I contacted a mentor and they allowed me to use an alternative: WordsAPI. */
// This is a React dictionary app. The user can enter a word and receive the definition of it.
// Deployed at https://react-dictionary-7e98d3dd2047.herokuapp.com/
import { useState, useEffect } from "react";
import "./Dictionary.css";
// I have avoided hardcoding my API key and used .env to store it.
const apiKey = process.env.REACT_APP_WORDS_API_KEY;

function Dictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [definitionData, setDefinitionData] = useState(null);
  const [exampleData, setExampleData] = useState(null);

  useEffect(() => {
    if (searchTerm !== "") {
      // Fetch for getting the definition of the word.
      const definitionApiUrl = `https://wordsapiv1.p.rapidapi.com/words/${searchTerm}/definitions`;
      fetch(definitionApiUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((result) => setDefinitionData(result))
        .catch((error) =>
          console.error("Error fetching definition data:", error)
        );

      // Fetch for getting an example of the word in a sentence.
      const exampleApiUrl = `https://wordsapiv1.p.rapidapi.com/words/${searchTerm}/examples`;
      fetch(exampleApiUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((result) => setExampleData(result))
        .catch((error) => console.error("Error fetching example data:", error));
    }
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(document.getElementById("searchInput").value);
  };

  return (
    <>
      <h1>React Dictionary App</h1>
      <div>
        <p style={{ textAlign: "center" }}>
          Would you like the definition and example of a word? Simply type the
          word in the search bar below.
        </p>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            id="searchInput"
            placeholder="Enter a word"
            style={{ width: "400px" }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {definitionData && exampleData && (
        <div className="section">
          <h2>{searchTerm}</h2>
          <p>
            Definition:
            <em>
              {" "}
              {definitionData.definitions &&
                definitionData.definitions[0].definition}
              .
            </em>
          </p>
          <p>
            Example: <em>{exampleData.examples && exampleData.examples[0]}.</em>
          </p>
        </div>
      )}

      <footer>Coded by Nathenale Bedane</footer>
    </>
  );
}

export default Dictionary;
