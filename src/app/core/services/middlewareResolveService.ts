import middlewares from 'core@/middleware/middlewareBinding.ts'

const resolver = (to,from,next) =>{
    if (to.meta.guards && to.meta.guards.length > 0) {
        to.meta.guards.forEach((guard) => {
            middlewares[guard](to,from,next);
        });
    }
    next()
}

export default resolver;