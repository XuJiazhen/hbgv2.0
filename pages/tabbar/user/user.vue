<template>
	<view>
		USER.
		<button type="default" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			logout() {
				console.log('LOGOUT.')				
				uni.removeStorage({
					key: 'userInfo',
					success: () => {
						uni.reLaunch({
							url: '../../index/login/index',
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

<style lang="scss">

</style>
