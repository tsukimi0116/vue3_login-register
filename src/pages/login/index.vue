<script setup>
import { reactive, ref } from 'vue';
import { isEmpty } from 'lodash';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const hasLoginInfo = !isEmpty(sessionStorage.getItem('loginInfo'));
if (hasLoginInfo) router.push('/');

const formRef = ref();

const form = reactive({
  account: '',
  password: '',
});

const rules = reactive({
  account: [
    {
      required: true,
      trigger: 'change',
      message: '請輸入帳號',
    },
  ],
  password: [
    {
      required: true,
      trigger: 'change',
      message: '請輸入密碼',
    },
  ]
});

const onSubmit = () => {
  formRef.value.validate(valid => {
    if (valid) {
      const userList = JSON.parse(sessionStorage.getItem('userList'));
      const userInfo = userList.find(({ account }) => account === form.account);
      if (isEmpty(userInfo)) {
        ElNotification({
          title: '警告',
          message: '帳號輸入錯誤',
          type: 'error',
        });
      } else if (form.password !== userInfo.password) {
        ElNotification({
          title: '警告',
          message: '密碼輸入錯誤',
          type: 'error',
        });
      } else {
        const loginInfo = { account: form.account, isLogin: true }
        sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo));
        ElNotification({
          title: '提示',
          message: '登入成功',
          type: 'success',
        });
        router.push('/');
      };
    }
  })
};

</script>

<template>
  <div class="login-form">
    <h1 class="title">登入頁</h1>
    <el-form 
      ref="formRef"
      :model="form"
      :rules="rules"
      @submit.prevent="onSubmit"
    >
      <el-form-item prop="account" label="帳號">
        <el-input v-model="form.account" placeholder="帳號"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密碼">
        <el-input v-model="form.password" placeholder="密碼"></el-input>
      </el-form-item>
      <el-row justify="center" :gutter="10">
        <el-button type="primary" @click="onSubmit">登入</el-button>
      </el-row>
      <el-row justify="center" :gutter="10">
        <router-link to="/register">
          <el-button>沒有帳號？點擊註冊</el-button>
        </router-link>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  width: 100%;
  padding: 0 30%;
  .title {
    text-align: center;
    margin: 4rem 0;
  }
}
.el-row {
  margin-bottom: 1.8rem;
}
</style>
