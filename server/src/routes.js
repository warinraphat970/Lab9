const UserAuthenController = require('./controllers/UserAuthenController')

module.exports = (app) => {
    // ... routes เดิม
    app.post('/login', UserAuthenController.login)
    app.post('/register', UserAuthenController.register)
}