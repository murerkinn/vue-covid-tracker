import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const mutations = {
  SET_COUNTRIES: "setCountries",
  SET_MAP_COUNTRIES: "setMapCountries",
  SET_TABLE_DATA: "setTableData",
  SET_COUNTRY: "setCountry",
  SET_COUNTRY_INFO: "setCountryInfo",
  SET_CASES_TYPE: "setCasesType",
  SET_MAP_CENTER: "setMapCenter",
  SET_MAP_ZOOM: "setMapZoom",
  SET_SPARKLINE_DATA: "setSparklineData"
};

const actions = {
  SORT_DATA: "sortData",
  GET_COUNTRIES: "getCountries",
  GET_COUNTRY_INFO: "getCountryInfo",
  SET_CASES_TYPE: "setCasesType",
  GET_SPARKLINE_DATA: "getSparklineData"
};

export default new Vuex.Store({
  state: {
    countries: [],
    mapCountries: [],
    tableData: [],
    country: "worldwide",
    countryInfo: {},
    casesType: "cases",
    mapCenter: { lat: 34.80746, lng: -40.4796 },
    mapZoom: 3,
    sparklineData: []
  },
  mutations: {
    [mutations.SET_COUNTRIES](state, countries) {
      state.countries = countries;
    },
    [mutations.SET_MAP_COUNTRIES](state, mapCountries) {
      state.mapCountries = mapCountries;
    },
    [mutations.SET_TABLE_DATA](state, data) {
      state.tableData = data;
    },
    [mutations.SET_COUNTRY](state, country) {
      state.country = country;
    },
    [mutations.SET_COUNTRY_INFO](state, info) {
      state.countryInfo = info;
    },
    [mutations.SET_CASES_TYPE](state, type) {
      state.casesType = type;
    },
    [mutations.SET_MAP_CENTER](state, center) {
      state.mapCenter = center;
    },
    [mutations.SET_MAP_ZOOM](state, zoom) {
      state.mapZoom = zoom;
    },
    [mutations.SET_SPARKLINE_DATA](state, data) {
      state.sparklineData = data;
    }
  },
  actions: {
    [actions.SORT_DATA](store, data) {
      let sortedData = [...data];
      sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
      return sortedData;
    },
    async [actions.GET_COUNTRIES]({ dispatch, commit }) {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          let sortedData = dispatch(actions.SORT_DATA, data);
          commit(mutations.SET_COUNTRIES, countries);
          commit(mutations.SET_MAP_COUNTRIES, data);
          commit(mutations.SET_TABLE_DATA, sortedData);
        });
    },
    async [actions.GET_COUNTRY_INFO]({ commit }, countryCode) {
      const base = "https://disease.sh/v3/covid-19";
      const url =
        countryCode === "worldwide"
          ? `${base}/all`
          : `${base}/countries/${countryCode}`;
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          commit(mutations.SET_COUNTRY_INFO, data);
          if (countryCode !== "worldwide") {
            commit(mutations.SET_MAP_CENTER, [
              data.countryInfo.lat,
              data.countryInfo.long
            ]);
            commit(mutations.SET_MAP_ZOOM, 4);
          }
        });
    },
    async [actions.GET_SPARKLINE_DATA]({ state, commit }) {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response => response.json())
        .then(data => {
          commit(
            mutations.SET_SPARKLINE_DATA,
            Object.values(data[state.casesType])
          );
        });
    },
    [actions.SET_CASES_TYPE]({ commit }, type) {
      commit(mutations.SET_CASES_TYPE, type);
    }
  },
  modules: {}
});
