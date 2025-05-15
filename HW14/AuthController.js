const BaseController = require('./BaseController');

class AuthController extends BaseController {
    async generateToken(username, password) {
        return await this.axiosInstance.post('/Account/v1/GenerateToken', {
            userName: username, 
            password: password
        })
    }
    async login(username, password, token) {
        // const response = await AuthController.GenerateToken();
        // const token = response.data.token;
        return await this.axiosInstance.post('/Account/v1/Login', {
            userName: username, 
            password: password,
            token: token  
        })
    }
    async userExist(username, password, userId, token) {
        return await this.axiosInstance.post('/Account/v1/User', {
            userName: username,
            password: password, 
            userId: userId,
            token: token  
        })
    }
}

module.exports = new AuthController();