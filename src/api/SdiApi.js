import axios from 'axios'
import * as constants from '../constants/appConstants'

const client = axios.create({
  baseURL: constants.getApiURL(),
  headers: { 'Accept': 'application/json,' }
})

export const getConfig = async () => {
  try {
    const response = await client.get('/config')
    return response.data
  } catch (error) {
    alert(error)
  }
}

export const listAllMonit = async () => {
  try {
    const response = await client.get('/monit')
    const data = response.data
    return data
  } catch (error) {
    alert(error)
  }
}

export const listAllMonitTimer = async () => {
  try {
    const response = await client.get('/monitTimer')
    const data = response.data
    return data
  } catch (error) {
    alert(error)
  }
}

export const listAllMonitDetails = async (idMonit) => {
  try {
    const response = await client.get(`/monit/${idMonit}`)
    const data = response.data
    return data
  } catch (error) {
    alert(error)
  }
}