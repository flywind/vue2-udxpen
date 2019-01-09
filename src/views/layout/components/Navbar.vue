<template>
	<div class="navbar-box" :style="{'width': navbarfixed ? 'calc(100vw - '+sidebarwidth+')' : '100%'}">
		<div class="navbar" :data-navbarbg="navbarbg">
			<div class="logo" v-waves>
				<svg-icon icon-class="logo" />
			</div>
			<div class="site-name">UXDPen.com</div>
			<div class="message" v-waves>
	        	<i class="iconfont uxd-love"></i>
	        	<div class="notify">
	        		<span class="heartbit"></span>
	        		<span class="point"></span>
	        	</div>
	        </div>
	        <div class="screen-full" @click="screen" v-waves>
	        	<el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
					<i class="iconfont uxd-screen"></i>
				</el-tooltip>
	        </div>
	        <div class="size-select">
	        	<el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
					<size-select class="international" />
				</el-tooltip>
	        </div>
			<div class="site-info">
				<div class="lang-select">
					<lang-select />
				</div>
				<div class="theme-switch">
					<el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
						<theme-picker />
					</el-tooltip>
				</div>
				<el-dropdown trigger="click">
					<span class="el-dropdown-link profile-pic" v-waves>
						<!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="img-circle" width="36">-->
						<img src="http://www.ampleadmin.wrappixel.com/ampleadmin-html/plugins/images/users/varun.jpg" class="img-circle" width="36">
						<span>{{name}}</span>
						<i class="el-icon-arrow-down el-icon--right" />
					</span>
					<el-dropdown-menu slot="dropdown">
						<router-link to="/">
							<el-dropdown-item>
								{{ $t('navbar.home') }}
							</el-dropdown-item>
						</router-link>
						<a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
							<el-dropdown-item>
								{{ $t('navbar.github') }}
							</el-dropdown-item>
						</a>
						<el-dropdown-item divided>
							<span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<tagsView/>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import ErrorLog from '@/components/ErrorLog'
	import SizeSelect from '@/components/SizeSelect'
	import LangSelect from '@/components/LangSelect'
	import ThemePicker from '@/components/ThemePicker'
	import TagsView from './TagsView'
	import screenfull from 'screenfull'
	export default {
		components: {
			ErrorLog,
			screenfull,
			SizeSelect,
			LangSelect,
			ThemePicker,
			TagsView
		},
		computed: {
			...mapGetters([
				'sidebar',
				'name',
				'avatar',
				'navbarbg',
				'navbarfixed'
			]),
			sidebarwidth() {
				return this.sidebar.opened ? '250px' : '60px'
			}
		},
		methods: {
			logout() {
				this.$store.dispatch('FedLogOut').then(() => {
					location.reload() // In order to re-instantiate the vue-router object to avoid bugs
				})
			},
			screen() {
				if (!screenfull.enabled) {
			        this.$message({
			          message: 'you browser can not work',
			          type: 'warning'
			        })
			        return false
		    	}
		    	screenfull.toggle()
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.navbar {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.logo{
			width: 60px;
			height: 60px;
			display: flex;
    		align-items: center;
    		justify-content: center;
			svg{
				width: 50px;
				height: 50px;
			}
			margin-left: 10px;
		}
		.site-name{
			margin-left: 5px;
			margin-right: 30px;
		}
		.message{
        	padding: 0 10px;
		    height: 60px;
		    width: 46px;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    cursor: pointer;
		    /*border-right: 1px solid rgba(255,255,255,.2);*/
		    .iconfont{
		    	font-size: 22px;
		    }
		    .notify {
			    position: relative;
			    margin-top: -25px;
			    .heartbit {
				    position: absolute;
				    top: -10px;
				    right: -10px;
				    height: 25px;
				    width: 25px;
				    z-index: 10;
				    border: 5px solid #f44336;
				    border-radius: 70px;
				    -moz-animation: heartbit 1s ease-out;
				    -moz-animation-iteration-count: infinite;
				    -o-animation: heartbit 1s ease-out;
				    -o-animation-iteration-count: infinite;
				    -webkit-animation: heartbit 1s ease-out;
				    -webkit-animation-iteration-count: infinite;
				    animation-iteration-count: infinite;
				}

				.point {
				    width: 6px;
				    height: 6px;
				    -webkit-border-radius: 30px;
				    -moz-border-radius: 30px;
				    border-radius: 30px;
				    background-color: #f44336;
				    position: absolute;
				    right: -2px;
    				top: 0px;
				}
			}
        }
        .screen-full{
        	padding: 0 10px;
		    height: 60px;
		    width: 46px;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    cursor: pointer;
		    .uxd-screen{
		    	font-size: 19px;
		    }
        }
        .size-select{
        	padding: 0 10px;
		    height: 60px;
		    width: 46px;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    cursor: pointer;
        }
        .site-info{
        	flex: 1;
        	align-items: center;
    		height: 60px;
    		display: flex;
    		justify-content: flex-end;
    		outline: none;
    		.profile-pic{
    			outline: none;
    			height:60px;
    			display: flex;
    			align-items: center;
    			margin-right: 15px;
    			img{
    				margin-right: 10px;
    				margin-left: 5px;
    			}
    			i{
    				margin-right: 5px;
    			}
    		}
    		.theme-switch{
    			height:60px;
    			width: 46px;
    			display: flex;
    			align-items: center;
    			justify-content: center;
    		}
    		.lang-select{
    			margin-right: 5px;
    			outline: none;
    			cursor: pointer;
    		}
        }
	}
</style>