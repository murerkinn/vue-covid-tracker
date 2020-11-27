<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="9" md="8" sm="12">
            <v-row>
              <v-col>
                <Card title="Cases" :daily="12345" :total="98765" />
              </v-col>
              <v-col>
                <Card title="Recovered" :daily="12345" :total="98765" />
              </v-col>
              <v-col>
                <Card title="Death" :daily="12345" :total="98765" />
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="3" md="4" sm="12">
            <v-card outlined>
              <v-select
                v-model="country"
                :items="countries"
                item-text="name"
                item-value="value"
                menu-props="auto"
                label="Select"
                hide-details
                prepend-icon="fa-map"
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
    ...mapState(["countries"])
  },
  watch: {
    country() {
      console.log("country changed to: ", this.country);
      this.getCountryInfo(this.country);
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
  }
};
</script>
