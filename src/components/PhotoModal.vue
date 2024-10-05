<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  photo: Object,
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal" v-if="isOpen">
    <div class="modal__content">
      <span class="modal__close" @click="closeModal">&times;</span>
      <img :src="photo.urls.regular" :alt="photo.alt_description" class="modal__photo" />
      <div class="modal__photo-details">
        <h2 class="modal__photo-name">{{ photo.user.name }}</h2>
        <p class="modal__photo-location" v-if="photo.location">{{ photo.location.name }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;

  &__content {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    width: 80%;
    max-width: 700px;
    position: relative;
    height: 700px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  &__close {
    cursor: pointer;
    font-size: 24px;
    position: absolute;
    top: 15px;
    right: 20px;
    color: #fff;
  }

  &__photo {
    width: 100%;
    height: 600px;
  }

  &__photo-details {
    padding: 20px;
    text-align: left;
  }

  &__photo-name {
    font-weight: bold;
    font-size: 1.5em;
    margin: 0;
  }

  &__photo-location {
    margin: 0;
    font-size: 1em;
    color: #666;
  }
}
</style>
