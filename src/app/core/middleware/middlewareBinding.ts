import LoginMiddleware from 'core@/middleware/loginMiddleware.ts'
import AuthMiddleware from 'core@/middleware/authMiddleware.ts'
import DealerAcceptMiddleware from 'core@/middleware/dealerAcceptMiddleware.ts'

const middlewares = {
    "Login"  : LoginMiddleware,
    "Auth"   : AuthMiddleware,
    'DealerAccept' : DealerAcceptMiddleware
}

export default  middlewares;