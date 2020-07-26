<script>
	export default {
		onLaunch: function() {
			console.log('APP LAUNCH');
			// #ifdef H5
			uni.reLaunch({
				url: "./pages/tabbar/user/user",
				success: () => {
					console.log('TO LOGIN PAGE - H5.')
				}
			})
			// #endif
			// #ifdef APP-PLUS
			try {
				const userInfo = uni.getStorageSync('userInfo')
				if (!userInfo) {
					uni.reLaunch({
						url: "./pages/index/login/index",
						success: () => {
							console.log('TO LOGIN PAGE - APP.')
							plus.navigator.closeSplashscreen()
						}
					})
				} else {
					plus.navigator.closeSplashscreen()
				}
			} catch (e) {
				console.log(e)
			}
			// #endif
		},
		onShow: function() {
			console.log('APP SHOW');
		},
		onHide: function() {
			console.log('APP HIDE');
		}
	};
</script>

<style lang="scss">
	@import '@/common/styles/variable.scss';
	@import '@/common/styles/iconfont.css';
	
	page {
		font-size: 16px;

		uni-button {
			font-size: 16px;
			&::after {
				border: none;
			}
		}

		.btn-primary {
			background-color: $primary;
			color: $white;
			border-radius: $border_radius;
		}
		
		.btn-secondary {
			background-color: $secondary;
			color: $white;
			border-radius: $border_radius;
		}
		
		.btn-captcha {
			background-color: $primary;
			color: $white;
			border-radius: $border_radius;
		}
		
		.uni-input-placeholder {
			color: $grey;
			font-size: 16px;
		}
		
		.uni-input-input {
			font-size: 16px;
		}

		.icon-input {
			padding: 0 10px 0 10px;
			opacity: 0.5;
		}
	}
</style>
