<template>
	<view class="addressbook-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<text class="text">通讯录</text>
				<uni-icons type="search" size="26" color="black" @click="onSearchTap" />
			</view>
		</view>

		<scroll-view class="addressbook" :scroll-into-view="scrollViewId" scroll-y="true" scroll-with-animation="true">

			<view class="group" id="top">
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

			<view class="colleague-list" v-for="item in colleagueList">
				<view class="letter" :id="item.letter">
					<text>{{ item.letter }}</text>
				</view>
				<view class="colleague" v-for="colleague in item.data" @click="toContactInfo(colleague.hj_uid)">
					<view class="left">
						<image v-if="colleague.avatarUrl" class="avatar-img" :src="colleague.avatarUrl" mode="scaleToFill" />
						<view v-else class="avatar-text">
							<text>{{ colleague.name | getInitial }}</text>
						</view>
					</view>
					<view class="right">
						<text class="text">{{ colleague.name }}</text>
					</view>
				</view>
			</view>
			<view class="total" id="bottom">
				<text>{{ total }}位联系人</text>
			</view>
		</scroll-view>

		<view class="sidebar">
			<view class="sidekey" v-for="key in sideKeys" @click="onJumpTo(key)">
				<text>{{ key }}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import pinyin from '@/static/js/pinyin.js'

	export default {
		data() {
			return {
				forwardIconColor: '#b5b5b5',
				colleagueList: [],
				sideKeys: [],
				total: 0,
				scrollViewId: '',
				sourceData: []
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
									// IS EN.
									if (initial.toLowerCase().charCodeAt() === enLetters[i].toLowerCase().charCodeAt()) {
										colleague.data.push(item)
									}
									// IS ZH.
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
						this.colleagueList = colleagueList
						this.sideKeys = ['↑', ...sideKeys, '#']
						this.total = res.data.length
						this.sourceData = res.data
						console.log('GET COLLEAGUE LIST SUCCESSFULLY.', res)
					},
					fail: (err) => {
						console.log('GET COLLEAGUE LIST FAILED.', err)
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			onJumpTo(key) {
				console.log(`SCROLL TO LINE: ${ key }`)
				if (key === '↑') {
					this.scrollViewId = 'top'
					return
				}
				if (key === '#') {
					this.scrollViewId = 'bottom'
					return
				}
				this.scrollViewId = key
			},
			onSearchTap() {
				uni.navigateTo({
					url: `./search/search?source_data=${ JSON.stringify(this.sourceData) }`,
					animationType: 'fade-in',
					animationDuration: 300
				})
				console.log('TO PAGE SEARCH.')
			},
			toContactInfo(id) {
				uni.navigateTo({
					url: `./contact/contact?hj_uid=${ id }`
				})
				console.log('TO PAGE CONTACT.')
			}
		},
		filters: {
			getInitial(val) {
				return val.substring(1, 3)
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
		},

	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';

	.addressbook-container {
		position: relative;

		.cus-navbar {
			height: calc(var(--status-bar-height) + 55px);
			background-color: $spgrey;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 999;
			box-sizing: border-box;
			overflow: hidden;

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
				padding: 0 30rpx;

				.text {
					color: $black;
					font-size: 20px;
					font-weight: bold;
					flex: 1;
				}
			}
		}

		.addressbook {
			height: calc(100vh - var(--status-bar-height) + 55px);
			margin-top: calc(var(--status-bar-height) + 55px);

			.group {
				width: 100%;
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
						width: 45px;
						height: 45px;
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

				.letter {
					height: 30px;
					line-height: 30px;
					color: $grey;
					background-color: $spgrey;
					padding: 0 30rpx;
				}

				.colleague {
					width: 100%;
					height: 55px;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					padding: 5px 0;

					.left {
						display: flex;
						justify-content: center;
						align-items: center;
						padding-left: 30rpx;
						padding-right: 30rpx;
						border-radius: 3px;
						width: 45px;
						height: 45px;


						.avatar-img {
							box-sizing: border-box;
							border-radius: 3px;
							width: 45px;
							height: 45px;
							background-color: $spgrey;
						}

						.avatar-text {
							box-sizing: border-box;
							border-radius: 3px;
							width: 45px;
							height: 45px;
							background-color: $primary;
							color: $white;
							display: flex;
							flex-direction: row;
							justify-content: center;
							align-items: center;
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
					}
				}

				.colleague:last-child {

					.right {
						border: none;
					}
				}

			}

			.total {
				width: 100%;
				height: 55px;
				line-height: 55px;
				border-top: 1px solid $spgrey;
				text-align: center;
				font-size: 18px;
				color: $grey;
			}
		}

		.sidebar {
			height: 100%;
			width: 30rpx;
			font-size: 14px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: calc(var(--status-bar-height) + 55px);
			right: 0;
			z-index: 999;
			padding: 0 20rpx;

			.sidekey {
				margin: 3px 0;
			}
		}
	}
</style>
