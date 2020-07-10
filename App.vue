<script>
	export default {
		onLaunch: function() {
			console.log('APP LAUNCH');
			// #ifdef H5
			uni.reLaunch({
				url: "./pages/index/register/index",
				success: () => {
					console.log('跳转成功')
				}
			})
			// #endif
			// #ifdef APP-PLUS
			try {
				const userInfo = uni.getStorageSync('userInfo')
				if (!userInfo) {
					uni.reLaunch({
						url: "./pages/index/register/index",
						success: () => {
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
			background-color: $Primary;
			color: $white;
			border-radius: 3px;
		}
		
		.btn-secondary {
			background-color: $Secondary;
			color: $white;
			border-radius: 3px;
		}
		
		.btn-captcha {
			background-color: $Primary;
			color: $white;
			border-radius: 3px;
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
