import {FC} from 'react';
import { Post, Tag } from "../../Types/types";
import {Link} from "react-router-dom";

interface PostCard  {
    elem: Post
}

const PostCard:FC<PostCard> = ({elem}) => {
    return (
        <div  key={elem.id} className="mt-14 max-w-3xl mx-auto shadow-lg shadow-cyan-500/50 p-6" >
            <span>{elem.id}</span>
            <h2 className="font-light text-3xl text-cyan-500 mb-4" >{elem.title}</h2>
            <div className="flex justify-between flex-wrap">
                <div className="w-2/4">
                    <img src={elem.image} alt=""/>
                </div>
                <div className="font-light w-2/4 pl-3.5 text-sm" >{elem.content}</div>
            </div>

            <div>
                <h4 className='m-0'>Tags:</h4>
                {
                    elem.tags && elem.tags.length ?
                        elem.tags.map((tag: Tag) => (
                            <div key={tag.id}>{tag.name}</div>
                        )) : <p>"no tags"</p>
                }
            </div>

                <Link to={`/post/${elem.id}`} type='button' className="bg-orange-500 block text-center py-3 text-indigo-700" > learn more</Link>
        </div>
    );
};

export default PostCard;