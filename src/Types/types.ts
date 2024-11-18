export interface Post{
    id?: number
    title: string,
    content: string,
    image: string,
    tags: Tag[]
    createdAt?: string
    updatedAt?: string
}

export interface Tag{
    id?: number
    name: string
}
export interface PostsState{
    posts: Post[],
    currentPost?: Post,
    status:'idle'| 'loading'|'succeeded'|'failed';
    error: string|null,
    isFiltered: boolean
}
// export interface Tag{
//     name: string
// }