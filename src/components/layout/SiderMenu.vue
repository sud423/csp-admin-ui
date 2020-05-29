<template>
  <a-layout-sider
    :class="[isMobile ? null : 'shadow']"
    v-model="collapsed"
    :trigger="null"
    collapsible="collapsible"
    style="background: #fff;z-index:10"
    width="256px"
  >
    <div class="logo">
      <router-link to="/">
        <!-- <img src="static/img/vue-antd-logo.png" /> -->
        <h1>{{systemName}}</h1>
      </router-link>
    </div>
    <!-- <a-menu theme="light" mode="inline" :default-selected-keys="['1']">
      <a-menu-item key="1">
        <a-icon type="user" />
        <span>nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="video-camera" />
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="upload" />
        <span>nav 3</span>
      </a-menu-item>
    </a-menu> -->
    <i-menu :theme="'light'" :collapsed="collapsed" :menuData="menuData" @select="onSelect" class="menu"/>
  </a-layout-sider>
</template>

<script>

import IMenu from './menu'

export default {
  name: "SiderMenu",
  components: {IMenu},
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.setting.isMobile;
    },
    systemName() {
      return this.$store.state.setting.systemName;
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
};
</script>

<style  lang="less" scoped>
.shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.logo {
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 24px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  overflow: hidden;
  // &.light {
  //   background-color: #fff;
  //   h1 {
  //     color: #1890ff;
  //   }
  // }
  // &.dark {
  //   background-color: #002140;
  //   h1 {
  //     color: #fff;
  //   }
  // }
  h1 {
    color: #1890ff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 600;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
  }
  img {
    width: 32px;
    display: inline-block;
    vertical-align: middle;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>