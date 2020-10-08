<template>
  <div class=main-container>
    <h3 class="custom-h3">COVID Bouncer</h3>

    <headline headline="Für heute gebuchter Raum"/>
    <current-booked-room />

    <headline headline="Raumliste"/>
    <roomList />

    <div>
      <headline headline="Aktuelle Corona-Zahlen" />
      <covid-statistic :objectIds="this.covidIds"/>
    </div>
    <q-footer>
      <p>Benutzer: <current-user-item /></p>
    </q-footer>
  </div>
</template>

<script>
import roomList from 'components/RoomList'
import CurrentBookedRoom from 'components/CurrentBookedRoom'
import headline from 'components/headline'
import CurrentUserItem from 'components/CurrentUserItem'
import CovidStatistic from 'components/CovidStatistic'

export default {
  name: 'PageIndex',
  components: { roomList, CurrentBookedRoom, headline, CurrentUserItem, CovidStatistic },

  data () {
    return {
      covidIds: process.env.VUE_APP_COVID_STATISTIC_OBJECT_ID_LIST
    }
  }
}
</script>

<style lang="sass" scoped>
.main-container
  padding: 0 8px

.custom-h3
  margin: 0
</style>
