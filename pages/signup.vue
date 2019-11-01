<template>
  <v-layout>
    <v-flex class="text-center">
      <v-text-field color="white" label="Usuario" required />
      <v-text-field color="white" label="Contraseña" required />
      <v-text-field label="Name" required />
      <v-text-field label="Last Name" required />
      <v-text-field label="Phone" required />
      <!-- Register -->
      <div style="display:none">
        <v-text-field label="NIT" required />
        <v-text-field label="NIT EXT" required />
        <v-text-field label="Razon Social" required />
        <v-text-field label="Dirección" required />
        <v-text-field label="Celular/Teléfono de la Compañia" required />
        <v-text-field label="E-Mail de la Compañia" required />
        <v-text-field label="Web Site" required />
        <v-text-field label="PEP" required />
        <v-text-field label="CIIU" required />
        <v-text-field label="Descripción" required />
        <v-text-field label="Tipo de Compañia" required />
        <v-menu transition="slide-y-transition">
          <template>
            <v-btn color="white" class="ma-2">
              Slide Y Transition
            </v-btn>
          </template>
          <v-list>
            <v-list-item link>
              <v-list-item-title />
            </v-list-item>
          </v-list>
        </v-menu>
        <v-text-field label="ID Ciudad" required />
      </div>
      <v-btn class="mr-4">
        register
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'signup'
}
</script>

<style lang="scss" scoped>
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: grey;
}

.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: grey;
}
</style>
