import {FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createCategory, fetchCategories} from "../../features/categorySlice/categorySlice";
import {AppDispatch, RootState} from "../../store/store.ts";

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
        <div className="mt-8 rounded-lg border border-stone-300 bg-white/80 p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-stone-200 pb-3">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">New category</p>
                    <h1 className="mt-1 text-xl font-bold uppercase text-stone-900">Category</h1>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-900">Create</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-600" htmlFor="category-name">
                        Name
                    </label>
                    <input
                        id="category-name"
                        type="text"
                        placeholder="Travel"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-stone-300 bg-stone-50 px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-200"
                    />
                </div>

                <div>
                    <label className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-600" htmlFor="category-slug">
                        Slug
                    </label>
                    <input
                        id="category-slug"
                        type="text"
                        placeholder="travel"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full rounded-md border border-stone-300 bg-stone-50 px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-200"
                    />
                </div>

                <div>
                    <label className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-600" htmlFor="category-description">
                        Description
                    </label>
                    <input
                        id="category-description"
                        type="text"
                        placeholder="Short category description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-md border border-stone-300 bg-stone-50 px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-stone-950 px-5 py-3 text-base font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
                >
                    Create category
                </button>

                {success && (
                    <p className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                        Category created successfully
                    </p>
                )}
                {error && (
                    <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                        {error}
                    </p>
                )}
            </form>
        </div>
    )
}
