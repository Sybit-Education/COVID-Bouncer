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
  name: 'CircularLoad',
  props: {
    loadFactor: {
    },
    value: {
    }
  }
}
</script>
