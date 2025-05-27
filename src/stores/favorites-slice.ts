import type { StateCreator } from 'zustand'
import type { SelectedRecipe } from '../types'

export type FavoritesSliceType = {
  favorites: SelectedRecipe[],
  handleClickFavorites: (recipe: SelectedRecipe) => void,
  favoriteExist: (id: SelectedRecipe['idDrink']) => boolean,
  loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
  favorites: [],
  handleClickFavorites: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
      }))
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe]
      }))
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites))
  },
  favoriteExist: (id) => {
    return get().favorites.some(favorite => favorite.idDrink === id)
  },
  loadFromStorage: () => {
    const getLocal = localStorage.getItem('favorites')
    if (getLocal) {
      set(() => ({
        favorites: JSON.parse(getLocal)
      }))
    }
  }
})