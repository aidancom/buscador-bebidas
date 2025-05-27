import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import type { SelectedRecipe } from '../types';

export default function Modal() {
  
  const modal = useAppStore(state => state.modal)
  const closeModal = useAppStore(state => state.closeModal)
  const selected = useAppStore(state => state.selected)
  const handleClickFavorites = useAppStore(state => state.handleClickFavorites)
  const favoriteExist = useAppStore(state => state.favoriteExist)
  const showNotification = useAppStore(state => state.showNotification)

  const renderIngredients = () => {
    const ingredients = []
    for (let i = 1; i <= 6; i++) {
      const ingredient = selected[`strIngredient${i}` as keyof SelectedRecipe]
      const mesure = selected[`strMeasure${i}` as keyof SelectedRecipe]
      if (ingredient && mesure) {
        ingredients.push(
          <li key={i} className='text-lg font-normal'>
            {ingredient}- {mesure}
          </li>
        )
      }
    }
    return ingredients
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                      {selected.strDrink}
                  </Dialog.Title>
                  <img 
                    src={selected.strDrinkThumb}
                    alt={`Imagen de ${selected.strDrink}`}
                    className='mx-auto w-96'
                  />
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes y Cantidades
                  </Dialog.Title>
                  {renderIngredients()}
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instrucciones
                  </Dialog.Title>
                  <p className='text-lg'>
                    {selected.strInstructions}  
                  </p>
                  <div className='mt-5 flex justify-between gap-4'>
                    <button
                      type='button'
                      className='w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500'
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                    <button
                      type='button'
                      className='w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500 cursor-pointer'
                      onClick={() => {
                        handleClickFavorites(selected)
                        closeModal()
                        if (favoriteExist(selected.idDrink)) {
                          showNotification({
                            text: 'Se agrego a favoritos',
                            error: false
                          })
                        } else {
                          showNotification({
                            text: 'Se elimino de favoritos',
                            error: false
                          })
                        }
                      }}
                    >
                      {favoriteExist(selected.idDrink) ? "Eliminar de favoritos" : "Agregar a favoritos"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}