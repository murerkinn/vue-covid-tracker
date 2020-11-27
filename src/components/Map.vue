<template>
  <l-map style="height: 60vh" :zoom="mapZoom" :center="mapCenter">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
    <l-circle
      v-for="(country, index) in mapCountries"
      :key="index"
      :lat-lng="[country.countryInfo.lat, country.countryInfo.long]"
      :radius="
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      "
      :color="casesTypeColors[casesType].hex"
      :fill-color="casesTypeColors[casesType].hex"
      :opacity="0.4"
    >
      <l-popup>
        <div class="info-container">
          <!-- <div
            class="info-flag"
            style="'background-image:' + `url(${country.countryInfo.flag})`"
        ></div> -->
          <div class="info-name">{{ country.country }}</div>
          <div class="info-confirmed">
            <strong>Cases:</strong> {{ country.cases }}
          </div>
          <div class="info-recovered">
            <strong>Recovered:</strong> {{ country.recovered }}
          </div>
          <div class="info-deaths">
            <strong>Deaths:</strong> {{ country.deaths }}
          </div>
        </div>
      </l-popup>
    </l-circle>
  </l-map>
</template>

<script>
import { mapState } from "vuex";
import { LMap, LTileLayer, LCircle, LPopup } from "vue2-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#cc1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000
  }
};

export default {
  name: "Map",
  data: () => ({
    casesTypeColors
  }),
  computed: {
    ...mapState(["mapCountries", "mapZoom", "mapCenter", "casesType"])
  },
  components: {
    LMap,
    LTileLayer,
    LCircle,
    LPopup
  }
};
</script>

<style scoped>
.info-container {
  width: 150px;
}
.info-name {
  font-size: 20px;
  font-weight: bold;
  color: #555;
}
.info-confirmed,
.info-recovered,
.info-deaths {
  font-size: 16px;
  margin-top: 5px;
}
</style>
