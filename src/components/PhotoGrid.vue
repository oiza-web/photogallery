<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  photos: {
    type: Array,
    required: true
  },
  openModal: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="grid-container">
    <div
      v-for="(photo, index) in photos"
      :key="photo.id"
      :class="`grid-container__item photo-${(index % 9) + 1}`"
      @click="() => openModal(photo)"
    >
      <img
        :src="photo.urls.small"
        :alt="photo.alt_description"
        class="grid-container__photo-item"
      />
      <div class="grid-container__overlay"></div>
      <div class="grid-container__photo-item__info">
        <p class="grid-container__photo-item__info-name">{{ photo.user.name }}</p>
        <p class="grid-container__photo-item__info-location" v-if="photo.location">
          {{ photo.location.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.grid-container {
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr;
  grid-auto-rows: 125px;
  padding: 20px 160px;

  &__item {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;

    img {
      object-fit: cover;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }

    &.photo-1,
    &.photo-7,
    &.photo-9 {
      grid-row: span 3;
    }

    &.photo-2,
    &.photo-5,
    &.photo-6 {
      grid-row: span 5;
    }

    &.photo-3,
    &.photo-4,
    &.photo-8 {
      grid-row: span 4;
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.42);
    opacity: 0.6;
    transition: opacity 0.3s ease;
    border-radius: 10px;
    z-index: 1;
  }

  &__photo-item__info {
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: white;
    font-weight: 800;
    z-index: 2;

    &-name {
      font-size: 20px;
    }

    &-location {
      font-size: 14px;
    }
  }

  &:hover {
    &__overlay {
      opacity: 1;
    }
  }
}

@media (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 60px;
  }
}

@media (min-width: 900px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
    padding: 60px 180px;
  }
}

@media (max-width: 600px) {
  .grid-container {
    padding: 20px;

    &__item {
      &__info {
        padding: 4px;
      }
    }
  }
}
</style>
