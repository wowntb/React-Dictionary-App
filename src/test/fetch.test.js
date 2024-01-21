// The API key is not hardcoded because it is sensitive information.
const apiKey = process.env.REACT_APP_WORDS_API_KEY;

export const fetchDefinition = async (searchTerm) => {
  // The API URL is made using the searchTerm.
  const apiUrl = `https://wordsapiv1.p.rapidapi.com/words/${searchTerm}`;

  try {
    // A GET request is made to the API with headers including the API key.
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    });

    // Checks if the response status is OK.
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    // Parses the JSON response and returns the definition.
    const data = await response.json();
    return data.results && data.results[0].definition;
  } catch (error) {
    // This will log and throw any errors that occur during the fetch.
    console.error("Error fetching data:", error);
    throw error;
  }
};

// This is the test for the fetch function.
test("fetches data correctly", async () => {
  // This is a mock of the fetch function.
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: async () => ({
      results: [{ definition: "Mocked definition" }],
    }),
    ok: true,
  });

  // Calls the function that makes the fetch request.
  const definition = await fetchDefinition("example");

  // The test must expect the data returned from the fetch to be a definition which is "Mocked definition".
  expect(definition).toBe("Mocked definition");
});
