<template>
  <div id="banner">
    <v-banner class="title-storent" sticky height="250" width="96%">
      <div style="line-height: 0.8; ">
        Mucho más cerca de tí.
        <br>Almacena todo con Storent.
      </div>
      <template v-slot:actions>
        <v-btn>Aprender más</v-btn>
      </template>
    </v-banner>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    this.initProcess()
  },
  methods: {
    initProcess () {}
  }
}
</script>

<style lang="scss" scoped>
#banner {
  background-image: url("/images/banner.png") !important;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 2rem !important;
}

#banner::before {
  border-radius: 2rem !important;
  background-color: $main-color-dispose;
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  width: 100%;
}

.title-storent {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: transparent;
  line-height: normal !important;
}
.v-banner__text {
  line-height: 0.8 !important;
}
</style>
