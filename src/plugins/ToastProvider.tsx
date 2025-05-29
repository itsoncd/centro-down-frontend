import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ToastProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Puedes usar "dark" o "colored" también
      />
    </>
  )
}
