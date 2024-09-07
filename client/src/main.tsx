import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/Store/configureStore'
import { router } from './app/router/Routes'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <RouterProvider router={router}/>
  </Provider>
)
