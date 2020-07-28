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

		<!-- 		<view class="colleague-list">
			<view class="colleague-item" v-for="item in colleagueList">
				<view class="left">
					<image class="icon" :src="item.avatarUrl" mode="scaleToFill" />
				</view>
				<view class="right">
					<text class="text">{{ item.name }}</text>
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	import pinyin from '@/static/js/pinyin.js'

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
						const enLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
						const colleagueList = []
						const sideKeys = []

						if (res.statusCode === 200 && res.data) {

							for (let i = 0; i < enLetters.length; i++) {
								const colleague = {
									letter: enLetters[i],
									data: []
								}

								res.data.forEach((item) => {
									const initial = item.name.substring(0, 1)
									// IS EN & IS COMPLIANT.
									if (initial.toLowerCase().charCodeAt() === enLetters[i].toLowerCase().charCodeAt()) {
										colleague.data.push(item)
									}
									// IS EN & IS COMPLIANT.
									if (pinyin.getFullChars(initial).substring(0, 1).toLowerCase() === enLetters[i].toLowerCase()) {
										colleague.data.push(item)
									}
								})

								if (colleague.data.length !== 0) {
									colleagueList.push(colleague)
									sideKeys.push(colleague.letter)
								}
							}
						}
						console.log(colleagueList)
						console.log(sideKeys)
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
			padding: 10px 0;

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
					width: 50px;
					height: 50px;
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
					border: 1px solid $spgrey;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 30rpx;

					image {
						width: 50px;
						height: 50px;
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
