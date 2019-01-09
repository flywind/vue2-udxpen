<template>
	<el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
		<el-form-item prop="username">
			<el-input
				v-model="loginForm.username"
				:placeholder="$t('login.username')"
				name="username"
				type="text"
				auto-complete="on"
			/>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				type="password"
				v-model="loginForm.password"
				:placeholder="$t('login.password')"
				name="password"
				auto-complete="on"
				@keyup.enter.native="handleLogin" />
		</el-form-item>
		<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
	</el-form>
</template>

<script>
	import { isvalidUsername } from '@/utils/validate'
	export default {
		data() {
			const validateUsername = (rule, value, callback) => {
				if (!isvalidUsername(value)) {
					callback(new Error('Please enter the correct user name'))
				} else {
					callback()
				}
			}
			const validatePassword = (rule, value, callback) => {
				if (value.length < 6) {
					callback(new Error('The password can not be less than 6 digits'))
				} else {
					callback()
				}
			}
			return {
				loginForm: {
					username: 'tapestrycms',
					password: '123456'
				},
				loginRules: {
					username: [{ required: true, trigger: 'blur', validator: validateUsername }],
					password: [{ required: true, trigger: 'blur', validator: validatePassword }]
				},
				loading: false,
				redirect: undefined
			}
		},
		watch: {
			$route: {
				handler: function(route) {
					this.redirect = route.query && route.query.redirect
				},
				immediate: true
			}
		},
		methods: {
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
					if (valid) {
						this.loading = true
						this.$store.dispatch('Login', this.loginForm).then(() => {
							this.loading = false
							//debugger
							this.$router.push({ path: this.redirect || '/home' })
						}).catch(() => {
							this.loading = false
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
		}
	}
</script>

<style>

</style>
