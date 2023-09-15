import Menu from "./components/menu"
import Rodape from "./components/rodape"
import Contador from "./components/contador"

export default function App() {
  return (
    <div>
      <Menu />

      <Contador inicial={50}/>

      <Rodape />
    </div>
  )
}