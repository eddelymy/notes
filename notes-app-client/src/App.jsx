import Index from './router/IndexFile'
import { Provider } from 'react-redux'
import store from './store/store'

function App() {

  return (
    <Provider store={store}>
    <Index/>
    </Provider>
  )
}

export default App
