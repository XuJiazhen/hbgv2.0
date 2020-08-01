<template>
	<view class="contact-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons type="back" size="28" color="black" @click="onBackoff" />
			</view>
		</view>

		<view class="contact-detail">

			<view class="card">
				<view class="base">
					<view class="info">
						<text class="name">{{ name }}</text>
						<text class="company">{{ company }}</text>
					</view>

					<view class="avatar">
						<text>{{ name | getInitial}}</text>
					</view>
				</view>

				<view class="option-list">
					<view class="option-item">
						<text>标签</text>
					</view>
					
					<view class="option-item">
						<text>更多信息</text>
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
				id: '',
				name: '',
				phonenumber: '',
				company: '成都慧建房地产营销策划有限公司',

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
			getContactDetail(id) {
				uni.showLoading({
					title: '正在加载'
				})
				uni.request({
					url: `${ this.$baseUrl }telbook/getSimpleInfo`,
					method: 'GET',
					data: {
						hj_uid: id
					},
					success: (res) => {
						console.log('GET CONTACT DETAIL SUCCESSFULLY.', res)
						if (res.statusCode === 200 && res.data) {
							this.id = res.data.staff_id
							this.name = res.data.name
							this.phonenumber = res.data.cellphone
						}
					},
					fail: (err) => {
						console.log('GET CONTACT DETAIL FAILED.', err)
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			}
		},
		filters: {
			getInitial(val) {
				return val.substring(1, 3)
			}
		},
		onLoad(options) {
			console.log('PAGE CONTACT LOADED.')
			try {
				this.getContactDetail(options.hj_uid)
			} catch (e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/styles/variable.scss';

	.contact-container {

		.cus-navbar {
			height: calc(var(--status-bar-height) + 55px);
			background-color: $white;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 999;

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

		.contact-detail {
			margin-top: calc(var(--status-bar-height) + 55px);

			.card {
				display: flex;
				flex-direction: column;
				border-bottom: 10px solid $spgrey;

				.base {
					padding: 0 30rpx;
					padding-bottom: 100px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: $white;

					.info {
						display: flex;
						flex-direction: column;

						.name {
							font-size: 24px;
							font-weight: bold;
							margin-bottom: 10px;
						}

						.company {
							font-size: 14px;
						}
					}

					.avatar {
						width: 120rpx;
						height: 120rpx;
						background-color: $primary;
						color: $white;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
					}

				}
				
				.option-list {
					
					.option-item {
						box-sizing: border-box;
						border-bottom: 1px solid $spgrey;
						height: 55px;
						line-height: 55px;
						margin-left: 30rpx;
					}
					
					.option-item:first-child {
						border-top: 1px solid $spgrey;
					}
					
					.option-item:last-child {
						border-bottom: none;
					}
				}
			}
		}

	}
</style>
