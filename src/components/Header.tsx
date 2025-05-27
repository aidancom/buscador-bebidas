import { useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router"
import { useAppStore } from "../stores/useAppStore"

const Header = () => {

  const [searchFilter, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  })
  const location = useLocation()
  const fetchCategories = useAppStore(state => state.fetchCategories)
  const drinks = useAppStore(state => state.categories.drinks)
  const searchRecipes = useAppStore(state => state.searchRecipes)
  const isHome = useMemo(() => location.pathname === '/' ,[location.pathname])
  const showNotification = useAppStore(state => state.showNotification)
  const loadFromStorage = useAppStore(state => state.loadFromStorage)
    
  useEffect(() => {
    fetchCategories()
    loadFromStorage()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({...searchFilter, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(searchFilter).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    searchRecipes(searchFilter)
  }

  return (
    <header className={isHome ? 'bg-[url(/bg.jpg)] bg-center bg-cover' : 'bg-slate-800'}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img 
              className="w-32"
              src="/logo.svg"
              alt="Logotipo" 
            />
          </div>
          <nav className="flex gap-4">
                <NavLink className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'} to="/">Inicio</NavLink>
                <NavLink className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'} to="/favoritos">Favoritos</NavLink>
          </nav>
        </div>
        {isHome && (
          <form 
            onSubmit={handleSubmit} 
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 rounded-lg my-32 p-10 shadow space-y-6"
          >
            <div className="space-y-4">
              <label 
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >Nombre Ingredientes</label>
              <input 
                type="text" 
                id="ingredient" 
                name="ingredient" 
                className="p-3 w-full rounded-lg bg-white focus:outline-none" 
                placeholder="Nombre o Ingrediente"
                onChange={handleChange}
                value={searchFilter.ingredient}
              />
            </div>
             <div className="space-y-4">
              <label 
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >Categoría</label>
              <select 
                id="category" 
                name="category" 
                className="p-3 w-full rounded-lg bg-white focus:outline-none"  
                onChange={handleChange}
                value={searchFilter.category}
              >
                <option value="">--- Seleccione una categoría ---</option>
                {drinks.length > 0 &&
                  drinks.map(category => (
                    <option key={category.strCategory} value={category.strCategory}>
                      {category.strCategory}
                    </option>
                ))}
              </select>
            </div>
            <input 
              type="submit" 
              value="Buscar recetas" 
              className="cursor-pointer bg-orange-800 transition hover:bg-orange-900 w-full rounded-lg uppercase p-2 text-white font-extrabold" 
            />
          </form>
        )}
      </div>
    </header>
  )
}

export default Header
