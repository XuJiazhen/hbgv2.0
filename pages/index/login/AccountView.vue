<template>
	<view>
		<cus-input type="text" placeholder="用户名/邮箱/手机号" v-model="nameOrEmailOrPhone" clearable />
		<cus-input type="passward" placeholder="登录密码" v-model="passward" displayable />
	</view>
</template>

<script>
	import CusInput from '@/components/custom/cus-input.vue'
	export default {
		name: 'AccountView',
		components: {
			CusInput
		},
		data() {
			return {
				nameOrEmailOrPhone: '',
				passward: ''
			}
		}
	}
</script>

<style>
</style>
