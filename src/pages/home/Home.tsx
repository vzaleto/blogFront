import {Link, Outlet} from "react-router-dom";
import SearchBar from "../../components/search/SearchBar.tsx";
import AdminLog from "../../components/adminLog/AdminLog.tsx";
import {CreateBtn} from "../../components/createBtn/CreateBtn.tsx";
import {Menu} from "../../components/menu/Menu.tsx";

const Home = () => {

    return (
        <div className="min-h-screen flex flex-col max-w-5xl mx-auto">
            <header className="sticky top-0 pb-4  pt-4 border-amber-950 z-50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-[#5e5e5e] after:to-transparent">
                <div className="">
                    <div className="">
                        <div className="max-w-5xl mx-auto flex flex-row justify-end gap-4">
                            <CreateBtn/>
                            <AdminLog/>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold normal-case pt-5 pb-5 flex justify-center title">
                        <Link to={`/`} className="block ">
                            The CHronomics
                        </Link>
                    </h1>

                    <div className=" border-[#5e5e5e]  list-menu ">
                        <div className="flex justify-between gap-4 items-center max-w-5xl mx-auto">
                            <Menu/>
                            <SearchBar/>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto w-full py-6">
                <Outlet/>
            </main>

            <footer className="border-t py-6 text-center text-gray-500">
                © 2026 The CHronomics
            </footer>

        </div>
    );
};

export default Home;