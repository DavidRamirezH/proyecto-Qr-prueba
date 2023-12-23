import { Link } from "react-router-dom"
import "./logo.css"

export default function Logo(){
    return(
        <>
            <Link to={"/"} className="logo">
                <h1>Eventix</h1>
            </Link>
        </>
    )
}