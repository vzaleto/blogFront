
import PostCreate from "./components/postCreate/PostCreate.tsx";
import PostsGetAll from "./components/postsGetAll/PostsGetAll.tsx";

const App = () => {
    return (
        <div>
            <PostCreate />
            <PostsGetAll/>
        </div>
    );
};

export default App;