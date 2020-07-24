<template>
  <div class=main-container>
    <div>
      <h3 class="custom-h3">COVID Bouncer</h3>
    </div>
    <headline headline="Raumliste" />
    <div class="roomList">
      <roomList></roomList>
    </div>
    <div>
      <QrScannerIcon></QrScannerIcon>
    </div>
  </div>
</template>

<script>
import roomList from 'components/roomList'
import headline from 'components/headline'
import QrScannerIcon from 'components/QrScannerIcon'

export default {
  name: 'PageIndex',
  components: { roomList, headline, QrScannerIcon }
}
</script>

<style lang="sass" scoped>
.main-container
  padding: 0 8px

.custom-h3
  margin: 0
</style>
