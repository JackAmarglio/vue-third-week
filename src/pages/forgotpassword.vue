<template>
  <div class="forgot">
      <v-text-field
          @keyup="submit"
          placeholder="Password"
          color="white"
          background-color="grey"
          v-model="password"
          outlined
          hide-details
          dense
          type="password"
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
        @click="resetpassword()"
        >OK</v-btn
      >
  </div>
</template>

<script>
import axios from "axios";
export default {
    methods: {
        resetpassword() {
            axios({
                url: "http://localhost:8000/api/changepassword",
                data: {token:this.$route.params.token, password: this.password},
                method: "POST"
            })
            .then(() => this.$router.push("/"))
            .catch((err) => console.log(err))
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