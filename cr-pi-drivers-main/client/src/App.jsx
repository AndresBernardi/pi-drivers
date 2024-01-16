import { BrowserRouter, Routes, Route} from 'react-router-dom'

//Views
import Home from './views/home/home.jsx'
import LandingPage from './views/landingPage/landingPage.jsx'
import Detail from './views/detail/detail.jsx'
import Create from './views/create/create.jsx'
import Error404 from './components/Error404/Error404.jsx'

import './App.css'

function App() {
  return (
    <div className='App.css'>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route exact path='/home' element={<Home/>}/> 
        <Route path='/home/:id' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
    </div>
)
}

export default App
