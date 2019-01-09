<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
  	<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="navbar-header" :data-logobg="logobg"/>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      :data-sidebarbg="sidebarbg"
      :background-color="bgColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'

export default {
  components: { SidebarItem, Hamburger},
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'logobg',
      'sidebarbg'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    bgColor() {
    	switch (this.sidebarbg){
    		case 'skin1':
    			return '#2cabe3';
    			break;
    		case 'skin2':
    			return '#707cd2';
    			break;
    		case 'skin3':
    			return '#ff7676';
    			break;
    		case 'skin4':
    			return '#a0aec4';
    			break;
    		case 'skin5':
    			return '#2f323e';
    			break;
    		case 'skin6':
    			return '#fff';
    			break;
    		default:
    			return '#fff';
    			break;
    	}
    },
    textColor() {
    	switch (this.sidebarbg){
    		case 'skin1':
    			return '#b9ecf1';
    			break;
    		case 'skin2':
    			return '#d0ddf5';
    			break;
    		case 'skin3':
    			return '#ffc7c7';
    			break;
    		case 'skin4':
    			return '#e8ebf1';
    			break;
    		case 'skin5':
    			return '#7f8188';
    			break;
    		case 'skin6':
    			return '#657688';
    			break;
    		default:
    			return '#657688';
    			break;
    	}
    },
    activeTextColor() {
    	switch (this.sidebarbg){
    		case 'skin1':
    			return '#fff';
    			break;
    		case 'skin2':
    			return '#fff';
    			break;
    		case 'skin3':
    			return '#fff';
    			break;
    		case 'skin4':
    			return '#fff';
    			break;
    		case 'skin5':
    			return '#fff';
    			break;
    		case 'skin6':
    			return '#54667a';
    			break;
    		default:
    			return '#54667a';
    			break;
    	}
    },
  },
  methods: {
  	toggleSideBar() {
			this.$store.dispatch('toggleSideBar')
		}
  }
}
</script>
<style lang="scss" scoped="scoped">
	.navbar-header{
		height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
	}
</style>