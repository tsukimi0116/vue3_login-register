<script setup>
import { isEmpty } from 'lodash';
import { useRouter } from 'vue-router';

const userList = sessionStorage.getItem('userList');
if (isEmpty(userList)) sessionStorage.setItem('userList', JSON.stringify([]));
const router = useRouter();
const loginInfo = sessionStorage.getItem('loginInfo');
if (isEmpty(loginInfo)) router.push('/login');

</script>

<template>
  <h1>我是首頁</h1>
</template>

<style scoped>

</style>
