import useAppContext from './AppContex'
import ModalForm from './components/ModalForm'
import Table from './components/Table'

function App (): JSX.Element {
  const { Modal } = useAppContext()
  return (
    <>
      {Modal.showModal && <ModalForm/>}
      <Table/>
    </>
  )
}

export default App
