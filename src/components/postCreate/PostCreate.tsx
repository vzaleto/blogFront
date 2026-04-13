import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {FormEvent, useEffect, useState} from "react";
import {Tag} from "../../Types/types.ts";
import {useNavigate} from "react-router-dom";
import {createPost} from "../../features/postSlise/postSlice.ts";

const PostCreate = () => {


    const {token} = useSelector((state: RootState) => state.auth);

    const [inputTitle, setInputTitle] = useState<string>('');
    const [inputContent, setInputContent] = useState<string>('');
    const [inputImage, setInputImage] = useState<File | null>(null);
    const [inputTag, setInputTag] = useState<string>('');
    const [fullContent, setFullContent] = useState<{ image: File | null; title: string; description: string }[]>([]);

    const [newCard, setNewCard] = useState<{ image: File | null; title: string; description: string }>({
        image: null,
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
        setNewCard({image: null, title: '', description: ''});
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', inputTitle);
        formData.append('content', inputContent);

        if (inputImage) {
            console.log(inputImage)
            formData.append('image', inputImage);
        }

        formData.append('fullContent', JSON.stringify(fullContent.map(({title, description}) => ({
            title,
            description
        }))));

        fullContent.forEach((elem) => {
            if (elem.image) {
                console.log(elem.image)
                formData.append('cardImage', elem.image)
            }
        });

        formData.append('tags', JSON.stringify(inputTag.split(',').map((tag) => ({
                    name: tag.trim()
                })
            )
        ));

        await dispatch(createPost(formData)) //1createPost

        setInputImage(null);
        setInputContent('');
        setInputTitle('');
        setInputTag('');
        setFullContent([])
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="block font-semibold" htmlFor="title">Title: </label>
                <input type='text' value={inputTitle} placeholder='Title' className="w-full p-2 border rounded"
                       id="title" onChange={(e) => setInputTitle(e.target.value)}/>
            </div>
            <div>
                <label className="block font-semibold" htmlFor="content">Content: </label>
                <input type='text' value={inputContent} placeholder="Content" className="w-full p-2 border rounded"
                       id="content" onChange={(e) => setInputContent(e.target.value)}/>
            </div>
            <div>
                <label className="block font-semibold" htmlFor="image"> Image: </label>
                <input type='file' placeholder="Image URL" className="w-1/2 p-2 border rounded" id="image"
                       onChange={(e) => setInputImage(e.target.files?.[0] || null)}/>
                {
                    inputImage && (
                        <img src={URL.createObjectURL(inputImage)} className="w-40 h-28 object-cover rounded-lg"/>
                    )

                }

            </div>
            <div>
                <label className="block font-semibold" htmlFor="tag">Tags (comma separated): </label>
                <input type='text' value={inputTag} placeholder="Tags" id="tag" className="w-full p-2 border rounded"
                       onChange={(e) => setInputTag(e.target.value)}/>
            </div>
            <div className="m-4 rounded shadow-lg p-4">
                <h3>Full</h3>
                <div>
                    <label className="block font-semibold" htmlFor="cardImage">Card Image</label>
                    <input type="file" placeholder="Image" className="w-full p-2 border rounded"
                           onChange={(e) => setNewCard({...newCard, image: e.target.files?.[0] || null})} name=""
                           id="cardImage"/>
                    {newCard.image && (
                        <img src={URL.createObjectURL(newCard.image)} className="w-40 h-28 object-cover rounded-lg"/>
                    )}
                </div>
                <div>
                    <label className="block font-semibold" htmlFor="cardTitle">Card title</label>
                    <input type="text" value={newCard.title} placeholder="Title" className="w-full p-2 border rounded"
                           onChange={(e) => setNewCard({...newCard, title: e.target.value})} name="" id="cardTitle"/>
                </div>
                <div>
                    <label className="block font-semibold" htmlFor="cardDescription">Card description</label>
                    <input type="text" value={newCard.description} placeholder="Title"
                           className="w-full p-2 border rounded"
                           onChange={(e) => setNewCard({...newCard, description: e.target.value})} name="" id=""/>
                </div>
                <button type="button" className="w-full py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 mt-4"
                        onClick={addCard}>Add card
                </button>
            </div>
            {fullContent.map((item, index) => (
                <div key={index}>
                    <p>{item.title}</p>
                    {
                        item.image && (
                            <img src={URL.createObjectURL(item.image)} className="w-40 h-28 object-cover rounded-lg"/>
                        )
                    }
                    <p>{item.description}</p>
                </div>
            ))}
            <div>
                <button type="submit" className="w-full py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">Create
                    Post
                </button>
            </div>

        </form>
    );
};

export default PostCreate;
