import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchPosts} from "../../features/postSlise/postSlice.ts";
import {Tag} from "../../Types/types.ts";

const PostsGetAll = () => {

    const {posts, status}  = useSelector((state:RootState)=> state.posts); // 4

    const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchPosts())//1
        }
    }, [ dispatch,status]);



    return (
      <div>
          {
              posts.length ? // 5
              posts.map((elem)=>(
                  <div key={elem.id}>
                      <div>{elem.title}</div>
                      <div>{elem.content}</div>
                      <div>{elem.image}</div>
                      <div>
                          <h4 className='m-0' >Tags:</h4>
                          {
                              elem.tags && elem.tags.length ?

                                  elem.tags.map((tag: Tag) => (


                                          <div key={tag.id}>{tag.name}</div>

                                  ))

                                  : <p>"no tags"</p>

                          }
                      </div>
                          <button type='button'> learn more</button>
                      </div>
                      )) : <p>"no posts"</p>
                      }
                  </div>
              );
};

export default PostsGetAll;