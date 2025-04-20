import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ReportForm from "./pages/AddReportForm"
import './App.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="/form" element={<ReportForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App