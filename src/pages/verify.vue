<template>
  <div>
      <v-alert type="success">Your email has verified. </v-alert>
  </div>
</template>

<script>

import axios from "axios";
export default {
    mounted() {
        
        axios({
            url: "https://byself-laravel.herokuapp.com/api/verify",
            data: {token:this.$route.params.token},
            method: "POST"
        })
    },
}
</script>

<style>

</style>