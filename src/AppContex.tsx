import { createContext, useContext, useState } from 'react'
import { type Context, type Espacio } from './types'
import { type v4 } from 'uuid'
// import { AddItem } from './components/ModalForm'

const AppContext = createContext<Context>({
  Modal: {
    handleToggleModal: () => {},
    showModal: true
  },
  Espacios: {
    handleAddEspacios: () => {},
    handleRemoveEspacios: (_id) => {},
    espacios: []
  }
  // Items: {
  //   items: [],
  //   handleAddItem: () => {},
  //   handleRemoveItem: (_key: string | number) => {}
  // }
})

export function AppProvider ({ children }: { children: any }): JSX.Element {
  // const keysRef = useRef(1)
  const [showModal, setShowModal] = useState(true)
  const [espacios, setEspacios] = useState<Espacio[]>([])
  // const [items, setItems] = useState<JSX.Element[]>([<AddItem key={keysRef.current} />])

  const handleToggleModal = (): void => {
    setShowModal(!showModal)
  }

  const handleAddEspacios = (espacio: Espacio): void => {
    setEspacios(prevData => [...prevData, espacio])
  }

  const handleRemoveEspacios = (id: typeof v4): void => {
    setEspacios(prevData => {
      return prevData.filter(espacio => espacio.id !== id)
    })
  }

  // const handleAddItem = (): void => {
  //   keysRef.current += 1
  //   setItems(prevItems => {
  //     return [...prevItems, <AddItem key={keysRef.current}/>]
  //   })
  // }

  // const handleRemoveItem = (key: string | number): void => {
  //   setItems(prevItems => {
  //     const restOfItems = prevItems.filter(item => item.key !== key)
  //     return restOfItems
  //   })
  // }

  return (
    <AppContext.Provider value={{
      Modal: { handleToggleModal, showModal },
      Espacios: { handleAddEspacios, handleRemoveEspacios, espacios }
      // Items: { items, handleAddItem, handleRemoveItem }
    }}>
        {children}
    </AppContext.Provider>
  )
}

export default function useAppContext (): Context {
  const context = useContext(AppContext)
  if (context === null || context === undefined) throw new Error('El componente debe estar envuelto en el provider')

  return context
}
