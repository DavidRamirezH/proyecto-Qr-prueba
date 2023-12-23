import "./buscador.css"

export default function Buscador(){
    return(
        <div className="buscador">
            <label htmlFor="buscador">
                buscador
            </label>
            <input type="text" name="buscador" id="buscador" />
        </div>
    )
}