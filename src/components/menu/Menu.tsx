import {Link} from "react-router-dom";

export const Menu = () => {
    return (
        <div className='flex gap-4 menu-link'>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="sport" to="">sports</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="science" to="">science</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="food" to="">food</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="health" to="">health</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="education" to="">education</Link>
            </div>
            <div className="btn-wrap">
                <Link className="hover-cut" data-text="politics" to="">politics</Link>
            </div>
        </div>
    )
}