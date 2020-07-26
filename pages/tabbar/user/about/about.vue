<template>
	<view class="about-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons type="back" size="28" color="black" @click="onBackoff" />
			</view>
		</view>

		<view class="logo">
			<image src="@/static/images/hj_logo.png" mode="aspectFit" />
			<text class="name">{{ name }}</text>
			<text class="version">Version {{ version }}</text>
		</view>

		<view class="features">
			<view class="introduce">
				<text>功能介绍</text>
				<uni-icons class="icon" type="forward" size="24" color="#b5b5b5" />
			</view>
			<view class="feedback">
				<text>意见反馈</text>
				<uni-icons class="icon" type="forward" size="24" color="#b5b5b5" />
			</view>
			<view class="update">
				<text>检查新版本</text>
				<uni-icons class="icon" type="forward" size="24" color="#b5b5b5" />
			</view>
		</view>

		<view class="copyright">
			<text class="row-1">成都慧建房地产营销策划有限公司 版权所有</text>
			<text class="row-2">© 2019-{{ thisYear }} ChengDu HuiJian</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '慧办公',
				version: '2.0.0'
			};
		},
		computed: {
			thisYear() {
				return new Date().getFullYear()
			}
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
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';

	.about-container {

		.cus-navbar {
			height: calc(var(--status-bar-height) + 55px);
			background-color: $white;

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
					color: $black;
					font-size: 16px;
					margin-left: 20rpx;
				}
			}
		}

		.logo {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 15%;
			margin-bottom: 50px;

			image {
				width: 128rpx;
				height: 128rpx;
			}

			.name {
				margin-top: 15px;
				font-weight: bold;
				font-size: 24px;
			}

			.version {
				font-size: 18px;
				margin: 0;
			}
		}

		.desc {
			width: 90%;
			margin: 0 auto;
			line-height: 1.5;
			text-indent: 2em;
		}

		.features {
			width: 90%;
			margin: 0 auto;
			border-top: 1px solid $spgrey;
			border-bottom: 1px solid $spgrey;

			view {
				margin-left: 15px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				height: 55px;
				border-bottom: 1px solid $spgrey;
				
				text {
					flex: 1;
				}
				
				.icon {
					flex: 0;
				}
			}
			
			view:last-child {
				border-bottom: none;
			}

		}

		.copyright {
			width: 100%;
			position: absolute;
			bottom: 30px;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: $grey;

			.row-1 {
				margin: 10px 0;
			}
		}
	}
</style>
