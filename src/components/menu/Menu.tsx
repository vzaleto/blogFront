import {Link} from "react-router-dom";

export const Menu = () => {
    return (
        <div className='flex gap-4 menu-link'>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="sport" to="">sport </Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="technology" to="">technology</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="food" to="">food</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="love" to="">love</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="sheet" to="">sheet</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="politics" to="">politics</Link>
            </div>
        </div>
    )
}