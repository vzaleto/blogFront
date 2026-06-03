import {Link} from "react-router-dom";

export const Menu = () => {
    const categories = [
        {label: 'Sports', path: '/category/sports'},
        {label: 'Science', path: '/category/science'},
        {label: 'Technology', path: '/category/technology'},
        {label: 'Health', path: '/category/health'},
        {label: 'Lifestyle', path: '/category/lifestyle'},
        {label: 'Politics', path: '/category/politics'}
    ];

    return (
        <nav className="menu-link" aria-label="Categories">
            {categories.map((category) => (
                <Link key={category.path} className="hover-cut" to={category.path}>
                    {category.label}
                </Link>
            ))}
        </nav>
    )
}
