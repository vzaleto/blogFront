

import {Outlet} from "react-router-dom";
import SearchBar from "../../components/search/SearchBar.tsx";


const Home = () => {
    return (
        <div className="" >
            <header>
                <div className="bg-amber-600" >
                    <div className="container mx-auto 2xl">
                        <h1>menu</h1>
                        <SearchBar/>
                    </div>
                </div>
            </header>
            <main>
                <div className="container mx-auto 2xl">
                    <Outlet/>
                </div>
            </main>
            <footer>
                <div className="bg-amber-600">
                    <div className="container mx-auto 2xl">
                        footer
                    </div>
                </div>
            </footer>

        </div>
);
};

export default Home;