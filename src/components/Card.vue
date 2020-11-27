<template>
  <v-card class="mx-auto" max-width="374">
    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>
      <div class="my-4 d-flex">
        <v-badge color="transparent">
          <template v-slot:badge>
            <v-icon small class="deep-purple--text darken-4">fa-virus</v-icon>
          </template>
          <h2>{{ daily }}</h2>
        </v-badge>
      </div>

      <div class="mt-6 d-flex">
        <v-badge color="transparent">
          <template v-slot:badge>
            <v-icon small class="red--text darken-4">fa-viruses</v-icon>
          </template>
          <h2>{{ total }}</h2>
        </v-badge>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: true
    },
    daily: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  }
};
</script>
