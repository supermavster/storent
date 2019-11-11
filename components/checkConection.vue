<template>
  <div>
    <v-alert
      v-if="!isOnline"
      type="error"
      icon="mdi-alert-circle"
      transition="scale-transition"
    >
      ¡Algo no anda bien!<br>Revisa tu conexión de Internet
    </v-alert>
  </div>
</template>

<script>
if (process.browser) {
//   console.log(navigator)
}

if (process.server) {
//   console.log(navigator)
}

export default {
  props: {
    slotName: {
      type: String,
      required: false,
      default: 'online'
    },
    onlineClass: {
      type: String,
      required: false,
      default: ''
    },
    offlineClass: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      isOnline: true,
      EVENTS: ['online', 'offline', 'load']
    }
  },
  computed: {
    computedClass () {
      return this.isOnline ? this.onlineClass : this.offlineClass
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined' && window !== null) {
      this.EVENTS.forEach(event => window.removeEventListener(event, this.updateOnlineStatus))
    }
  },
  created () {
    this.initProcess()
  },
  methods: {
    initProcess () {
      if (typeof navigator !== 'undefined' && navigator !== null) {
        this.isOnline = navigator.onLine
      }
      if (typeof window !== 'undefined' && window !== null) {
        this.EVENTS.forEach(event => window.addEventListener(event, this.updateOnlineStatus))
      }
    },
    updateOnlineStatus () {
    //   this.isOnline = navigator.onLine || false
      this.$emit('detected-condition', this.isOnline)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
    background-color: transparent;
}
</style>
