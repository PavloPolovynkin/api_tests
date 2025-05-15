const axios = require("axios").default;
const { getBooks }= require('./bookStore.js'); 
const BookController = require('./BooksController.js')
const AuthController = require('./AuthController.js')

let token;
let userId;
let username = "testUno";
let password = "Jbw5FS2$czhH@7L";
let isbn;

//first test just for fun. 
test('Get all books [/BookStore/v1/Books] and verify status,title | we use getBooks() from bookStore.js', async () => {
    const response = await getBooks();
    const responseData = response.data;

    //respons status
    expect(response.status).toBe(200);
    expect(responseData.books[0].title).toBe('Git Pocket Guide')
    //console.log(responseData.books[0].title)
    expect(responseData).toBeDefined();    
})

test('Get 1st books from BookStore [/BookStore/v1/Books] and verify status,author and isbn | we use BookController', async () => {
    const response = await BookController.getAllBooks();
    const responseData = response.data;

    //respons status
    expect(response.status).toBe(200);
    expect(responseData.books[0].author).toBe('Richard E. Silverman')
    isbn = responseData.books[0].isbn;
    console.log(`isbn of 1st book: ${isbn}`)
})

test('GenerateToken [/Account/v1/GenerateToken]', async () => {
    const response = await AuthController.generateToken(username, password);
    // const responseData = response.data;
    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
    console.log(`token: ${response.data.token}`)
    token = response.data.token;
})

test('Login [/Account/v1/Login]', async () => {    
    const response = await AuthController.login(username, password, token);
    expect(response.status).toBe(200);
    userId = response.data.userId;
    console.log(`userId: ${userId}`);
})
//just verify that user is exist
test('userExist? [/Account/v1/User]', async () => {    
    const response = await AuthController.userExist(username, password, token);
    // const responseData = response.data;
    expect(response.status).toBe(406);
    expect(response.data.message).toBe("User exists!");
    expect(response.data.code).toBe("1204");
    console.log(`userExist? - ${response.data.message}`);    
})

test('Add 1st book from the BookStore and verify that this book was added[/BookStore/v1/Books]', async () => {  
    const responseToken = await AuthController.generateToken(username, password);
    const onlyToken = responseToken.data.token; 
    const response = await BookController.addBooks(userId, onlyToken, isbn);
    const responseAllBooks = await BookController.getAllBooks();
    expect(response.status).toBe(201);
    expect(responseAllBooks.status).toBe(200);
    expect(response.data.books[0].isbn).toBe(isbn)
    expect(responseAllBooks.data.books[0].isbn).toBe(isbn)
    console.log(`Added book: ispn - ${response.data.books[0].isbn}, title - '${responseAllBooks.data.books[0].title}'`)
})

test('Delete all books [/BookStore/v1/Book]', async () => {  
    //used this again
    const responseToken = await AuthController.generateToken(username, password);
    const token = responseToken.data.token;
    const response = await BookController.deleteBookForUser(userId, token, isbn);
    console.log("Book is deleted. Status:", response.status);
    expect(response.status).toBe(204);
});








