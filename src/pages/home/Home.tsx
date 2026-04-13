

import {Outlet} from "react-router-dom";
import SearchBar from "../../components/search/SearchBar.tsx";
import AdminLog from "../../components/adminLog/AdminLog.tsx";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <header className="sticky top-0 bg-white border-b shadow-sm z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
                    <h1 className="text-xl font-bold">MyBlog</h1>

                    <div className="flex items-center gap-4">
                        <SearchBar/>
                        <AdminLog/>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
                <Outlet/>
            </main>

            <footer className="bg-white border-t py-6 text-center text-gray-500">
                © 2026 MyBlog
            </footer>

        </div>
);
};

export default Home;