<template>
	<view class="wechat-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons type="back" size="28" color="white" @click="onBackoff"></uni-icons>
				<text class="text">微信</text>
			</view>
		</view>

		<template v-if="bound">
			<view class="wechat bound">
				<image :src="avatar" mode="aspectFit" />
				<text class="name">当前微信：{{ name }}</text>
				<text class="comment-row">可使用当前已绑定的微信登录</text>
				<button type="default" class="btn-replace">更换微信</button>
			</view>
		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				avatar: '',
				bound: false
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
		},
		onLoad({
			name,
			avatar
		}) {
			console.log('WECHAT SETTING PAGE IS LOADED.')
			if (name && avatar) {
				this.bound = true
				this.name = name
				this.avatar = avatar
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/styles/variable.scss';

	.wechat-container {

		.cus-navbar {
			height: calc(var(--status-bar-height) + 55px);
			background-color: $Primary;

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

		.wechat {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 50px;

			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
			}

			.name {
				margin: 20px 0;
				font-weight: bold;
			}

			.comment-row {
				color: $grey;
			}

			.btn-replace {
				width: 80%;
				margin: 20px 0;
				background-color: $Secondary;
				color: $white;
			}
		}

	}
</style>
