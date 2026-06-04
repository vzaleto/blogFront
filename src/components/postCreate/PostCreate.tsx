import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {FormEvent, useEffect, useState} from "react";


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

const inputClass = "w-full border border-stone-300 bg-[#f7f6f2] px-4 py-3 text-base text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:bg-white focus:ring-1 focus:ring-stone-950";
const labelClass = "mb-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-500";
const buttonClass = "border border-stone-950 bg-stone-950 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f7f6f2] transition hover:bg-transparent hover:text-stone-950 focus:outline-none focus:ring-1 focus:ring-stone-950";
const secondaryButtonClass = "border border-stone-900 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-stone-950 hover:text-[#f7f6f2] focus:outline-none focus:ring-1 focus:ring-stone-950";
const dangerButtonClass = "border border-red-800 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-800 transition hover:bg-red-800 hover:text-[#f7f6f2] focus:outline-none focus:ring-1 focus:ring-red-800";

const PostCreate = ({initialData}: {initialData?: Post}) => {


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
    const dispatch: AppDispatch = useDispatch();

    // useEffect(() => {
    //     if (!token) {
    //         navigate('/')
    //     }
    // }, [token, navigate]);

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
            <form onSubmit={handleSubmit} className="border border-stone-300 bg-white/85 p-6 shadow-sm md:p-8">
                <div className="mb-7 flex items-center justify-between gap-4 border-b border-stone-300 pb-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">
                            {initialData ? 'Edit post' : 'New post'}
                        </p>
                        <h1 className="mt-1 text-2xl font-bold uppercase tracking-[0.08em] text-stone-950">Post</h1>
                    </div>
                    <span className="border border-stone-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-950">
                        {initialData ? 'Update' : 'Create'}
                    </span>
                </div>

                <div className="mb-6">
                    <label className={labelClass} htmlFor="title">Title</label>
                    <input type='text' value={inputTitle} placeholder='Post title'
                           className={inputClass}
                           id="title" onChange={(e) => setInputTitle(e.target.value)}/>
                </div>
                <div className="mb-6">
                    <label className={labelClass} htmlFor="content">Content</label>
                    <textarea value={inputContent} placeholder="Post introduction" className={`${inputClass} min-h-36 resize-y`} id="content" onChange={(e) => setInputContent(e.target.value)}></textarea>
                </div>
                <div className="mb-6">
                    <label className={labelClass} htmlFor="image">Image</label>
                    <div className="border border-stone-300 bg-[#f7f6f2] p-4">
                        <input type='file' className="text-sm text-stone-700" id="image"
                               onChange={(e) => setInputImage(e.target.files?.[0] || null)}/>
                        {
                            inputImage && (
                                <div className="mt-4 w-fit border border-stone-300 bg-white p-2">
                                    <img src={typeof inputImage === 'string' ? `http://localhost:3000/uploads/${inputImage}` : URL.createObjectURL(inputImage)}
                                         className="h-32 w-48 object-cover grayscale"/>
                                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Hero preview</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="mb-6">
                    <label className={labelClass} htmlFor="tag">Tags</label>
                    <input type='text' value={inputTag} placeholder="Tags (comma separated)" id="tag"
                           className={inputClass}
                           onChange={(e) => setInputTag(e.target.value)}/>
                </div>
                <CategoryGetAll selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

                <div className="mb-6 border border-stone-300 bg-white p-5">
                    <div className="mb-5 flex items-center justify-between gap-4 border-b border-stone-300 pb-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">Post body</p>
                            <h3 className="mt-1 text-xl font-bold uppercase tracking-[0.08em] text-stone-950">Full content</h3>
                        </div>
                        <span className="border border-stone-300 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-600">{fullContent.length}</span>
                    </div>
                    <div className="mb-6">
                        <label className={labelClass} htmlFor="cardImage">Card image</label>
                        <div className="border border-stone-300 bg-[#f7f6f2] p-4">
                            <input type="file" className="text-sm text-stone-700"
                                   onChange={(e) => setNewCard({...newCard, image: e.target.files?.[0] || null})}
                                   name=""
                                   id="cardImage"/>
                            {newCard.image && (
                                <div className="mt-4 w-fit border border-stone-300 bg-white p-2">
                                    <img src={typeof newCard.image === 'string' ? `http://localhost:3000/uploads/${newCard.image}` :  URL.createObjectURL(newCard.image)}
                                         className="h-32 w-48 object-cover grayscale"/>
                                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Section preview</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className={labelClass} htmlFor="cardTitle">Card title</label>
                        <input type="text" value={newCard.title} placeholder="Title"
                               className={inputClass}
                               onChange={(e) => setNewCard({...newCard, title: e.target.value})} name=""
                               id="cardTitle"/>
                    </div>
                    <div className="mb-6">
                        <label className={labelClass} htmlFor="cardDescription">Card description</label>
                        <textarea value={newCard.description} placeholder="Description" id="cardDescription" className={`${inputClass} min-h-32 resize-y`} onChange={(e) => setNewCard({...newCard, description: e.target.value})}></textarea>
                    </div>
                    <button type="button" className={`${buttonClass} w-full`} onClick={addCard}>
                        {editCardIndex !== null ? 'Update card' : 'Add card'}
                    </button>
                </div>

                {fullContent.length > 0 && (
                    <div className="mb-6 space-y-4">
                        {fullContent.map((item, index) => (
                            <div key={index} className="border border-stone-300 bg-[#f7f6f2] p-4">
                                <div className="flex flex-col gap-4 sm:flex-row">
                            {
                                item.image && (
                                            <img src={typeof item.image === 'string' ? `http://localhost:3000/uploads/${item.image}`  : URL.createObjectURL(item.image)} className="h-32 w-48 border border-stone-300 bg-white object-cover p-1 grayscale"/>
                                )
                            }
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-bold uppercase tracking-[0.14em] text-stone-950">{item.title}</p>
                                        <p className="mt-2 text-base leading-7 text-stone-600">{item.description}</p>
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
