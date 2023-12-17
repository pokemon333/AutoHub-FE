import resolver from 'core@/services/middlewareResolveService.ts'
const initMiddleWare = (router) => {
    router.beforeEach((to, from , next ) => {
        resolver(to,from,next)
    })
}

export default initMiddleWare;