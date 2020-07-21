<template>
<div>
     <q-dialog v-model="icon">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
            <Scanner></Scanner>
        </q-card-section>
      </q-card>
    </q-dialog>
<div>
 <q-layout view="lhh LpR lff">
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="camera" color="primary" @click="icon = true"/>
          </q-page-sticky>
    </q-layout>
</div>
</div>
</template>

<script>
import Scanner from 'components/Scanner'
export default {
  components: { Scanner },
  data () {
    return {
      icon: false
    }
  }
}
</script>

<style>

</style>
