import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {FormEvent, useEffect, useState} from "react";
import { Tag} from "../../Types/types.ts";
import {useNavigate} from "react-router-dom";

const PostCreate = () => {


    const {token} = useSelector((state:RootState) => state.auth);

    const [inputTitle, setInputTitle] = useState<string>('');
    const [inputContent, setInputContent] = useState<string>('');
    const [inputImage, setInputImage] = useState<string>('');
    const [inputTag, setInputTag] = useState<string>('');
    const [fullContent, setFullContent] = useState<{ image: string; title: string; description: string }[]>([]);
    const [newCard, setNewCard] = useState<{ image: string; title: string; description: string }>({
        image: '',
        title: '',
        description: ''
    });
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token, navigate]);

    const addCard = (e: FormEvent) => {
        e.preventDefault()
        setFullContent([...fullContent, newCard]);
        setNewCard({image: '', title: '', description: ''});
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const post = {
            title: inputTitle,
            content: inputContent,
            fullContent,
            image: inputImage,
            tags: inputTag.split(',').map((tag) => ({
                name: tag.trim()
            })) as Tag[]
        }
        await dispatch(createPost(post)) //1createPost

        setInputImage('');
        setInputContent('');
        setInputTitle('');
        setInputTag('');
        setFullContent([])
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label >
                   <span className="block font-semibold" >Title: </span>
                    <input type='text' value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    <span className="block font-semibold" >Content: </span>
                    <input type='text' value={inputContent} onChange={(e) => setInputContent(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    <span className="block font-semibold"> Image: </span>
                    <input type='text' value={inputImage} onChange={(e) => setInputImage(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    <span className="block font-semibold" >Tags (comma separated): </span>
                    <input type='text' value={inputTag} onChange={(e) => setInputTag(e.target.value)}/>
                </label>
            </div>
            <div>
                <h3>Full</h3>
                <div>
                    <label>
                        <span className="block font-semibold" >Card Image</span>
                        <input type="text" value={newCard.image}
                               onChange={(e) => setNewCard({...newCard, image: e.target.value})} name="" id=""/>
                    </label>
                </div>
                <div>
                    <label>
                        <span className="block font-semibold" >Card title</span>
                        <input type="text" value={newCard.title}
                               onChange={(e) => setNewCard({...newCard, title: e.target.value})} name="" id=""/>
                    </label>
                </div>
                <div>
                    <label>
                        <span className="block font-semibold" >Card description</span>
                        <input type="text" value={newCard.description}
                               onChange={(e) => setNewCard({...newCard, description: e.target.value})} name="" id=""/>
                    </label>
                </div>
                <button className="px-4 py-2 bg-cyan-500 rounded-lg "  onClick={addCard}  > Add card</button>
            </div>
            {fullContent.map((item, index) => (
                <div key={index}>
                    <p>{item.title}</p>
                    <img src={item.image} alt=""/>
                    <p>{item.description}</p>
                </div>
            ))}
            <div>
                <button type="submit" className="px-4 py-2 bg-orange-600 rounded-lg ">Create</button>
            </div>

        </form>
    );
};

export default PostCreate;