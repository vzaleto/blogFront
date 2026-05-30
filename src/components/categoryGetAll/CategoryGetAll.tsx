import {useDispatch, useSelector} from "react-redux";

import {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect} from "react";
import {fetchCategories} from "../../features/categorySlice/categorySlice.ts";

interface CategoryOption {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export const CategoryGetAll = ({selectedCategory, setSelectedCategory}: {
    selectedCategory: number | "",
    setSelectedCategory: (value: number | "") => void
}) => {

    const dispatch: AppDispatch = useDispatch();

    const {categories} = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="category-get-all mb-5 rounded-lg border border-stone-300 bg-white/80 p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Post category</p>
                    <h2 className="mt-1 text-lg font-bold uppercase text-stone-900">Categories</h2>
                </div>
                {categories?.length > 0 && (
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-bold text-stone-700">
                        {categories.length}
                    </span>
                )}
            </div>
            {categories.length > 0 ?
                (
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : "")}
                        className="w-full cursor-pointer rounded-md border border-stone-300 bg-stone-50 px-4 py-3 text-base font-bold text-stone-900 outline-none transition focus:border-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-200"
                    >
                        <option value="">Select a category</option>
                        {
                            categories.map((elem:CategoryOption) => (
                                <option key={elem.id} value={elem.id}>{elem.name}</option>
                            ))
                        }
                    </select>
                ) : (
                    <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
                        No categories
                    </p>
                )
            }
        </div>
    )
}
