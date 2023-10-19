import Menu from "./components/menu"
import Rodape from "./components/rodape"
import Filmes from "./components/filmes"
import Contador from "./components/contador"

export default function App() {
  return (
    <div>
      <Menu />
      <Filmes />
      <Contador inicial={10}/>

      <Rodape />
    </div>
  )
}