import { Route, Routes, BrowserRouter } from "react-router-dom";
//import Header from "./components/Common/Header";
//import Footer from './components/Common/Footer'
import HomePage from './pages/HomePage'
import DashboardPage from "./pages/Dashboard";



const App = ()=>{






  return(
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage/>} />
          {/*<Route path="/" element={Home} />
          <Route path="/" element={Home} />
  <Route path="/" element={Home} />*/}
      </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;