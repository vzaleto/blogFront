import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {FormEvent, useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {createPost, fetchPostUpdate} from "../../features/postSlise/postSlice.ts";
import {CategoryCreate} from "../categoryCreate/CategoryCreate.tsx";
import {CategoryGetAll} from "../categoryGetAll/CategoryGetAll.tsx";
import {Post} from "../../Types/types.ts";
import {resetSuccess} from "../../features/categorySlice/categorySlice.ts";

type FullContentItem = {
    image: File | string | null;
    title: string;
    description: string;
}

const inputClass = "w-full rounded-md border border-stone-300 bg-stone-50 px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-200";
const buttonClass = "rounded-md bg-stone-950 px-5 py-3 text-base font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2";
const secondaryButtonClass = "rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-stone-800 transition hover:border-amber-700 hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-200";
const dangerButtonClass = "rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold uppercase tracking-wide text-red-700 transition hover:border-red-400 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200";

const PostCreate = ({initialData}: {initialData?: Post}) => {

    const {token} = useSelector((state: RootState) => state.auth);

    const [selectedCategory, setSelectedCategory] = useState<number | "">("");
    const [inputTitle, setInputTitle] = useState<string>('');
    const [inputContent, setInputContent] = useState<string>('');
    const [inputImage, setInputImage] = useState<File | string | null>(null);
    const [inputTag, setInputTag] = useState<string>('');
    const [fullContent, setFullContent] = useState<FullContentItem[]>([]);
    const [editCardIndex, setEditCardIndex] = useState<number | null>(null);

    const [newCard, setNewCard] = useState<FullContentItem>({
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

    useEffect(() => {
        if (initialData) {
            setSelectedCategory(initialData.categoryId);
            setInputTitle(initialData.title);
            setInputContent(initialData.content);
            setInputImage(initialData.image);
            setInputTag(initialData.tags.map((tag) => tag.name).join(','));
            setFullContent(initialData.fullContent.map(({title, description, image}) => ({
                title,
                description,
                image
            })));
        }
    }, [initialData])

    const addCard = (e: FormEvent) => {
        e.preventDefault()
        if(editCardIndex !== null ){
            const updateCard = [...fullContent];
            updateCard[editCardIndex] = newCard;
            setFullContent(updateCard);
            setEditCardIndex(null);
        }else{
            setFullContent([...fullContent, newCard]);
        }

        setNewCard({image: null, title: '', description: ''});
    }

    const removeCard = (index: number) => {
        setFullContent((currentCards) => currentCards.filter((_, cardIndex) => cardIndex !== index));

        if (editCardIndex === index) {
            setEditCardIndex(null);
            setNewCard({image: null, title: '', description: ''});
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('categoryId', String(selectedCategory));
        formData.append('title', inputTitle);
        formData.append('content', inputContent);

        if (inputImage instanceof File) {
            formData.append('image', inputImage);
        }

        formData.append('fullContent', JSON.stringify(fullContent.map((elem) => ({
            title:elem.title,
            description:elem.description,
            image:elem.image instanceof File ? "_NEW_IMAGE_" : elem.image
        }))));

        fullContent.forEach((elem) => {
            if (elem.image instanceof File) {
                formData.append('cardImage', elem.image);
            }
        });

        formData.append('tags', JSON.stringify(inputTag.split(',').map((tag) => ({
                    name: tag.trim()
                })
            )
        ));

        if(initialData?.id){
           await dispatch(fetchPostUpdate({id: initialData.id, formData}))
        }else{
            await dispatch(createPost(formData))
        }

        setInputImage(null);
        setInputContent('');
        setInputTitle('');
        setInputTag('');
        setFullContent([])

        dispatch(resetSuccess())
    }

    const handleEditCard = (index: number) => {
        setNewCard(fullContent[index]);
        setEditCardIndex(index);
    };

    return (
        <div className="space-y-8">
            <form onSubmit={handleSubmit} className="rounded-lg border border-stone-300 bg-white/80 p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-stone-200 pb-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                            {initialData ? 'Edit post' : 'New post'}
                        </p>
                        <h1 className="mt-1 text-xl font-bold uppercase text-stone-900">Post</h1>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-900">
                        {initialData ? 'Update' : 'Create'}
                    </span>
                </div>

                <div className="mb-5">
                    <label className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-600" htmlFor="title">Title</label>
                    <input type='text' value={inputTitle} placeholder='Post title'
                           className={inputClass}
                           id="title" onChange={(e) => setInputTitle(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-600" htmlFor="content">Content</label>
                    <textarea value={inputContent} placeholder="Post introduction" className={`${inputClass} min-h-36 resize-y`} id="content" onChange={(e) => setInputContent(e.target.value)}></textarea>
                </div>
                <div className="mb-5">
                    <label className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-600" htmlFor="image">Image</label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <input type='file' className="text-base text-stone-700" id="image"
                               onChange={(e) => setInputImage(e.target.files?.[0] || null)}/>
                        {
                            inputImage && (
                                <img src={typeof inputImage === 'string' ? `http://localhost:3000/uploads/${inputImage}` : URL.createObjectURL(inputImage)}
                                     className="h-28 w-40 rounded-md border border-stone-200 object-cover"/>
                            )
                        }
                    </div>
                </div>
                <div className="mb-5">
                    <label className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-600" htmlFor="tag">Tags</label>
                    <input type='text' value={inputTag} placeholder="Tags (comma separated)" id="tag"
                           className={inputClass}
                           onChange={(e) => setInputTag(e.target.value)}/>
                </div>
                <CategoryGetAll selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

                <div className="mb-5 rounded-lg border border-stone-300 bg-white/80 p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Post body</p>
                            <h3 className="mt-1 text-lg font-bold uppercase text-stone-900">Full content</h3>
                        </div>
                        <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-bold text-stone-700">{fullContent.length}</span>
                    </div>
                    <div className="mb-5">
                        <label className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-600" htmlFor="cardImage">Card image</label>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <input type="file" className="text-base text-stone-700"
                                   onChange={(e) => setNewCard({...newCard, image: e.target.files?.[0] || null})}
                                   name=""
                                   id="cardImage"/>
                            {newCard.image && (
                                <img src={typeof newCard.image === 'string' ? `http://localhost:3000/uploads/${newCard.image}` :  URL.createObjectURL(newCard.image)}
                                     className="h-28 w-40 rounded-md border border-stone-200 object-cover"/>
                            )}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-600" htmlFor="cardTitle">Card title</label>
                        <input type="text" value={newCard.title} placeholder="Title"
                               className={inputClass}
                               onChange={(e) => setNewCard({...newCard, title: e.target.value})} name=""
                               id="cardTitle"/>
                    </div>
                    <div className="mb-5">
                        <label className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-600" htmlFor="cardDescription">Card description</label>
                        <textarea value={newCard.description} placeholder="Description" id="cardDescription" className={`${inputClass} min-h-32 resize-y`} onChange={(e) => setNewCard({...newCard, description: e.target.value})}></textarea>
                    </div>
                    <button type="button" className={`${buttonClass} w-full`} onClick={addCard}>
                        {editCardIndex !== null ? 'Update card' : 'Add card'}
                    </button>
                </div>

                {fullContent.length > 0 && (
                    <div className="mb-5 space-y-3">
                        {fullContent.map((item, index) => (
                            <div key={index} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                                <div className="flex flex-col gap-4 sm:flex-row">
                            {
                                item.image && (
                                            <img src={typeof item.image === 'string' ? `http://localhost:3000/uploads/${item.image}`  : URL.createObjectURL(item.image)} className="h-28 w-40 rounded-md border border-stone-200 object-cover"/>
                                )
                            }
                                    <div className="min-w-0 flex-1">
                                        <p className="text-base font-bold uppercase text-stone-900">{item.title}</p>
                                        <p className="mt-2 text-base text-stone-600">{item.description}</p>
                                    </div>
                        </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <button type="button" className={dangerButtonClass} onClick={() => removeCard(index)}>Remove card</button>
                                    <button type="button" className={secondaryButtonClass} onClick={() => handleEditCard(index)}>Edit card</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <button type="submit" className={`${buttonClass} w-full`}>
                        {initialData ? 'Update post' : 'Create post'}
                    </button>
                </div>

            </form>
            <CategoryCreate/>
        </div>
    );
};

export default PostCreate;
