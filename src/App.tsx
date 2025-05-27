import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

import Layout from "./layouts/Layout"

const Favorites = lazy(() => import('./pages/Favorites'))
const IndexPage = lazy(() => import('./pages/IndexPage'))

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={
              <Suspense fallback="Cargando...">
                <IndexPage/>
              </Suspense>
            }/>
            <Route path="/favoritos" element={
              <Suspense fallback="Cargando...">
                <Favorites/>
              </Suspense>
            }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
