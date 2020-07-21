<template>
      <q-circular-progress
      show-value
      :value="value"
      size="40px"
      color= $secondary
    >{{ loadFactor }}</q-circular-progress>
</template>

<script>
export default {
  name: 'roomItem',
  props: {
    loadFactor: {
      type: String,
      required: true,
      default: '5/10'
    },
    value: {
    }
  }
}
</script>
