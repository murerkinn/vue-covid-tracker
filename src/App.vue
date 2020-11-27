<template>
  <div id="app">
    <div id="left">
      <div class="card-container">
        <ul>
          <li class="card transition2" v-for="x in 3" :key="x"></li>
        </ul>
      </div>
      <div class="map-container"></div>
    </div>
    <div id="right"></div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Poppins", sans-serif;
}

div {
  text-align: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

#app {
  height: 100vh;
  display: flex;
}

#left {
  padding: 1em;
  flex: 0.8;
}

#right {
  flex: 0.2;
}

.card-container .card {
  background-color: blue;
  padding: 2em;
  border-radius: 0.4em;
  margin-bottom: 1em;
}

.map-container {
  border-radius: 0.4em;
}

@media only screen and (min-width: 800px) {
  .card-container {
    padding: 3em 6em;
  }

  .card-container ul {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-gap: 2em;
  }
}

@media only screen and (max-width: 1000px) {
  #app {
    flex-direction: column;
  }

  #left,
  #right {
    flex: unset;
  }
}
</style>
