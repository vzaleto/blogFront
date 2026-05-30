export interface Post{
    id?: number
    title: string,
    content: string,
    image: string,
    categoryId: number,
    tags: Tag[],
    fullContent: {image: string, title: string, description: string}[],
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
    isFiltered: boolean,
}
export interface AdmitToken {
    token: string | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
    isAuth: boolean
}
export interface Category {
    name: string;
    slug: string;
    description: string;
}