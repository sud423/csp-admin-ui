<template>
  <div class="wrap">
    <div class="split-bg">
      <div class="layout align-center justify-center" style="min-height: 100vh;">
        <a-row type="flex" justify="center" style="width:100%;">
          <a-col :xs="22" :sm="24" :md="16" :lg="8" :xl="8">
            <a-card hoverable>
              <div class="layout align-center justify-center main">
                <img
                  slot="cover"
                  width="120"
                  alt="example"
                  src="http://vma.isocked.com/static/m.png"
                />
                <h1>欢迎登录</h1>
              </div>

              <a-form layout="vertical" :form="form" @submit="handleSubmit" hide-required-mark>
                <a-form-item label="用户名">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入用户名"
                    v-decorator="[
          'username',
          { rules: [{ required: true, message: '用户名不能为空' }] },
        ]"
                  >
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item label="密码">
                  <a-input
                    placeholder="请输入密码"
                    type="password"
                    v-decorator="[
          'password',
          { rules: [{ required: true, message: '密码不能为空' }] },
        ]"
                  >
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <!-- <a-checkbox
                v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: false,
          },
        ]"
              >Remember me</a-checkbox>
                  <a class="login-form-forgot" href>Forgot password</a>-->
                  <a-button
                    type="primary"
                    html-type="submit"
                    block
                    style="background:#00bcd4; border-color:#00bcd4;"
                    :loading="isLoading"
                  >登录</a-button>
                  <!-- Or<a href>register now!</a> -->
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
// import jwt_decode from 'jwt-decode'

export default {
  data() {
    return {
      isLoading: false,
      form: this.$form.createForm(this)
    };
  },
  beforeCreate() {
    // this.form = this.$form.createForm(this, { name: "login" });
  },
  mounted() {
    // console.log(process.env.NODE_ENV);
    // console.log(process.env.VUE_APP_BASE_API_URL);
    // console.log(process.env.FOO);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isLoading = true;
          this.$axios({
            method: "post",
            url: "u/api/v1/account/sigin",
            data: values
          })
            .then(res => {
              this.$store.commit("account/setuser", res);
              
              var vm = this;
              setTimeout(function() {
                vm.$router.push("/dashboard");
              }, 0);
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  flex: 1 1 auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
}
.split-bg {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
  background-color: #00bcd4 !important;
  border-color: #00bcd4 !important;
}

.layout {
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-wrap: nowrap;
  min-width: 0;
}

.align-center {
  align-items: center !important;
}

.justify-center {
  justify-content: center !important;
}

.main {
  flex: unset;
  display: block;
  text-align: center;
  h1 {
    color: #00bcd4 !important;
    caret-color: #00bcd4 !important;
    font-size: 2.125rem !important;
    line-height: 2.5rem;
    letter-spacing: 0.0073529412em !important;
  }
}
.login-form-forgot {
  float: right;
}
</style>