const BaseController = require('./BaseController');

class BookController extends BaseController {
    async getAllBooks() {
        return await this.axiosInstance.get('/BookStore/v1/Books');
    }
    async addBooks(userId, token, isbn) {
    return await this.axiosInstance.post('/BookStore/v1/Books',
            {
                userId: userId, 
                collectionOfIsbns: [
                    { isbn: isbn } 
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    }
    async deleteBookForUser(userId, token, isbn) {
    return await this.axiosInstance.delete('/BookStore/v1/Book', {
        data: 
        {
            isbn: isbn,
            userId: userId
        },
        headers: 
        {
            'Authorization': `Bearer ${token}`
        }
    });
}

}


module.exports = new BookController();
