import Logo from "../logo/logo"
import "./footer.css"

export default function Footer(){
    return(
        <>
            <footer>
                <section>
                    <Logo></Logo>
                </section>
                <section>
                    <h3>Estamos para apoyarte</h3>
                    <p>Mi Cuenta</p>
                    <p>Mis Entradas</p>
                    <p>Terminos y condiciones</p>
                    <p>Politicas de privacidad</p>
                    <p>Soporte a usuarios</p>
                </section>
                <section>
                    <h3>Únete</h3>
                    <p>Vente tu evento con nosotros</p>
                    <p>Produce tu evento con nosotros</p>
                    <p>Trabaja con nosotros</p>
                </section>
                <section>
                    <h3>Empresa</h3>
                    <p>Eventtix Bolivia</p>
                    <p>Eventtix Internacional</p>
                    
                </section>               
            </footer>        
        </>
    )
}