<template>
	<transition 
    	enter-active-class="animated bounceInRight"
    	leave-active-class="animated bounceOutRight">
		<div v-show="isShow" class="customizer" @click.stop>
			<div class="header">Setings</div>
			
			<div class="layout-settings">
				<h2>Layout Settings</h2>
				<div>
					<el-checkbox v-model="collapseSidebar" :checked="isCollapse" @change="changeCollapse">Collapse Sidebar</el-checkbox>
				</div>
				<div>
					<el-checkbox v-model="fixedHeader" :checked="isFixedHead" @change="changeFixed">Fixed Header</el-checkbox>
				</div>
			</div>
			
			
			<div class="color-backgrounds">
				<h2>Logo Backgrounds</h2>
				<ul class="theme-color">
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin1" @click="logobgChange('skin1')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin2" @click="logobgChange('skin2')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin3" @click="logobgChange('skin3')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin4" @click="logobgChange('skin4')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin5" @click="logobgChange('skin5')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin6" @click="logobgChange('skin6')"></a>
	                </li>
	            </ul>
			</div>
			
            <div class="color-backgrounds">
            	<h2>Navbar Backgrounds</h2>
            	<ul class="theme-color">
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin1" @click="navbarbgChange('skin1')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin2" @click="navbarbgChange('skin2')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin3" @click="navbarbgChange('skin3')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin4" @click="navbarbgChange('skin4')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin5" @click="navbarbgChange('skin5')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin6" @click="navbarbgChange('skin6')"></a>
	                </li>
	            </ul>
            </div>
			
            <div class="color-backgrounds">
            	<h2>Sidebar Backgrounds</h2>
            	<ul class="theme-color">
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin1" @click="sidebarbgChange('skin1')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin2" @click="sidebarbgChange('skin2')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin3" @click="sidebarbgChange('skin3')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin4" @click="sidebarbgChange('skin4')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin5" @click="sidebarbgChange('skin5')"></a>
	                </li>
	                <li class="theme-item">
	                    <a class="theme-link" data-logobg="skin6" @click="sidebarbgChange('skin6')"></a>
	                </li>
	            </ul>
            </div>
		</div>
	</transition>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters([
				'sidebar',
				'navbarbg',
				'navbarfixed'
			]),
			isCollapse() {
				if(this.sidebar.opened){
					return true;
				} else {
					return false;
				}
			},
			isFixedHead() {
				if(this.navbarfixed){
					return true;
				} else {
					return false;
				}
			}
		},
		data() {
			return {
				isShow: false,
				collapseSidebar: false,
				fixedHeader: false,
			}
		},
		props: {
			value: {
		    	type: Boolean,
		    	default: false
		   }
		},
		watch: {
			isShow(val) {
				this.$emit('input', val);
			},
			value(val) {
				this.isShow = val;
			}
		},
		mounted() {
			if(this.value) {
				this.isShow = true;
			}
			document.body.addEventListener('click', () => {
				this.isShow = false;
			}, false)
		},
		methods: {
			logobgChange(skin) {
				this.$store.dispatch('setLogobg', skin)
			},
			navbarbgChange(skin) {
				this.$store.dispatch('setNavbarbg', skin)
			},
			sidebarbgChange(skin) {
				this.$store.dispatch('setSidebarbg', skin)
			},
			changeCollapse(val) {
				this.$store.dispatch('toggleSideBar')
			},
			changeFixed(val) {
				this.$store.dispatch('setNavbarfixed', val)
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped="scoped">
	.customizer {
		background: #fff;
		position: fixed;
		height: 100%;
		width: 280px;
		top: 0;
		right: 0;
		z-index: 100;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .1);
		.header{
			height: 59px;
		    background: #fff;
		    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .1);
		    line-height: 60px;
		    padding-left: 15px;
		}
		.layout-settings{
			padding: 20px;
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid rgba(120,130,140,.13);
			h2{
				font-weight: 700;
				padding: 5px 0 10px;
				font-size: 14px;
				margin: 0;
			}
			div{
				margin-top: 6px;
				label{
					font-weight: normal;
				}
				
			}
		}
		.color-backgrounds{
			padding: 20px;
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid rgba(120,130,140,.13);
			h2{
				font-weight: 700;
				padding: 5px 0 10px;
				font-size: 14px;
				margin: 0;
			}
		}
	}
</style>