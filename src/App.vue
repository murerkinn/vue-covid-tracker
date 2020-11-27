<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="9" md="8" sm="12">
            <v-row>
              <v-col>
                <Card
                  title="Cases"
                  :daily="`${countryInfo.todayCases}`"
                  :total="`${countryInfo.cases}`"
                />
              </v-col>
              <v-col>
                <Card
                  title="Recovered"
                  :daily="`${countryInfo.todayRecovered}`"
                  :total="`${countryInfo.recovered}`"
                />
              </v-col>
              <v-col>
                <Card
                  title="Death"
                  :daily="`${countryInfo.todayDeaths}`"
                  :total="`${countryInfo.deaths}`"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="3" md="4" sm="12">
            <v-card outlined class="px-4 pb-2">
              <v-select
                v-model="country"
                :items="['worldwide', ...countries]"
                item-text="name"
                item-value="value"
                menu-props="auto"
                label="Select"
                hide-details
                single-line
              ></v-select>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Card from "./components/Card";

export default {
  name: "App",
  data: () => ({
    country: "worldwide"
  }),
  computed: {
    ...mapState(["countries", "countryInfo"])
  },
  watch: {
    country: function(val) {
      this.getCountryInfo(val);
    }
  },
  components: {
    Card
  },
  methods: {
    ...mapActions(["getCountries", "getCountryInfo"])
  },
  created() {
    this.getCountries();
    this.getCountryInfo(this.country);
  }
};
</script>
