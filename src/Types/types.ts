export interface Post{
    id?: number
    title: string,
    content: string,
    image: string,
    tags: string[]
    createdAt?: string
    updatedAt?: string
}
export interface PostsState{
   posts: Post[],
    currentPost?: Post,
    status:'idle'| 'loading'|'succeeded'|'failed';
    error: string|null
}
// export interface Tag{
//     name: string
// }