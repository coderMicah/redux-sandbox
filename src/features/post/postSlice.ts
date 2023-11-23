import { PayloadAction, createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import axios from "axios";
import { sub } from "date-fns";
// import { sub } from "date-fns";

export interface Post {
    id: string;
    title: string;
    body: string;
    userId: string;
    date: string;
    reactions: Reaction
}

export interface Data {
    posts: Post[],
    status: Status,
    error: string;
}

export interface Reaction {
    thumbsUp: number, hooray: number, heart: number, rocket: number, eyes: number
}

type Status = "loading" | "idle" | "succeeded" | "failed"

const URL = "https://jsonplaceholder.typicode.com/posts"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try {
        const response = await axios.get(URL);
        return [...response.data]
    } catch (err: unknown) {
        return err.message
    }
})
export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost: { title: string, body: string, userId: string }) => {
    try {
        const response = await axios.post(URL, initialPost);
        return response.data
    } catch (err: unknown) {
        return err.message
    }
})

const initialState: Data = {
    posts: [],
    status: "idle",
    error: "null"
}


// initial state as local state
// const initialState: Post[] = [
//     { id: '1', title: 'First Post!', body: 'Hello!', userId: "", date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
//     { id: '2', title: 'Second Post', body: 'More text', userId: "", date: sub(new Date(), { minutes: 5 }).toISOString(), reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } }
// ]


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<Post>) => {
                state.posts.push(action.payload)
            },
            prepare: (title: string, body: string, userId: string) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
                        date: new Date().toISOString(),
                        userId,
                        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }

                    }
                }
            }
        },
        reactionAdded: (state, action: PayloadAction<{ postId: string; reaction: keyof Reaction }>) => {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let min: number = 1
                const loadedPosts: Post[] = action.payload.map((post: Post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString(),
                        post.reactions = { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
                    return post
                })
                // state.posts = state.posts.concat(loadedPosts)
                state.posts = loadedPosts
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId),
                    action.payload.date = new Date().toISOString(),
                    action.payload.reactions = { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
                console.log(action.payload);
                state.posts.push(action.payload)
            })
    }
},
)

export const selectAllPost = (state: RootState) => state.posts.posts
export const getPostStatus = (state: RootState) => state.posts.status
export const getPostError = (state: RootState) => state.posts.error
export const getPostById = (state:RootState,postId:string) => state.posts.posts.find(post => post.id == postId)
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer