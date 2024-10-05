<script setup>
import { ref, onMounted } from 'vue'
import { usePhotoStore } from '../stores/photos'
import { useRouter } from 'vue-router'
import PhotoModal from '../components/PhotoModal.vue'
import PhotoGrid from '../components/PhotoGrid.vue'
import LoadingPlaceholder from '../components/LoadingPlaceholder.vue'

const photoStore = usePhotoStore()
const query = ref('')
const router = useRouter()
const selectedPhoto = ref(null)
const isModalOpen = ref(false)

const fetchPhotos = () => {
  if (query.value) {
    router.push({ name: 'search', query: { q: query.value } })
  } else {
    photoStore.getPhotos()
  }
}

const openModal = (photo) => {
  selectedPhoto.value = photo
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

onMounted(() => {
  fetchPhotos()
})
</script>

<template>
  <div class="container">
    <div class="container__backdrop">
      <div class="container__search-photos">
        <input
          class="container__input-elevated"
          v-model="query"
          @keyup.enter="fetchPhotos"
          type="text"
          placeholder="Search for photo"
        />
      </div>
    </div>
    <div v-if="photoStore.error">{{ photoStore.error }}</div>
    <LoadingPlaceholder v-if="photoStore.loading" />
    <PhotoGrid v-else class="photo-grid" :photos="photoStore.photos" :openModal="openModal" />
    <PhotoModal :photo="selectedPhoto" :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<style lang="scss">
.container {
  width: 100vw;
  margin: 0;
  height: 100vh;

  &__backdrop {
    background-color: #dde3e9;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__search-photos {
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__input-elevated {
    font-size: 16px;
    line-height: 1.5;
    border: none;
    background: #ffffff;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23838D99' d='M13.22 14.63a8 8 0 1 1 1.41-1.41l4.29 4.29a1 1 0 1 1-1.41 1.41l-4.29-4.29zm-.66-2.07a6 6 0 1 0-8.49-8.49 6 6 0 0 0 8.49 8.49z'></path></svg>");
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px 20px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    width: 1200px;
    height: 70px;
    padding: 0.5em 1em 0.5em 2.5em;
    transition: box-shadow 0.3s ease;
  }

  &__input-elevated::placeholder {
    color: #838d99;
  }

  &__input-elevated:focus {
    outline: none;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.16);
  }
}

.photo-grid {
  margin-top: -96px;
}

@media (max-width: 1024px) {
  .container__search-photos {
    padding: 90px;
  }

  .container__input-elevated {
    width: 700px;
  }
}
@media (max-width: 768px) {
  .container__search-photos {
    padding: 90px;
  }

  .container__input-elevated {
    width: 400px;
  }
}

@media (max-width: 600px) {
  .container__search-photos {
    padding: 30px;
  }

  .container__input-elevated {
    width: 300px;
  }
}
</style>
