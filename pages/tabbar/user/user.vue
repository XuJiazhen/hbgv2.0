<template>
	<view class="user-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons type="gear" size="28" color="black" @click="onSettingTap"></uni-icons>
			</view>
		</view>
		<view class="info-banner">
			<view class="base-info">
				<view class="avatar">
					<image :src="userInfo.avatarUrl" mode="aspectFit"></image>
				</view>
				<view class="profile">
					<view class="row">
						<text class="name">{{ userInfo.name }}</text>
					</view>
					<view class="row middle">
						<text class="code">{{ userInfo.turn_real_time ? '正式员工' : '实习员工' }} | {{ userInfo.member_id }}</text>
						<view class="forward">
							<text class="iconfont icon-QRcode" style="font-size: 24px; margin-right: 10px;" />
							<uni-icons class="char" type="forward" size="24" :color="forwardIconColor" />
						</view>
					</view>
					<view class="row">
						<text class="depo">{{ userInfo.department }} {{ userInfo.job }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="info-list">
			<view class="info-item" @click="onStudyTap">
				<view class="left">
					<text class="iconfont icon-shu" />
				</view>
				<view class="right">
					<text class="text">学习中心</text>
					<uni-icons class="icon-forward" type="forward" size="24" :color="forwardIconColor" />
				</view>
			</view>

			<view class="info-item">
				<view class="left">
					<text class="iconfont icon-gerentouxiang" />
				</view>
				<view class="right">
					<text class="text">我的信息</text>
					<uni-icons class="icon-forward" type="forward" size="24" :color="forwardIconColor" />
				</view>
			</view>

			<view class="info-item">
				<view class="left">
					<text class="iconfont icon-renminbi" />
				</view>
				<view class="right">
					<text class="text">我的工资条</text>
					<uni-icons class="icon-forward" type="forward" size="24" :color="forwardIconColor" />
				</view>
			</view>

			<view class="info-item">
				<view class="left">
					<text class="iconfont icon-wenben" />
				</view>
				<view class="right">
					<text class="text">我的奖罚单</text>
					<uni-icons class="icon-forward" type="forward" size="24" :color="forwardIconColor" />
				</view>
			</view>

			<view class="info-item">
				<view class="left">
					<text class="iconfont icon-wenhao" />
				</view>
				<view class="right">
					<text class="text">帮助中心</text>
					<uni-icons class="icon-forward" type="forward" size="24" :color="forwardIconColor" />
				</view>
			</view>

			<view class="info-item" @click="onAboutTap">
				<view class="left">
					<text class="iconfont icon-xinxi" />
				</view>
				<view class="right">
					<text class="text">关于我们</text>
					<uni-icons class="icon-forward" type="forward" size="24" :color="forwardIconColor" />
				</view>
			</view>
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
			onSettingTap() {
				console.log('TO PAGE SETTING.')
				uni.navigateTo({
					url: './setting/setting'
				})
			},
			onAboutTap() {
				console.log('TO PAGE ABOUT.'),
				uni.navigateTo({
					url: './about/about'
				})
			},
			onStudyTap() {
				console.log('TO PAGE STUDY.'),
				uni.navigateTo({
					url: './study/study'
				})
			},
		},
		onLoad() {
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			if (userInfo) {
				this.userInfo = userInfo
			}
			console.log('USER PAGE LOADED.', this.userInfo)
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';

	.user-container {
		width: 100%;
		height: 100vh;
		background-color: $spgrey;

		.cus-navbar {
			height: calc(var(--status-bar-height) + 55px);
			background-color: $white;

			.status_bar {
				height: var(--status-bar-height);
			}

			.title_bar {
				height: 55px;
				line-height: 55px;
				text-align: right;
				padding-right: 30rpx;
			}
		}

		.info-banner {
			width: 100%;
			background-color: $white;

			.base-info {
				padding: 0 30rpx 80rpx 30rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				.avatar {
					margin-right: 30rpx;

					image {
						width: 148rpx;
						height: 148rpx;
						border-radius: 50%;
					}
				}

				.profile {
					font-size: 12px;
					color: $grey;
					width: 100%;

					.row {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;

						.name {
							color: black;
							font-size: 18px;
							font-weight: bold;
						}

						.code {
							background-color: $white;
							color: $primary;
							border-radius: 3px;
							padding: 3px 5px;
							border: 1px solid $primary;
							margin: 7px 0;
						}

					}
				}

				.forward {
					font-size: 24px;
					height: 100%;
					flex: 1;
					text-align: right;

				}
			}
		}

		.info-list {
			margin-top: 15px;
			background-color: $white;

			.info-item {
				height: 55px;
				line-height: 55px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				.left {
					height: 55px;
					line-height: 55px;


					text {
						font-size: 32px;
						color: $primary;
						text-align: center;
						padding: 0 30rpx;
						box-sizing: border-box;
					}
				}

				.right {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					border-bottom: 1px solid $spgrey;
					padding-right: 30rpx;

					.text {
						flex: 1;
					}
				}


			}

			.info-item:first-child {
				border-bottom: 15px solid $spgrey;

				.right {
					border-bottom: none;
				}
			}

			.info-item:last-child {
				border-top: 15px solid $spgrey;

				.right {
					border-bottom: none;
				}
			}
		}
	}
</style>
