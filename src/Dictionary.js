/* Dear code reviewer, I was meant to use the Merriam Webster API but their automated system 
would not allow me to sign up. I contacted a mentor and they allowed me to use an alternative: WordsAPI. */
// This is a React dictionary app. The user can enter a word and receive the definition of it.
import { useState, useEffect } from "react";
import "./Dictionary.css";
// I have avoided hardcoding my API key and used .env to store it.
const apiKey = process.env.REACT_APP_WORDS_API_KEY;

function Dictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);

  // useEffect is being utilised so that when the state of searchTerm is altered the program fetches data from the API again.
  useEffect(() => {
    if (searchTerm !== "") {
      const apiUrl = `https://wordsapiv1.p.rapidapi.com/words/${searchTerm}`;

      fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
      })
        // The response is parsed to JSON.
        .then((response) => response.json())
        // The JSON is saved in state.
        .then((result) => setData(result))
        // This is a line for catching an with the fetch.
        .catch((error) => console.error("Error fetching data:", error));
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
          Would you like the definition of a word? Simply type the word in the
          search bar below.
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
      {data && (
        <div className="section">
          <h2>{searchTerm}</h2>
          <p>
            Definition: <em>{data.results && data.results[0].definition}.</em>
          </p>
        </div>
      )}

      <footer>Coded by Nathenale Bedane</footer>
    </>
  );
}

export default Dictionary;
