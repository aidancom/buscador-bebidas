import { useAppStore } from '../stores/useAppStore'
import type { Drink } from '../types'

type DrinkType = {
  drink: Drink
}

const DrinkCard = ({drink}: DrinkType) => {

  const selectRecipe = useAppStore(state => state.selectRecipe)

  return (
    <div className='shadow-lg'>
      <div className='overflow-hidden'>
        <img 
          src={drink.strDrinkThumb} 
          alt={`Imagen de ${drink.strDrink}`} 
          className='transition hover:scale-125 hover:rotate-2'
        />
      </div>
      <div className='p-5'>
        <h2 className='text-2xl truncate font-black'>{drink.strDrink}</h2>
        <button 
          type="button" 
          className='bg-orange-400 transition hover:bg-orange-500 mt-5 w-full font-bold p-3 text-white text-lg cursor-pointer'
          onClick={() => selectRecipe(drink.idDrink)}
        >Ver receta</button>
      </div>

    </div>
  )
}

export default DrinkCard
