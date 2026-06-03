import {Link} from "react-router-dom";

export const Menu = () => {
    return (
        <div className='flex gap-4 menu-link'>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="Sports" to="/category/sports">Sports</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="Science" to="/category/science">Science</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="Technology" to="/category/technology">Technology</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="Health" to="/category/health">Health</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="lifestyle" to="/category/lifestyle">lifestyle</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="Politics" to="/category/politics">Politics</Link>
            </div>
        </div>
    )
}