<template>
	<view>
		<cus-input type="text" placeholder="手机号" v-model="phonenumber" clearable />
		<cus-input type="text" placeholder="验证码" v-model="captcha">
			<template v-slot:button>
				<button class="btn-captcha" size="mini">获取验证码</button>
			</template>
		</cus-input>
	</view>
</template>

<script>
	import CusInput from '@/components/custom/cus-input.vue'	
	export default {
		name: 'PhoneView',
		components: {
			CusInput
		},
		data() {
			return {
				phonenumber: '',
				captcha: ''
			}
		}
	}
</script>

<style>
</style>
