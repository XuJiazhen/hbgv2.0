<template>
	<view class="phonenumber-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons type="back" size="28" color="white" @click="onBackoff"></uni-icons>
				<text class="text">手机号</text>
			</view>
		</view>
		
		<template v-if="phonenumber">
			<view class="phone correct">
				<image src="@/static/images/phone_correct.png" mode="aspectFit" />
				<text class="title">当前手机号</text>
				<text class="phonenumber">{{ phonenumber }}</text>
				<text class="comment-row">此手机号将显示在个人信息中，</text>
				<text class="comment-row">你也可以使用此手机号登录</text>
				<button type="default" class="btn-replace">更换手机号</button>
			</view>
		</template>
		
		<template v-else>
			<view class="phone correct">
				<image src="@/static/images/phone_error.png" mode="aspectFit" />
				<text class="title">当前手机号</text>
				<text class="phonenumber">请前往绑定</text>
				<text class="comment-row">此手机号将显示在个人信息中，</text>
				<text class="comment-row">你也可以使用此手机号登录</text>
				<button type="default" class="btn-replace">绑定手机号</button>
			</view>
		</template>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phonenumber: ''
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
		onLoad({ phonenumber }) {
			console.log('PHONENUMBER SETTING PAGE IS LOADED.')
			if (phonenumber) {
				this.phonenumber = phonenumber
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/styles/variable.scss';

	.phonenumber-container {
		
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
		
		.phone {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 15px;
			
			image {
				width: 300rpx;
				height: 300rpx;
			}
			
			.phonenumber {
				font-size: 24px;
				margin: 10px 0;
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
