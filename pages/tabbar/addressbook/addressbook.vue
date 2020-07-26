<template>
	<view class="addressbook-container">
		<view class="group">
			<view class="group-item">
				<view class="left">
					<text class="icon iconfont icon-gerentouxiang_o" />
				</view>
				<view class="right">
					<text class="text">客户</text>
					<uni-icons class="icon-forward" type="forward" size="24" :color="forwardIconColor" />
				</view>
			</view>

			<view class="group-item">
				<view class="left">
					<text class="icon iconfont icon-qunzu_o" />
				</view>
				<view class="right">
					<text class="text">组织架构</text>
					<uni-icons class="icon-forward" type="forward" size="24" :color="forwardIconColor" />
				</view>
			</view>

			<view class="group-item">
				<view class="left">
					<text class="icon iconfont icon-dianhua_o" />
				</view>
				<view class="right">
					<text class="text">手机联系人</text>
					<uni-icons class="icon-forward" type="forward" size="24" :color="forwardIconColor" />
				</view>
			</view>
		</view>

		<view class="colleague-list">
			<view class="colleague-item" v-for="item in colleagueList">
				<view class="left">
					<image class="icon" :src="item.avatarUrl" mode="scaleToFill" />
				</view>
				<view class="right">
					<text class="text">{{ item.name }}</text>
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
				colleagueList: []
			};
		},
		methods: {
			getColleagueList(id) {
				uni.showLoading({
					title: '正在加载'
				})
				uni.request({
					url: `${ this.$baseUrl }telbook/getAllTel`,
					method: 'GET',
					data: {
						hj_uid: id
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data) {
							for (let i = 0; i < res.data.length; i++) {
								this.colleagueList.push(res.data[i])
							}
						}
						console.log('GET COLLEAGUE LIST SUCCESSFULLY.', res)
					},
					fail: (err) => {
						console.log('GET COLLEAGUE LIST FAILED.', err)
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			}
		},
		onLoad() {
			console.log('ADDRESSBOOK PAGE LOADED.')
			try {
				const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				this.getColleagueList(userInfo.hj_uid)
			} catch (e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';

	.addressbook-container {

		.group {
			width: 100%;
			border-bottom: 10px solid $spgrey;

			.group-item {
				width: 100%;
				height: 55px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 10px;

				.left {
					background-color: $primary;
					border-radius: 3px;
					color: $white;
					margin-left: 30rpx;
					width: 40px;
					height: 40px;
					display: flex;
					justify-content: center;
					align-items: center;

					.icon {
						font-size: 28px;
						padding: 10px;
					}
				}

				.right {
					height: 100%;
					width: 100%;
					border-bottom: 1px solid $spgrey;
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					padding-right: 30rpx;
					margin-left: 30rpx;

					.text {
						flex: 1;
					}
				}
			}

			.group-item:last-child {
				margin-bottom: 0;

				.right {
					border-bottom: none;
				}
			}
		}

		.colleague-list {
			width: 100%;

			.colleague-item {
				width: 100%;
				height: 55px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 10px;

				.left {
					border-radius: 3px;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 30rpx;

					image {
						width: 40px;
						height: 40px;
					}
				}

				.right {
					height: 100%;
					width: 100%;
					border-bottom: 1px solid $spgrey;
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					padding-right: 30rpx;
					margin-left: 30rpx;
				}
			}
		}
	}
</style>
