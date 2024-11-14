
import PostCreate from "./components/postCreate/PostCreate.tsx";
import PostsGetAll from "./components/postsGetAll/PostsGetAll.tsx";
import GetTags from "./components/getTags/GetTags.tsx";

const App = () => {
    return (
        <div>
            <PostCreate />
            <GetTags/>
            <PostsGetAll/>
        </div>
    );
};

export default App;