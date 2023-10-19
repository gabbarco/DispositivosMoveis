import { useEffect, useState } from "react"
import Filme from "./filme"

export default function Filmes() {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        console.log("Buscando Filmes....")

        let api = "https://api.tvmaze.com/search/shows?q=csi"

        fetch(api)
            .then(resposta => resposta.json())
            .then(filmes => setFilmes(filmes))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>Filmes</h1>

            {filmes.map(filme => {
                return (
                    <Filme
                        data={filme.show}
                    />
                )
            })}
        </div>
    )
}