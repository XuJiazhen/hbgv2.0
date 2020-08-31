<template>
	<view class="contact-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons type="back" size="28" color="black" @click="onBackoff" />
			</view>
		</view>

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

		</view>

		<view class="info-list">
			<view class="info-item">
				<text class="label">企业/组织</text>
				<text class="content">{{ company }}</text>
			</view>

			<view class="info-item">
				<text class="label">姓名</text>
				<text class="content">{{ name }}</text>
			</view>

			<view class="info-item">
				<text class="label">电话</text>
				<text class="content">+86-{{ phonenumber }}</text>
			</view>

			<view class="info-item">
				<text class="label">部门</text>
				<text class="content">{{ department }}</text>
			</view>

			<view class="info-item">
				<text class="label">职位</text>
				<text class="content">{{ position }}</text>
			</view>

			<view class="info-item">
				<text class="label">工号</text>
				<text class="content">{{ id }}</text>
			</view>
		</view>

		<view class="btns">
			<view class="message">
				<uni-icons type="chatbubble" size="24" :color="color" />
				<text class="text">发送消息</text>
			</view>
			<view class="phone" @click="onPhoneTap">
				<uni-icons type="phone" size="24" :color="color" />
				<text class="text">拨打电话</text>
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
				position: '',
				department: '',
				phonenumber: '',
				company: '成都慧建房地产营销策划有限公司',
				color: '#1a3751'
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
							this.position = res.data.job_name
							this.department = res.data.department_name
						}
					},
					fail: (err) => {
						console.log('GET CONTACT DETAIL FAILED.', err)
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			makePhoneCall() {
				uni.makePhoneCall({
					phoneNumber: this.phonenumber,
					complete: () => {
						console.log('MAKE PHONECALL.')
					}
				})
			},
			onPhoneTap() {
				uni.showModal({
					title: '是否呼叫',
					content: this.phonenumber,
					showCancel: true,
					confirmText: '呼叫',
					success: (res) => {
						if (res.confirm) {
							this.makePhoneCall()
						}
						if (res.cancel) {
							console.log('MAKE PHONECALL CANCELED.')
						}
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
		margin-top: calc(var(--status-bar-height) + 55px);
		background-color: $spgrey;
		width: 100%;
		height: calc(100vh - calc(var(--status-bar-height) + 55px));

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

		.card {
			background-color: $white;
			display: flex;
			flex-direction: column;
			border-bottom: 10px solid $spgrey;

			.base {
				padding: 0 30rpx;
				padding-bottom: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;

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
		}

		.info-list {
			background-color: $white;
			border-bottom: 10px solid $spgrey;

			.info-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				border-bottom: 1px solid $spgrey;
				height: 55px;
				margin-left: 30rpx;
				padding: 3px 0;

				.label {
					font-size: 14px;
					color: $grey;
				}

				.content {
					font-weight: bold;
					margin-top: 3px;
				}
			}

			.info-item:last-child {
				border-bottom: none;
			}
		}

		.btns {
			background-color: $white;

			view {
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 1px solid $spgrey;
				height: 55px;
				padding: 3px 0;
				color: $primary;

				.text {
					margin-left: 10px;
					font-weight: bold;
				}
			}

			view:last-child {
				border-bottom: none;
			}
		}
	}
</style>
