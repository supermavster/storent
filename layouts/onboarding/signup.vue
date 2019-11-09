<template>
  <v-app>
    <v-content>
      <v-container class="fill-height storent-background-second" fluid>
        <v-col class="fill-height" cols="12" sm="12" md="12">
          <v-row id="content">
            <v-col cols="4" sm="4" md="4" class="mx-1 main-box">
              <v-btn text to="/" class="mx-2 my-2">
                <img height="30" src="/images/logo-white.png">
              </v-btn>
              <div class="circle" />
              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
              <h1 class="my-9 title-storent text-left">
                Registro de <br>usuario
              </h1>
              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
              <div class="text-left">
                <a href="#">
                  Contactanos
                </a>
                <br style="height:1px">
                <v-btn class="signin" text to="/onboarding/login">
                  Iniciar Sesión
                </v-btn>
              </div>
            </v-col>
            <v-col cols="7" sm="7" md="7" class="ml-10 main-box">
              <nuxt />
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  background: transparent;
  overflow-y: hidden;
  overflow-x: hidden;
}

.title-storent {
  font-weight: unset !important;
  font-size: 3rem !important;
}

.circle {
  left: 30.5% !important;
  top: -70% !important;
  z-index: 0;
}

.boxs {
  left: 0rem;
  top: 10rem;
}

a {
  font-size: 15px;
  text-decoration: none;
  color: white !important;
}

.signin {
  height: 15px !important;
  font-weight: bold;
  font-size: 15px;
  text-decoration: none;
  color: white !important;
  letter-spacing: normal;
  padding: 0 !important;
}
</style>
