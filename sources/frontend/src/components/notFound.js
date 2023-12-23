import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-admin">
            <h1>404 NOT FOUND</h1>
            <Link to="/">Go back to homepage</Link>
        </div>
    );
}

export default NotFound;