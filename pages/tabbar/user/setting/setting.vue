<template>
	<view class="setting-container">

		<button class="logout" type="default" @click="logout">退出登录</button>

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
							url: '../../../index/login/index',
							success: () => {
								console.log('TO LOGIN PAGE.')
							}
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';

	.setting-container {
		width: 100%;
		height: 100vh;
		background-color: $spgrey;

		.logout {
			width: 100%;
			height: 55px;
			line-height: 55px;
			background-color: $white;
		}
	}
</style>
