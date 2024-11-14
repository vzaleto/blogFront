
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {FormEvent, useState} from "react";
import {createPost} from "../../features/postSlise/postSlice.ts";
import {Tag} from "../../Types/types.ts";

const PostCreate = () => {

const [inputTitle, setInputTitle] = useState<string>('');
const [inputContent, setInputContent] = useState<string>('');
const [inputImage, setInputImage] = useState<string>('');
const [inputTag, setInputTag] = useState<string>('');
const [inputFullContent, setInputFullContent] = useState<string>('');


const dispatch:AppDispatch = useDispatch();

const handleSubmit = async (e: FormEvent)=>{
    e.preventDefault()
    const post = {
        title: inputTitle,
        content: inputContent,
        fullContent: inputFullContent,
        image: inputImage,
        tags: inputTag.split(',').map((tag) => ({
            name: tag.trim()
        })) as Tag[]
    }
    console.log(post)
    await dispatch(createPost(post)) //1createPost

    setInputImage('');
    setInputContent('');
    setInputTitle('');
    setInputTag('');
}
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Title
                    <input type='text' value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Content
                    <input type='text' value={inputContent} onChange={(e) => setInputContent(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Image
                    <input type='text' value={inputImage} onChange={(e) => setInputImage(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Tags (comma separated)
                    <input type='text' value={inputTag} onChange={(e) => setInputTag(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Description
                    <input value={inputFullContent} onChange={(e) => setInputFullContent(e.target.value)}/>
                </label>
            </div>

            <div>
                <button type="submit">Create</button>
            </div>

        </form>
    );
};

export default PostCreate;