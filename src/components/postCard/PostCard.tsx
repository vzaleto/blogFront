import {FC} from 'react';
import {Post, Tag} from "../../Types/types";
import {Link} from "react-router-dom";

interface PostCardProps {
    elem: Post
}

const PostCard: FC<PostCardProps> = ({elem}) => {
    console.log(elem);
    return (
        <div key={elem.id}
             className="card relative border border-r-amber-950 border-b-amber-950 hover:shadow-lg transition p-6 mb-6 group ">
            {/*<div className="absolute inset-0 bg-gradient-to-t from-amber-300/70 to-transparent"></div>*/}
            <span>{new Date(elem.createdAt || '').toLocaleDateString()}</span>
            <div className="relative z-1">
                <h2 className="mb-3 mt-3">{elem.title}</h2>
                <div className="flex gap-3">
                    <div className="flex gap-1 border  border-amber-800  p-2 rounded-lg w-1/3">
                        <img src={`http://localhost:3000/uploads/${elem.image}`} alt=""
                             className="w-full h-28 object-cover rounded-lg  grayscale group-hover:grayscale-0"/>
                    </div>
                        <p className="item-post text-gray-600 text-lg line-clamp-4 mt-2 ml-4 w-2/3">{elem.content}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {/*<h4 className='m-0'>Tags:</h4>*/}
                    {
                        elem.tags && elem.tags.length ?
                            elem.tags.map((tag: Tag) => (
                                <div key={tag.id} className="text-xs bg-gray-200 px-2 py-1 rounded">{tag.name}</div>
                            )) : <p className="item-teg">"no tags"</p>
                    }
                </div>

                <Link to={`/post/${elem.id}`} type='button'
                      className="inline-block mt-4 text-red-700 font-medium text-sm"> learn more →</Link>
            </div>
        </div>
    )
        ;
};

export default PostCard;