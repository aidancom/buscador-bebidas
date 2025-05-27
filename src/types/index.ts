import {z} from 'zod'
import type { CategoriesSchema, DrinkSchema, DrinksSchema, RecipeAPIResponseSchema, SearchFilterSchema } from '../utils/recipes-schema'

export type CategoriesResponse  = z.infer<typeof CategoriesSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksSchema>
export type Drink = z.infer<typeof DrinkSchema>
export type SelectedRecipe = z.infer<typeof RecipeAPIResponseSchema>