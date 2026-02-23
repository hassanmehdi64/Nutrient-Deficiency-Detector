import { apiClient } from './client'

export const sendAgriBotMessage = async ({ message, analysis }) => {
  const data = await apiClient.sendChat({ message, analysis })
  return data.reply
}
