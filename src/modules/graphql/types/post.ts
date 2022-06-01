import { extendType } from 'nexus';


export const createPost = extendType({
    type:'Mutation',
    definition(t) {
        t.field('createPost', {
            type: null,
            args: null,
            resolve:
        })
    },
})