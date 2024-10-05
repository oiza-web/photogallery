<script setup></script>

<template>
  <div class="grid-container">
    <div
      v-for="(index, photo) in 9"
      :key="photo"
      :class="`grid-container__item photo-${(index % 9) + 1}`"
    >
      <div class="grid-container__photo-item__info">
        <p class="grid-container__photo-item__info-name"></p>
        <p class="grid-container__photo-item__info-location"></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    background-color: #f6f6f6;

    &.photo-1,
    &.photo-7,
    &.photo-9 {
      grid-row: span 5;
    }

    &.photo-2,
    &.photo-5,
    &.photo-6 {
      grid-row: span 3;
    }

    &.photo-3,
    &.photo-4,
    &.photo-8 {
      grid-row: span 4;
    }
  }

  &__photo-item__info {
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: white;
    font-weight: 800;
    z-index: 2;

    &-name {
      height: 10px;
      width: 100px;
      margin-bottom: 10px;
      background-color: #e7e7e7;
    }

    &-location {
      height: 10px;
      width: 80px;
      background-color: #e7e7e7;
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
