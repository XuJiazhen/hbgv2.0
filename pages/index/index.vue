<template>
	<view class="container">
		欢迎来到慧办公V2.0版本
		<button type="default" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			console.log('HOME PAGE IS LOADED.')
		},
		methods: {
			logout() {
				console.log('LOGOUT.')				
				uni.removeStorage({
					key: 'userInfo',
					success: () => {
						uni.reLaunch({
							url: 'login/index',
							success: () => {
								console.log('TO LOGIN PAGE.')
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>
