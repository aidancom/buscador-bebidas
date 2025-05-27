import type { StateCreator } from "zustand"

type Notifiacion = {
  text: string,
  error: boolean,
  show: boolean
}

export type NotificationsSliceType =  {
  notifaction: Notifiacion,
  showNotification: (payload: Pick<Notifiacion, 'text' | 'error'>) => void,
  hideNotification: () => void
}

export const createNotificationSlice: StateCreator<NotificationsSliceType> = (set, get) => ({
  notifaction: {
    text: '',
    error: false,
    show: false
  },
  showNotification: (payload) => {
    set(() => ({
      notifaction: {
        text: payload.text,
        error: payload.error,
        show: true
      }
    }))
    setTimeout(() => {
      get().hideNotification()
    }, 2000);
  },
  hideNotification: () => {
    set(() => ({
        notifaction: {
        text: '',
        error: false,
        show: false
      },
    }))
  }
})