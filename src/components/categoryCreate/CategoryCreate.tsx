import {FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createCategory, fetchCategories} from "../../features/categorySlice/categorySlice";
import {AppDispatch, RootState} from "../../store/store.ts";

const inputClass = "w-full border border-stone-300 bg-[#f7f6f2] px-4 py-3 text-base text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:bg-white focus:ring-1 focus:ring-stone-950";
const labelClass = "mb-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-500";

export const CategoryCreate = () => {

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const dispatch:AppDispatch = useDispatch();
    const {success} = useSelector((state: RootState) => state.categories);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try{
            const category = {name, slug, description};

            if (!name || !slug || !description) {
                setError('All fields are required');
                return;
            }
            await dispatch(createCategory(category));
            await dispatch(fetchCategories());
        }catch (err){
            setError(err instanceof Error ? err.message : 'Failed to create category');
        }

        setName('');
        setSlug('');
        setDescription('');

        // try {
        //     const category = {name, slug, description};
        //     if (!name || !slug || !description) {
        //         setError('All fields are required');
        //         return;
        //     }
        //     const result =  await dispatch(createCategory(category)).unwrap();
        //     toast.success(result.message);
        // }catch (e:any){
        //     toast.error(
        //         e?.message || 'Failed to create category'
        //     );
        // }

    }

    return (
        <div className="mt-8 border border-stone-300 bg-white/85 p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-stone-300 pb-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">New category</p>
                    <h1 className="mt-1 text-2xl font-bold uppercase tracking-[0.08em] text-stone-950">Category</h1>
                </div>
                <span className="border border-stone-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-950">Create</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className={labelClass} htmlFor="category-name">
                        Name
                    </label>
                    <input
                        id="category-name"
                        type="text"
                        placeholder="Travel"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass} htmlFor="category-slug">
                        Slug
                    </label>
                    <input
                        id="category-slug"
                        type="text"
                        placeholder="travel"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass} htmlFor="category-description">
                        Description
                    </label>
                    <input
                        id="category-description"
                        type="text"
                        placeholder="Short category description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full border border-stone-950 bg-stone-950 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f7f6f2] transition hover:bg-transparent hover:text-stone-950 focus:outline-none focus:ring-1 focus:ring-stone-950"
                >
                    Create category
                </button>

                {success && (
                    <p className="border border-green-700 bg-transparent px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-green-700">
                        Category created successfully
                    </p>
                )}
                {error && (
                    <p className="border border-red-800 bg-transparent px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-red-800">
                        {error}
                    </p>
                )}
            </form>
        </div>
    )
}
