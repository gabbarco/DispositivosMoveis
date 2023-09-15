import { useState } from "react";

export default function Contador ({ inicial }) {
    let numero= inicial
    const [cont, setCont] = useState(inicial);

    let contador= 1;

    function aumentar() {
        setCont(cont+1)
    }
    function diminuir() {
        setCont(cont-1)
    }

    return (
        <div>
            Número: {numero} <br />
            Contador: {cont} <br />

            <button onClick={aumentar}>Aumentar</button>
            <button onClick={diminuir}>Diminuir</button>
        </div>
    )
}