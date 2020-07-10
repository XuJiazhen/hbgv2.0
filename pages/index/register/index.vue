<template>
	<view class="register-container">

		<view class="hint">
			<text>请如实填写以下信息，以便HR为您办理入职手续</text>
		</view>

		<view class="section idcard-info">
			<view class="title">
				<text>基本信息</text>
			</view>
			<view class="content">
				<view class="row" v-for="info in idcardInfo">
					<view class="row-title">
						<text class="text">{{ info.label }}</text>
					</view>
					<view class="row-content">
						<input type="text" :value="info.value" readonly="readonly" disabled="true" />
					</view>
				</view>
			</view>
		</view>

		<view class="section idcard-info">
			<view class="title">
				<text>个人信息</text>
			</view>
			<view class="content">
				<view class="row" v-for="info in idcardInfo">
					<view class="row-title">
						<text class="text">{{ info.label }}</text>
					</view>
					<view class="row-content">
						<input type="text" :value="info.value" readonly="readonly" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idcardInfo: [{
						label: '身份证姓名',
						value: '胥佳桢',
					},
					{
						label: '身份证号码',
						value: '510182199609235115'
					},
					{
						label: '出生日期',
						value: '1996.9.23'
					},
					{
						label: '性别',
						value: '男'
					},
					{
						label: '民族',
						value: '汉'
					},
					{
						label: '身份证地址',
						value: '四川省彭州市XXX小区XX幢XX楼XX号'
					},
					{
						label: '证件有效期',
						value: '2022.6.1'
					}
				]
			};
		},
		methods: {
			onBackoff(e) {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/styles/variable.scss';

	.register-container {
		background-color: $spgrey;
		width: 100%;
		height: 100vh;

		.hint {
			font-size: 14px;
			color: $grey;
			text-align: center;
			padding: 10px 40rpx 0 40rpx;
		}

		.section:last-child::after {
			content: '';
			width: 100%;
			height: 20px;
			background-color: $spgrey;
			display: block;
		}

		.idcard-info {

			.title {
				font-size: 14px;
				color: $grey;
				padding: 30px 40rpx 10px 40rpx;
			}

			.content {
				background-color: $white;

				.row {
					padding: 10px 0;

					.row-title {
						padding: 0 40rpx;
						position: relative;

						.text {
							font-size: 14px;
							color: $grey;

							&::before {
								content: '*';
								color: red;
								position: absolute;
								left: 7px;
								top: 57%;
								transform: translateY(-43%);
							}
						}
					}

					.row-content {
						margin: 0 40rpx;

						uni-input {
							border-bottom: 1px solid $spgrey;
							padding: 5px 0;
						}
					}
				}

				// .row:last-child uni-input {
				// 	border: none;
				// }
				.row:last-child {
					padding-bottom: 0;
				}
			}
		}
	}
</style>
