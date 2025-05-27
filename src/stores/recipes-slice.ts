import type { StateCreator } from "zustand"
import { getCategories, getRecipeByID, getRecipes } from "../services/RecipeService"
import type { CategoriesResponse, Drink, Drinks, SearchFilter, SelectedRecipe  } from "../types"


export type RecipesSliceType = {
  categories: CategoriesResponse,
  drinks: Drinks,
  selected: SelectedRecipe,
  modal: boolean,
  fetchCategories: () => Promise<void>,
  searchRecipes: (searchFilter: SearchFilter) => Promise<void>,
  selectRecipe: (id: Drink['idDrink']) => Promise<void>,
  closeModal: () => void
}

export const createRecipesSlices: StateCreator<RecipesSliceType> = (set) => ({
  categories: {drinks: []},
  drinks: {drinks: []},
  selected: {} as SelectedRecipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories()
    set(() => ({
      categories: categories
    }))
  },
  searchRecipes: async (searchFilter) => {
    const drinks = await getRecipes(searchFilter)
    set(() => ({
      drinks: drinks
    }))
  },
  selectRecipe:  async (id) => {
    const drinkRecipe = await getRecipeByID(id)
    set(() => ({
      selected: drinkRecipe,
      modal: true
    }))
  },
  closeModal: () => {
    set(() => ({
      modal: false,
      selected: {} as SelectedRecipe
    }))
  }
})