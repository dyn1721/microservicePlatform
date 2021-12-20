<template>
  <div :class="className">
    <a-tooltip :title="$t('navbar.lang')" placement="bottom">
      <a href="javascript:;" class="action" @click='changeLang'>
        <a-icon type="setting" />
      </a>
    </a-tooltip>

    <a-dropdown>
      <span class="action account">
        <a-avatar
            size="small"
            class="avatar"
            src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
            alt="avatar"
        />
        <span class="name">{{ username }}</span>
      </span>

      <a-menu slot="overlay" class="menu">
        <a-menu-item @click='logOut' key="logout">
          <a-icon type="logout"/>
          退出登录
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-tooltip title="预览设置" placement="bottom">
      <a @click="()=>{this.collapse=!this.collapse}" href="javascript:;" class="action" :style="{marginRight: '12px'}">
        <a-icon type="ellipsis"/>
      </a>
    </a-tooltip>
    <a-setting-drawer :collapse="collapse"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {Tooltip, Icon, Dropdown, Menu, Avatar, Divider} from "ant-design-vue";
import NoticeIcon from "@/components/NoticeIcon"
import SettingDrawer from "@/components/SettingDrawer"

export default {
  data: () => ({
    collapse: false
  }),
  props: ["theme", "layout"],
  methods: {
    logOut() {
      localStorage.removeItem('username')
      localStorage.removeItem('autoLoginKey')
      this.$router.push({ path: '/' })
    },
    changeLang() {
      this.$i18n.locale = this.$i18n.locale === "en_US" ? "zh_CN" : "en_US";
    },
  },
  computed: {
    ...mapGetters({username: "global/getUserName"}),
    className() {
      let className = 'ai-header-right';
      if (this.theme === 'dark' && this.layout === 'topmenu') {
        className = `ai-header-right dark`;
      }
      return className;
    }
  },
  components: {
    ATooltip: Tooltip,
    AIcon: Icon,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuDivider: Menu.Divider,
    AAvatar: Avatar,
    ANoticeIcon: NoticeIcon,
    ANoticeIconTab: NoticeIcon.Tab,
    ADivider: Divider,
    ASettingDrawer: SettingDrawer
  },
};
</script>
