<script setup>
import { reactive, ref } from 'vue';
import { isEmpty } from 'lodash';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

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
      const userExisted = !isEmpty(userList.find(({ account }) => account === form.account));
      if (userExisted) {
        ElNotification({
          title: '警告',
          message: '此帳號已存在',
          type: 'error',
        });
      } else {
        userList.push(form);
        sessionStorage.setItem('userList', JSON.stringify(userList));
        ElNotification({
          title: '提示',
          message: '註冊成功',
          type: 'success',
        });
        router.push('/login');
      }
    }
  })
};

</script>

<template>
  <div class="login-form">
    <h1 class="title">註冊頁</h1>
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
      <el-row class="submit-button-wrapper" justify="center" :gutter="10">
        <el-form-item>
          <el-button type="primary" native-type="submit">註冊</el-button>
        </el-form-item>
      </el-row>
      <el-row justify="center" :gutter="10">
        <router-link to="/login">
          <el-button>已有帳號？前往登入</el-button>
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
.submit-button-wrapper {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
