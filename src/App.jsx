import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home'
import Home1 from './components/Home1'
import CarList from "./components/CarList"
import RecordList from "./components/RecordList"
import AddEditCar from './components/AddEditCar'
import AddEditRecord from './components/AddEditRecord'
import NotFound from './components/NotFound'
import CostList from './components/CostList'
import AddEditCost from './components/AddEditCost'
import CostDetails from './components/CostDetails'
import TimeList from './components/TimeList'
import AddEditTime from './components/AddEditTime'
import TablaTipo from './components/TablaTipo'
import TablaRep from './components/TablaRep'
import PreciosList from './components/PreciosList'
import Detalles2 from './components/Detalles2'
import Reporte1 from './components/Reporte1'
import Todas from './components/TodaslasCosas'
//import AddEditreporte1 from './components/AddEditreporte1'




function App() {
  return (
      <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path = "/car/list" element = {<CarList/>} />
              <Route path = "/car/add" element = {<AddEditCar/>} />

              {/*registros del auto*/} 
              <Route path = "/record/list" element = {<RecordList/>} />
              <Route path = "/record/add" element = {<AddEditRecord/>} />

              <Route path = "/cost/list" element = {<CostList/>} />
              <Route path = "/cost/add" element = {<AddEditCost/>} />
              <Route path = {"/cost/details-2/:id"}  element = {<Detalles2/>} />

              {/*pep2*/} 


              <Route path = "*" element = {<NotFound/>} />

              <Route path = {"/list/time"}  element = {<TimeList/>} /> 
              <Route path = "/time/add" element = {<AddEditTime/>} />

              <Route path = "/list/type" element = {<Reporte1/>} />
              <Route path = "/list/motor" element = {<TablaTipo/>} />

              
              <Route path = "/list/reparacion" element = {<TablaRep/>} />

              <Route path = "/repair-list/price" element = {<PreciosList/>} />
              
              <Route path = "/todo/car-repair" element = {<Todas/>} />


            </Routes>
          </div>

      </Router>
  );
}

export default App
