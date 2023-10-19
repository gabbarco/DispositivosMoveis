import { useState } from "react"

export default function Filme( {data} ) {
    const [favorito,setFavorito] = useState(false)

    function favoritar() {
        if ( favorito ) {
            setFavorito(false)
        } else {
            setFavorito(true)
        }
    }

    return (
        <div className={"filme "+ (favorito ? "fav" : "")}>
        <div className="poster">
            <img src={data.image.medium} />
        </div>
        <div className="conteudo">
            <h3>{data.name}</h3>
            <span className="generos">{data.genres}</span>
            <div dangerouslySetInnerHTML={{ __html: data.summary}}></div>

            <button onClick={favoritar}>Favoritar</button>
            <button>Remover</button>
        </div>
    </div>
    )
}