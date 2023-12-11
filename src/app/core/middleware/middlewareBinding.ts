import LoginMiddleware from 'core@/middleware/loginMiddleware'
import DealerMiddleware from 'core@/middleware/dealerMiddleware'

const middlewares = {
    "Login"  : LoginMiddleware,
    "Dealer" : DealerMiddleware
}

export default  middlewares;