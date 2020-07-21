<template>
  <div class=main-container>
    <div>
      <h3>COVID Bouncer</h3>
    </div>
    <headline></headline>
    <div>
      <roomItem></roomItem>
    </div>
    <div>
      <QrScannerIcon></QrScannerIcon>
    </div>
  </div>
</template>

<script>
import roomItem from 'components/roomItem'
import headline from 'components/headline'
import QrScannerIcon from 'components/QrScannerIcon'
export default {
  name: 'PageIndex',
  components: { roomItem, headline, QrScannerIcon }
}
</script>

<style lang="sass" scoped>
.main-container
  padding: 0px 8px
</style>
