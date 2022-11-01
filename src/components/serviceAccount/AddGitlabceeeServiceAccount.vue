<template>
  <div class="add-service-account">
    gitlab ceee
    <FogInput size="mini" v-model="baseURL" placeholder="baseURL"></FogInput>
    <FogInput size="mini" v-model="name" placeholder="name"></FogInput>
    <FogInput size="mini" v-model="pat" placeholder="pat"></FogInput>
    <FogButton size="mini" @click="add">add</FogButton>
  </div>
</template>

<script setup lang="ts">
import { FogUserInfo } from "../../types/IUserInfo";
import { ref } from "vue";
import gitlabCEEEAxiosInstanceFactory, { IGitlabUserInfo } from "../../message/GitLab"

const baseURL = ref("http://192.168.180.113")
const name = ref("xieyuan")
const pat = ref("Lvkesk4Ce9xvzePS7S6-")

const add = async () => {
  const axiosInstance = gitlabCEEEAxiosInstanceFactory.getInstance(baseURL.value, name.value, pat.value)

  const user = await axiosInstance.listCurrentUser() as FogUserInfo<IGitlabUserInfo>

  console.log(user);
}

</script>

<style scoped>

</style>