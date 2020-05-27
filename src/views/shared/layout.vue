<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-drawer
      v-if="isMobile"
      placement="left"
      :visible="collapsed"
      :bodyStyle="bodyStyle"
      @close="() => (collapsed = !collapsed)"
    >
      <sider-menu :menuData="menuData" :collapsed="false" :collapsible="false" />
    </a-drawer>
    <sider-menu v-else :menuData="menuData" :collapsed="collapsed" :collapsible="true" />
    <a-layout>
      <a-layout-header
        class="global-header"
        style="background: #fff; padding: 0 12px 0 0;box-shadow: 0 1px 4px rgba(0,21,41,.08);position: relative;"
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />

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
              <span>susd</span>
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
              <a-menu-item>
                <router-link to="/login">
                  <a-icon type="poweroff" />
                  <span>退出登录</span>
                </router-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div class="breadcrumb">
          <a-breadcrumb>
            <a-breadcrumb-item :key="item.path" v-for="(item, index) in breadcrumb">
              <span v-if="index === 0">
                <a href="#/">{{item.name}}</a>
              </span>
              <span v-else>{{item.name}}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <div :style="{margin:'24px 24px 0px',minHeight: minHeight }">
          <transition name="page-toggle">
            <router-view />
          </transition>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Copyright
        <a-icon type="copyright" />
        {{copyright}}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import enquireScreen from "../../utils/device";

import SiderMenu from "../../components/layout/SiderMenu";

const minHeight = window.innerHeight - 211;
let menuData = [];

export default {
  name: "App",
  components: { SiderMenu },
  data() {
    return {
      minHeight: minHeight + "px",
      collapsed: false,
      menuData: menuData,
      bodyStyle: {
        padding: "0px"
      },
      breadcrumb: []
    };
  },
  methods: {
    getBreadcrumb() {
      this.breadcrumb = this.$route.matched;
    }
  },
  updated() {
    this.getBreadcrumb();
  },
  mounted() {
    this.getBreadcrumb();
  },
  computed: {
    isMobile() {
      return this.$store.state.setting.isMobile;
    },
    copyright() {
      return this.$store.state.setting.copyright;
    }
  },
  created() {
    let _this = this;
    enquireScreen(isMobile => {
      _this.$store.commit("setting/setDevice", isMobile);
    });
  },
  beforeCreate() {
    menuData = this.$router.options.routes.find(item => item.path === "/")
      .children;
  }
};
</script>
<style lang="less">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

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
.breadcrumb {
  margin-bottom: 20px;
  background: #fff;
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8e8;
}
</style>