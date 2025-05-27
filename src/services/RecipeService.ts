import axios from "axios"
import { CategoriesSchema, DrinksSchema, RecipeAPIResponseSchema } from "../utils/recipes-schema"
import type { Drink, SearchFilter } from "../types"

export const getCategories = async () => {
  const {data} = await axios("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
  const result = CategoriesSchema.safeParse(data)
  if (result.success) return result.data
}

export const getRecipes = async (searchFilter: SearchFilter) => {
  const {data} = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFilter.category}&i=${searchFilter.ingredient}`)
  const result = DrinksSchema.safeParse(data)
  if(result.success) return result.data
}

export const getRecipeByID = async(id: Drink['idDrink']) => {
  const {data} = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
  if (result.success) return result.data
}