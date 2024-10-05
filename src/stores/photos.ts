import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const clientId = import.meta.env.VITE_PUBLIC_UNSPLASH_CLIENT_ID
const UNSPLASH_ROOT = 'https://api.unsplash.com'

export const usePhotoStore = defineStore('photos', () => {
  const photos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getPhotosByQuery = async (query) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await axios.get(
        `${UNSPLASH_ROOT}/search/photos?query=${query}&client_id=${clientId}&per_page=27`
      )
      photos.value = data.results
    } catch (err) {
      console.log(err)

      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getPhotos = async () => {
    loading.value = true
    error.value = null

    try {
      const { data } = await axios.get(
        `${UNSPLASH_ROOT}/search/photos?query=Africa&client_id=${clientId}&per_page=8&order_by=latest`
      )
      photos.value = data.results
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { photos, loading, error, getPhotosByQuery, getPhotos }
})
