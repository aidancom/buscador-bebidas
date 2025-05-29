import {createOpenRouter} from '@openrouter/ai-sdk-provider'

export const openRouter = createOpenRouter({
  apiKey: import.meta.env.VITE_AI_API_KEY
})