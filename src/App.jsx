
import { useStore } from './store'; 
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
const router=createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar/>
        <Home/>

      </div>
    },

    {
      path:"/pastes",
      element:
      <div>
        <Navbar/>
        <Paste></Paste>
       

      </div>
    },

    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar/>
        <ViewPaste/>
        

      </div>
    },
  ]
)

function App() {
  const { pastes, AddToPaste, removePaste, updatePaste, resetPaste } = useStore();


  return (
    <>
    
    <RouterProvider router={router}>

    </RouterProvider>
   

 
       
    </>
  )
}

export default App
