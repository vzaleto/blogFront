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
        <div className="category-get-all mb-6 border border-stone-300 bg-white/85 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-stone-300 pb-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">Post category</p>
                    <h2 className="mt-1 text-xl font-bold uppercase tracking-[0.08em] text-stone-950">Categories</h2>
                </div>
                {categories?.length > 0 && (
                    <span className="border border-stone-300 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-600">
                        {categories.length}
                    </span>
                )}
            </div>
            {categories.length > 0 ?
                (
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : "")}
                        className="w-full cursor-pointer border border-stone-300 bg-[#f7f6f2] px-4 py-3 text-base font-bold uppercase tracking-[0.08em] text-stone-950 outline-none transition focus:border-stone-950 focus:bg-white focus:ring-1 focus:ring-stone-950"
                    >
                        <option value="">Select a category</option>
                        {
                            categories.map((elem:CategoryOption) => (
                                <option key={elem.id} value={elem.id}>{elem.name}</option>
                            ))
                        }
                    </select>
                ) : (
                    <p className="border border-stone-300 bg-[#f7f6f2] px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-stone-600">
                        No categories
                    </p>
                )
            }
        </div>
    )
}
