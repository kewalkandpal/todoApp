import "./Navbar.css";
import {Link} from "react-router-dom";
import {useSearchParams} from "react-router-dom";

function Navbar(){
    const [location] = useSearchParams();
    const path = location.get("todo");

    return(
        <div className="navbar">
            <Link className={path === null ? "active" : "link"} to="/"><h4>All</h4></Link>
            <Link className={path === "active" ? "active" : "link"} to="/?todo=active"><h4>Active</h4></Link>
            <Link className={path === "completed" ? "active" : "link"} to="/?todo=completed"><h4>Completed</h4></Link>
        </div>
    )
}

export default Navbar;