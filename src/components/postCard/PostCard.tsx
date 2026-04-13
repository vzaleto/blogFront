import {FC} from 'react';
import { Post, Tag } from "../../Types/types";
import {Link} from "react-router-dom";

interface PostCardProps  {
    elem: Post
}

const PostCard:FC<PostCardProps> = ({elem}) => {
    console.log(elem)
    return (
        <div  key={elem.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 mb-6" >
            <span>{new Date(elem.createdAt || '').toLocaleDateString()}</span>
            <h2 className="text-2xl font-semibold mb-3" >{elem.title}</h2>
            <div className="flex justify-between flex-wrap">
                <div className="flex gap-4">
                    <img src={`http://localhost:3000/uploads/${elem.image}`} alt=""  className="w-40 h-28 object-cover rounded-lg" />
                </div>
                <div className="text-gray-600 text-sm line-clamp-3" >{elem.content}</div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4" >
                <h4 className='m-0'>Tags:</h4>
                {
                    elem.tags && elem.tags.length ?
                        elem.tags.map((tag: Tag) => (
                            <div key={tag.id} className="text-xs bg-gray-200 px-2 py-1 rounded" >{tag.name}</div>
                        )) : <p>"no tags"</p>
                }
            </div>

                <Link to={`/post/${elem.id}`} type='button' className="inline-block mt-4 text-cyan-600 font-medium hover:underline" > learn more →</Link>
        </div>
    );
};

export default PostCard;