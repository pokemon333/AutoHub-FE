import LoginMiddleware from 'core@/middleware/loginMiddleware.ts'
// import DealerMiddleware from 'core@/middleware/dealerMiddleware'
import AuthMiddleware from 'core@/middleware/authMiddleware.ts'

const middlewares = {
    "Login"  : LoginMiddleware,
    // "Dealer" : DealerMiddleware,
    "Auth"   : AuthMiddleware
}

export default  middlewares;