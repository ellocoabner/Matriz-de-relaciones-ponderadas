import './Table.css'
import { type AREA, areaArray } from '../helpers/consts'
import { type Espacio } from '../types'
import useAppContext from '../AppContex'

export default function Table (): JSX.Element {
  const { Espacios, Modal } = useAppContext()
  return (
    <div id="container">
        <header className="format">
            <h2 className="area">AREA</h2>
            <h2 className='espacio'>ESPACIOS (AMBIENTES)</h2>
            <button onClick={Modal.handleToggleModal}>✏️</button>
        </header>
        <section>
            {areaArray.map(area => {
              const items = Espacios.espacios.filter((espacio: Espacio) => espacio.area === area)
              return <AreaComponent key={area} area={area} items={items}/>
            })}
        </section>
    </div>
  )
}

function AreaComponent ({ area, items }: { area: AREA, items: Espacio[] }): JSX.Element {
  return (
    <div className='format'>
        <h3 className={`area ${area}`}>{area}</h3>
        <ul className={area}>
           {items !== undefined && items !== null
             ? items.map(item => (
                <li key={item.id}>{item.name}</li>
             ))
             : null}
        </ul>
    </div>
  )
}
