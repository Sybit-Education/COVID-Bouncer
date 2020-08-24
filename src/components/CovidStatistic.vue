<template>
<div>
  <q-spinner v-if="!data"
        color="primary"
        size="3em"
        :thickness="4"
      />

  <q-carousel
    v-if="data"
    v-model="slide"
    transition-prev="scale"
    transition-next="scale"
    arrows
    padding
    swipeable
    animated
    infinite
    :autoplay="autoplay"
    height="250px"
    >

    <q-carousel-slide v-for="(item, index) in data" :key="item.attributes.OBJECTID" :name="index">
      <h3 class="text-subtitle1">{{ item.attributes.BEZ }} {{ item.attributes.GEN }}</h3>
      <table>
        <tr>
          <th>Fälle der letzten 7 Tage/100.000 EW</th>
          <td>
            <b :class="color(item.attributes.cases7_per_100k)">{{ item.attributes.cases7_per_100k  | number('0.00', { decimalSeparator: ',' }) }}</b>
            <q-icon v-if="item.attributes.cases7_per_100k > 40" name="warning" class="text-red" style="font-size: 2rem;" />
          </td>
        </tr><tr>
          <th>Anzahl Fälle</th>
          <td>{{ item.attributes.cases }}</td>
        </tr><tr>
          <th>Anzahl Todesfälle</th>
          <td>{{ item.attributes.deaths }}</td>
        </tr><tr>
          <th>Aktualisiert</th>
          <td>{{ item.attributes.last_update }}</td>
        </tr>
      </table>
    </q-carousel-slide>
  </q-carousel>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CovidStatistic',
  props: {
    // comma separated List of objectIds.
    // See: https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0
    objectIds: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      slide: '-1',
      autoplay: false,
      data: null
    }
  },
  created () {
    this.getData().then(data => {
      this.data = data
      this.autoplay = true
    })
  },
  methods: {
    async getData () {
      const url = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=OBJECTID in (' +
        this.objectIds +
        ')&outFields=objectId,death_rate,cases,deaths,cases_per_100k,cases_per_population,last_update,cases7_per_100k,EWZ,BEZ,GEN&returnGeometry=false&f=json'
      const httpClient = axios.create({
        baseURL: url,
        timeout: 10000, // indicates, 10000ms ie. 10 second
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await httpClient.get()
      if (result.error) {
        console.error(result.error)
      }
      return result.data.features
    },
    color (value) {
      let col = ''
      if (value >= 50) {
        col = 'bg-negative'
      } else if (value >= 40 && value < 50) {
        col = 'text-negative'
      } else if (value >= 10 && value < 40) {
        col = 'text-warning'
      }
      return col
    }
  }
}
</script>

<style>
th {
  text-align: left;
  border-bottom: solid 1px;
}
td {
  border-bottom: solid 1px;
}
</style>
