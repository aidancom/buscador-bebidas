import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

const Favorites = () => {

  const favorites = useAppStore(state => state.favorites)

  return (
    <div>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>
     
        {favorites.length ? (
           <div className="grid gird-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 my-10">
           {favorites.map(favorite => (
            <DrinkCard
              key={favorite.idDrink}
              drink={favorite}
            />
            ))}
          </div>
        ) : (
         <p className="my-10 text-center text-2xl">
          Los favoritos se mostraran aquí
         </p>
        )}

    </div>
  )
}

export default Favorites
