import middlewares from 'core@/middleware/middlewareBinding.ts'

const resolver =async (to,from,next) =>{
    if (to.meta.guards && to.meta.guards.length > 0) {
        let isPassed = true;
        await to.meta.guards.forEach(async (guard) => {
            let result = await middlewares[guard](to,from,next);
            if(result != 'passed'){
                isPassed = false;
                return next(result)
            }
        });
        if(isPassed){
            next()
        }
    }else{
        next()
    }
}

export default resolver;