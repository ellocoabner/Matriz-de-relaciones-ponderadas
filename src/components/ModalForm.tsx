import './ModalForm.css'
import { type AREA, areaArray } from '../helpers/consts'
import { useEffect, useRef, useState } from 'react'
import PlusSvg from './icons/PlusSvg'
import createEspacio from '../models/espacio'
import useAppContext from '../AppContex'
import { type Espacio } from '../types'

export default function ModalForm (): JSX.Element {
  const indexRef = useRef(0)
  // const allowAddRef = useRef(true)
  const { Modal, Espacios } = useAppContext()
  const [items, setItems] = useState<JSX.Element[]>([])

  useEffect(() => {
    setItems(Espacios.espacios.length > 0
      ? Espacios.espacios.map(item => <AddItem disabled={true} item={item} key={item.id}/>)
      : [<AddItem disabled={false} key={indexRef.current}/>])
  }, [Espacios.espacios])

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    Modal.handleToggleModal()
  }

  const handleAddItemButton = (): void => {
    indexRef.current++
    setItems(prevItems => {
      const item = prevItems.find(item => item.props.item === undefined)
      if (item !== undefined) return [...prevItems]
      else return [...prevItems, <AddItem disabled={false} key={indexRef.current}/>]
    })
  }

  return (
    <article id='modal'>
        <form onSubmit={handleSubmit} >
            <h3>Añade los espacios</h3>
            <div className='select-container'>
            {
              items.map(item => item)
            }

            </div>
            <button className='add-item' type='button' onClick={handleAddItemButton}><PlusSvg/></button>
            <input type='submit' value='Ver tabla'/>
        </form>
    </article>
  )
}

export function AddItem ({ item, disabled }: { item?: Espacio | undefined, disabled: boolean }): JSX.Element {
  const { Espacios } = useAppContext()
  const [disable, setDisble] = useState(disabled ?? false)
  const [data, setData] = useState({
    option: item?.area ?? '',
    espacio: item?.name ?? ''
  })

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value
    setData(prevData => {
      return ({
        ...prevData,
        option: value
      })
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setData(prevData => {
      return ({
        ...prevData,
        espacio: value
      })
    })
  }

  const handleClick = (): void => {
    if (data.option === '' || data.espacio === '') return
    setDisble(!disable)
    const espacio = createEspacio(data.option as AREA, data.espacio)
    Espacios.handleAddEspacios(espacio)
  }

  const handleRemoveItemButton = (id: string): void => {
    Espacios.handleRemoveEspacios(id)
  }

  return (
    <div>
     <select name="area-select" id="area-select" onChange={handleSelect} disabled={disable}>
       {item !== undefined ? <option>{item.area}</option> : <option>SELECT AREA</option>}
        {areaArray.map(area => <option key={area} value={area}>{area}</option>)}
      </select>
      <input type='text' name='espacio' placeholder='SALA' value={data.espacio} onChange={handleChange} disabled={disable}/>
      {!disable && <button type='button' onClick={handleClick}>✅</button>}
      {(item !== undefined && item !== null) && <button onClick={() => { handleRemoveItemButton(item.id) }} type='button'>❌</button>}
    </div>
  )
}
