import resolver from 'core@/services/middlewareResolveService.ts'
import { useSeoMeta } from '@unhead/vue'
import LinkPreview from 'asset@/img/link-preview.jpg'

const initMiddleWare = (router) => {
    router.beforeEach((to, from , next ) => {
        useSeoMeta({ 
            ogTitle :"AutoHub Myanamr" ,
            ogImage: LinkPreview,
            ogDescription: 'One Stop Car Sales' ,
        })
        resolver(to,from,next)
    })
}

export default initMiddleWare;