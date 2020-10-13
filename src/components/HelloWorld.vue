<template>
  <div>
    <h1></h1>
    <ul>
      <li :key="item.key" v-for="item in testCollection">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      testCollection: []
    }
  },
  mounted () {
    const db = this.$firebase.firestore()
    db
      .collection('Rooms')
      .get()
      .then(snap => {
        const testCollection = []
        snap.forEach(doc => {
          testCollection.push({ [doc.id]: doc.data() })
        })
        console.log(testCollection)
        this.testCollection = testCollection
      })
  }
}
</script>

<style lang="scss">
</style>
