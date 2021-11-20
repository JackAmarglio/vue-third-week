<template>
  <div class="forgot">
    <v-text-field
        @keyup="submit"
        placeholder="Email"
        color="white"
        background-color="grey"
        v-model="email"
        outlined
        hide-details
        dense
        type="email"
      ></v-text-field>
      <v-btn
      style="margin-top: 30px"
      width="100%"
      height="40px"
      color="#FF2D34"
      depressed
      :loading="loading"
      dark
      up
      @click="sendrequest()"
      >Send</v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: null
    }
  },
  methods: {
      sendrequest() {
        axios({
            url: "http://localhost:8000/api/resetpassword",
            data: {email: this.email},
            method: "POST"
        })
      }
  }
}
</script>

<style>
.forgot {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 20%;
  left: 50%;
  background-color: white;
  padding: 50px;
  margin-top: 100px;
  border-radius: 20px;
  border: black solid 5px;
  opacity: 1;
}
</style>