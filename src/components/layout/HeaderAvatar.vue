<template>
  <div style="float:right;">
    <a-dropdown
      class="header-item"
      style="display: inline-block; height: 100%; vertical-align: initial"
    >
      <span style="cursor: pointer">
        <a-avatar
          style="margin: 20px 4px 20px 0;color: #1890ff;background: hsla(0, 0%, 100%, 0.85);"
          size="small"
          shape="circle"
          icon="user"
        />
        <!--:src="currUser.avatar"-->
        <span>
          <span>{{currUser.nick}}</span>
        </span>
      </span>
      <a-menu style="width: 150px" slot="overlay">
        <a-menu-item>
          <a-icon type="user" />
          <span>个人中心</span>
        </a-menu-item>
        <a-menu-item>
          <a-icon type="setting" />
          <span>设置</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click="logout">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>

export default {
  name: "HeaderAvatar",
  methods: {
    logout() {
      var vm=this;
      this.$confirm({
        title: "您确定要退出登录?",
        content: "确认退出点击“确定”，关闭点“取消”。",
        onOk() {
          vm.$store.commit("account/removeuser");
          vm.$router.push("/login");
        }
      });

    }
  },
  computed: {
    currUser() {
      return this.$store.state.account.user;      
    }
  }
};
</script>

<style lang="less" scoped>
.header-item {
  padding: 0 12px;
  display: inline-block;
  height: 100%;
  cursor: pointer;
  vertical-align: middle;
  i {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>