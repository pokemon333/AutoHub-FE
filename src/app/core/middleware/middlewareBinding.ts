import LoginMiddleware from 'core@/middleware/loginMiddleware'
// import DealerMiddleware from 'core@/middleware/dealerMiddleware'
import AuthMiddleware from 'core@/middleware/authMiddleware'

const middlewares = {
    "Login"  : LoginMiddleware,
    // "Dealer" : DealerMiddleware,
    "Auth"   : AuthMiddleware
}

export default  middlewares;