"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _menu = _interopRequireDefault(require("ant-design-vue/es/menu"));

var _icon = _interopRequireDefault(require("ant-design-vue/es/icon/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuData示例：
 * [
 *  {
 *    title: '菜单标题',
 *    icon: '菜单图标',
 *    path: '菜单路由',
 *    invisible: 'boolean, 是否不可见',
 *    children: [子菜单配置]
 *  },
 *  {
 *    title: '菜单标题',
 *    icon: '菜单图标',
 *    path: '菜单路由',
 *    invisible: 'boolean, 是否不可见',
 *    children: [子菜单配置]
 *  }
 * ]
 **/
var Item = _menu["default"].Item,
    SubMenu = _menu["default"].SubMenu; // 默认菜单图标数组，如果菜单没配置图标，则会设置从该数组随机取一个图标配置

var iconArr = ['dashboard', 'user', 'form', 'setting', 'message', 'safety', 'bell', 'delete', 'code-o', 'poweroff', 'eye-o', 'hourglass'];
var _default = {
  name: 'IMenu',
  props: {
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      "default": 'light'
    },
    mode: {
      type: String,
      required: false,
      "default": 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      "default": false
    }
  },
  data: function data() {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    };
  },
  computed: {
    rootSubmenuKeys: function rootSubmenuKeys(vm) {
      var keys = [];
      vm.menuData.forEach(function (item) {
        keys.push(item.path);
      });
      return keys;
    }
  },
  created: function created() {
    this.updateMenu();
  },
  watch: {
    collapsed: function collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys;
        this.openKeys = [];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    },
    '$route': function $route() {
      this.updateMenu();
    }
  },
  methods: {
    renderIcon: function renderIcon(h, icon) {
      return icon === 'none' ? null : h(_icon["default"], {
        props: {
          type: icon !== undefined ? icon : iconArr[Math.floor(Math.random() * iconArr.length)]
        }
      });
    },
    renderMenuItem: function renderMenuItem(h, menu, pIndex, index) {
      return h(Item, {
        key: menu.path ? menu.path : 'item_' + pIndex + '_' + index
      }, [h('a', {
        attrs: {
          href: '#' + menu.path
        }
      }, [this.renderIcon(h, menu.icon), h('span', [menu.meta.label])])]);
    },
    renderSubMenu: function renderSubMenu(h, menu, pIndex, index) {
      var this2_ = this;
      var subItem = [h('span', {
        slot: 'title'
      }, [this.renderIcon(h, menu.icon), h('span', [menu.meta.label])])];
      var itemArr = [];
      var pIndex_ = pIndex + '_' + index;
      menu.children.forEach(function (item, i) {
        itemArr.push(this2_.renderItem(h, item, pIndex_, i));
      });
      return h(SubMenu, {
        key: menu.path ? menu.path : 'submenu_' + pIndex + '_' + index
      }, subItem.concat(itemArr));
    },
    renderItem: function renderItem(h, menu, pIndex, index) {
      if (!menu.invisible) {
        return menu.children ? this.renderSubMenu(h, menu, pIndex, index) : this.renderMenuItem(h, menu, pIndex, index);
      }
    },
    renderMenu: function renderMenu(h, menuTree) {
      var this2_ = this;
      var menuArr = [];
      menuTree.forEach(function (menu, i) {
        menuArr.push(this2_.renderItem(h, menu, '0', i));
      });
      return menuArr;
    },
    onOpenChange: function onOpenChange(openKeys) {
      var _this = this;

      var latestOpenKey = openKeys.find(function (key) {
        return _this.openKeys.indexOf(key) === -1;
      });

      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    updateMenu: function updateMenu() {
      var routes = this.$route.matched.concat();
      this.selectedKeys = [routes.pop().path];
      var openKeys = [];
      routes.forEach(function (item) {
        openKeys.push(item.path);
      });
      this.collapsed || this.mode === 'horizontal' ? this.cachedOpenKeys = openKeys : this.openKeys = openKeys;
    }
  },
  render: function render(h) {
    var _this2 = this;

    return h(_menu["default"], {
      props: {
        theme: this.$props.theme,
        mode: this.$props.mode,
        openKeys: this.openKeys,
        selectedKeys: this.selectedKeys
      },
      on: {
        openChange: this.onOpenChange,
        select: function select(obj) {
          _this2.selectedKeys = obj.selectedKeys;

          _this2.$emit('select', obj);
        }
      }
    }, this.renderMenu(h, this.menuData));
  }
};
exports["default"] = _default;