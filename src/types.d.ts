import { type v4 } from 'uuid'
import { type AREA } from './helpers/consts'

export interface Espacio {
  area: AREA | string
  id: v4
  name: string
}

export interface Context {
  Modal: {
    handleToggleModal: () => void
    showModal: boolean
  }

  Espacios: {
    espacios: Espacio[]
    handleAddEspacios: (espacio: Espacio) => void
    handleRemoveEspacios: (id: v4) => void
  }

  // Items: {
  //   items: JSX.Element[]
  //   handleAddItem: () => void
  //   handleRemoveItem: (_key: string | number) => void
  // }
}
