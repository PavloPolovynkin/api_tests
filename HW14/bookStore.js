const axios = require("axios").default;

// returned list of all books if status 200
async function getBooks() {
    try {
        const response = await axios.get('https://bookstore.toolsqa.com/BookStore/v1/Books');
        if (response.status !== 200) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error("Error in getBooks:", error.message);
        throw error;
    }
}

module.exports = { getBooks };
