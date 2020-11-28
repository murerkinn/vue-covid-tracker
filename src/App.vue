<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col lg="9" md="8" sm="12">
            <v-row>
              <v-col md="4" xs="12">
                <Card
                  style="border-left: 4px solid #1867C0"
                  title="Cases"
                  :daily="`${countryInfo.todayCases}`"
                  :total="`${countryInfo.cases}`"
                  @change-case-type="setCasesType('cases')"
                />
              </v-col>
              <v-col md="4" xs="12">
                <Card
                  style="border-left: 4px solid #7dd71d"
                  title="Recovered"
                  :daily="`${countryInfo.todayRecovered}`"
                  :total="`${countryInfo.recovered}`"
                  @change-case-type="setCasesType('recovered')"
                />
              </v-col>
              <v-col md="4" xs="12">
                <Card
                  style="border-left: 4px solid #fb4443"
                  title="Deaths"
                  :daily="`${countryInfo.todayDeaths}`"
                  :total="`${countryInfo.deaths}`"
                  @change-case-type="setCasesType('deaths')"
                />
              </v-col>
            </v-row>
            <v-row class="d-none d-sm-flex d-md-none">
              <v-col>
                <v-card class="px-4 pb-3" outlined>
                  <v-select
                    v-model="country"
                    :items="[
                      { name: 'Worldwide', value: 'worldwide' },
                      ...countries
                    ]"
                    item-text="name"
                    item-value="value"
                    menu-props="auto"
                    hide-details
                    prepend-icon="fa-globe"
                    style="z-index: 999"
                  ></v-select>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                  <v-tabs
                    dark
                    v-model="tab"
                    background-color="teal darken-3"
                    color="teal lighten-3"
                    class="mb-1"
                  >
                    <v-tab>
                      Map
                    </v-tab>
                    <v-tab>
                      Sparkline
                    </v-tab>
                  </v-tabs>
                </v-card>
                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <v-card outlined>
                      <Map />
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card outlined class="px-4 pb-2">
                      <v-sparkline
                        :value="sparklineData"
                        :gradient="['#f72047', '#ffd200', '#1feaea']"
                        :smooth="10 || false"
                        :padding="8"
                        :line-width="2"
                        stroke-linecap="round"
                        gradient-direction="top"
                        :fill="false"
                        type="trend"
                        :auto-line-width="false"
                        auto-draw
                      ></v-sparkline>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="3" md="4" class="d-none d-md-flex">
            <v-simple-table dense height="92vh">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Flag</th>
                    <th class="text-left">Country</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="country in countries"
                    :key="country.value"
                    @click="setCountryVal(country.value)"
                    style="cursor: pointer;"
                  >
                    <td>{{ country.value }}</td>
                    <td>{{ country.name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            {{ new Date().getFullYear() }} —
            <strong>Vue Covid Tracker by Murat Erkin Cicek</strong>
          </v-col>
          <v-fab-transition>
            <v-btn
              href="https://github.com/murerkinn/vue-covid-tracker"
              target="_blank"
              style="position: absolute; right: 50px; bottom: 50px;"
              dark
              fab
            >
              <v-icon>fab fa-github</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Card from "./components/Card";
import Map from "./components/Map";

export default {
  name: "App",
  data: () => ({
    country: "worldwide",
    tab: null
  }),
  computed: {
    ...mapState(["countries", "countryInfo", "sparklineData"])
  },
  watch: {
    country: function(val) {
      this.getCountryInfo(val);
    }
  },
  components: {
    Card,
    Map
  },
  methods: {
    ...mapActions([
      "getCountries",
      "getCountryInfo",
      "setCasesType",
      "getSparklineData"
    ]),
    setCountryVal(val) {
      this.country = val;
    }
  },
  created() {
    this.getCountries();
    this.getCountryInfo(this.country);
  }
};
</script>
