import { create } from "zustand";
import { createRecipesSlices, type RecipesSliceType } from "./recipes-slice";
import { createFavoritesSlice, type FavoritesSliceType } from "./favorites-slice";
import { createNotificationSlice, type NotificationsSliceType } from "./notification-slice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationsSliceType>((set, get, api) => ({
  ...createRecipesSlices(set, get, api),
  ...createFavoritesSlice(set, get, api),
  ...createNotificationSlice(set, get, api)
}))