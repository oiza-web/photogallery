<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePhotoStore } from '../stores/photos'
import PhotoModal from '../components/PhotoModal.vue'
import PhotoGrid from '../components/PhotoGrid.vue'
import LoadingPlaceholder from '../components/LoadingPlaceholder.vue'

const route = useRoute()
const photoStore = usePhotoStore()
const query = ref(route.query.q)
const selectedPhoto = ref(null)
const isModalOpen = ref(false)

const openModal = (photo) => {
  selectedPhoto.value = photo
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const formattedQuery = computed(() => {
  return query.value ? query.value.charAt(0).toUpperCase() + query.value.slice(1) : ''
})

onMounted(() => {
  if (query.value) {
    photoStore.getPhotosByQuery(query.value)
  }
})
</script>

<template>
  <div class="container">
    <div class="container__backdrop">
      <h1>
        Search Results for: <span class="query">"{{ formattedQuery }}"</span>
      </h1>
    </div>
    <LoadingPlaceholder v-if="photoStore.loading" />
    <div class="no-results" v-else-if="photoStore.photos.length < 1">No Results found</div>
    <PhotoGrid v-else class="photo-grid" :photos="photoStore.photos" :openModal="openModal" />
    <PhotoModal :photo="selectedPhoto" :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<style lang="scss">
.container {
  .container__backdrop {
    h1 {
      color: $color-primary;
      font-size: 2.125rem;
      font-weight: bold;

      @media (max-width: 768px) {
        font-size: 1.75rem;
      }

      @media (max-width: 480px) {
        font-size: 1.5rem;
      }

      @media (max-width: 320px) {
        font-size: 1rem;
      }

      .query {
        color: $color-secondary;
        font-weight: bold;
        font-size: inherit;

        @media (max-width: 768px) {
          font-size: inherit;
        }

        @media (max-width: 480px) {
          font-size: inherit;
        }

        @media (max-width: 320px) {
          font-size: inherit;
        }
      }

      .no-results {
          color: $color-secondary;
          font-weight: bold;
          font-size: inherit;
      }
    }
  }
}
</style>
