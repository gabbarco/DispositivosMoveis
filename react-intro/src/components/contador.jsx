import { useEffect, useState } from "react";

export default function Contador ({ inicial }) {
    let numero= inicial
    const [cont, setCont] = useState(inicial);
    const [saldo, setSaldo] = useState("POSITIVO");

    useEffect(() => {
        if ( cont >= 0 ) {
            setSaldo("POSITIVO");
        } else {
            setSaldo("NEGATIVO")
        }
    }, [cont]);

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
            Saldo: {saldo} <br />

            <button onClick={aumentar}>Aumentar</button>
            <button onClick={diminuir}>Diminuir</button>
        </div>
    )
}