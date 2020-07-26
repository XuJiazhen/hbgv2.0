<template>
	<view class="setting-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons type="back" size="28" color="white" @click="onBackoff" />
				<text class="text">设置</text>
			</view>
		</view>

		<view class="setting-list">
			<view class="setting-item phonenumber" @click="onPhonenumberTap">
				<view class="content">
					<view class="left">
						<text class="text">手机号</text>
					</view>
					<view class="right">
						<text class="bound">{{ userInfo.cellphone }}</text>
						<uni-icons type="forward" size="24" :color="forwardIconColor" />
					</view>
				</view>
			</view>
			
			<view class="setting-item wechat" @click="onWechatTap">
				<view class="content">
					<view class="left">
						<text class="text">微信</text>
					</view>
					<view class="right">
						<text class="bound">{{ userInfo.wx_name }}</text>
						<uni-icons type="forward" size="24" :color="forwardIconColor" />
					</view>
				</view>
			</view>
			
			<view class="setting-item qq">
				<view class="content">
					<view class="left">
						<text class="text">QQ</text>
					</view>
					<view class="right">
						<text class="bound">{{ userInfo.qq_name }}</text>
						<uni-icons type="forward" size="24" :color="forwardIconColor" />
					</view>
				</view>
			</view>
				
			<view class="setting-item passward">
				<view class="content">
					<view class="left">
						<text class="text">修改密码</text>
					</view>
				</view>
			</view>
		</view>

		<view class="setting-item logout" @click="logout">
			<text class="text">退出登录</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				forwardIconColor: '#b5b5b5',
				userInfo: {}
			};
		},
		methods: {
			onBackoff() {
				console.log('BACKOFF.')
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 300
				})
			},
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
			onPhonenumberTap() {
				console.log('TO PHONENUMBER SETTING PAGE.')
				uni.navigateTo({
					url: `phonenumber/phonenumber?phonenumber=${this.userInfo.cellphone}`
				})
			},
			onWechatTap() {
				console.log('TO WECHAT SETTING PAGE.')
				uni.navigateTo({
					url: `wechat/wechat?name=${this.userInfo.wx_name}&avatar=${this.userInfo.avatarUrl}`
				})
			}
		},
		onLoad() {
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			if (userInfo) {
				this.userInfo = userInfo
			}
			console.log('SETTING PAGE LOADED.', this.userInfo)
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';

	.setting-container {
		width: 100%;
		height: 100vh;
		background-color: $spgrey;

		.cus-navbar {
			height: calc(var(--status-bar-height) + 55px);
			background-color: $primary;

			.status_bar {
				height: var(--status-bar-height);
			}

			.title_bar {
				height: 55px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				text-align: left;
				padding-left: 20rpx;

				.text {
					color: $white;
					font-size: 16px;
					margin-left: 20rpx;
				}
			}
		}

		.setting-item {
			height: 55px;
			width: 100%;
			background-color: $white;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;

			.content {
				flex: 1;
				margin-left: 30rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				height: 100%;
				border-bottom: 1px solid $spgrey;
				box-sizing: border-box;
				padding-right: 30rpx;

				.left {
					flex: 1;
				}

				.right {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					align-items: center;

					.bound {
						color: $grey;
						margin-right: 10px;
					}
				}
			}
		}

		.setting-item:first-child {
			border-top: 10px solid $spgrey;
		}
		
		.setting-item:last-child .content {
			border: none;
		}

		.logout {
			color: red;
			justify-content: center;
			border-top: 10px solid $spgrey;
			border-bottom: 10px solid $spgrey;
		}
	}
</style>
