import {streamText} from 'ai'
import { openRouter } from '../lib/ai'

export default {
  async generateRecipe(prompt: string) {
    const result = streamText({
      model: openRouter('meta-llama/llama-3.3-70b-instruct:free'),
      prompt,
      system: 'Eres un bartender profesional con mas de 30 años de experiencia'
    })

    return result.textStream
  }
}