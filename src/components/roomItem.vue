<template>
  <div class="row roomItem--background">
    <div class="col room">
      {{ room }}
    </div>
    <div class="col-6 description">
      {{ description }}
    </div>
    <div class="col loadFactor">{{ loadFactor }}</div>
  </div>
</template>

<script>
export default {
  name: 'roomItem',
  props: {
    room: {
      type: String,
      required: true,
      default: '4.05'
    },
    description: {
      type: String,
      required: true,
      default: 'Arlanxeo'
    },
    loadFactor: {
      type: String,
      required: true,
      default: '5/10'
    }
  }
}
</script>

<style lang="sass" scoped>
.roomItem--background
  background-color: $primary
  color: $secondary
  padding: 8px
  font-size: 16px
  border-radius: 8px
  margin-top: 8px

.room
  font-weight: bold

.loadFactor
  text-align: end
</style>
