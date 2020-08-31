<template>
	<view class="study-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons type="back" size="28" color="white" @click="onBackoff" />
				<text class="text">学习中心</text>
			</view>
		</view>

		<view class="news-list">
			<view class="news-item" v-for="(item, index) in newsList">
				<view>
					<image :src="item.pic" mode="aspectFill" />
				</view>
				<view class="desc">
					<text class="title">{{ item.title }}</text>
					<text class="content">{{ item.content }}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList: [],
				page: 1,
				lastPage: 1
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
			getNewsList() {
				uni.showLoading({
					title: '正在加载'
				})
				uni.request({
					url: `${ this.$baseUrl }info/getcontentlist`,
					method: 'GET',
					success: (res) => {
						const newsList = res.data.list
						for (let i = 0; i < newsList.length; i++) {
							this.newsList.push(newsList[i])
						}
						this.page = res.data.page
						this.lastPage = res.data.lastPage
						console.log('NEWSLIST LOADED SUCCESSFULLY.', res)
					},
					fail: (err) => {
						console.log('NEWSLIST LOADED FAILED.', err)
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
		},
		onLoad() {
			console.log('STUDY PAGE LOADED.')
			try {
				this.getNewsList()
			} catch (e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';

	.study-container {

		.cus-navbar {
			height: calc(var(--status-bar-height) + 55px);
			background-color: $primary;
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
					color: $white;
					font-size: 16px;
					margin-left: 20rpx;
				}
			}
		}

		.news-list {
			margin-top: calc(var(--status-bar-height) + 55px);

			.news-item {
				padding: 10px 5px;
				border-bottom: 1px solid $spgrey;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				image {
					width: 220rpx;
					height: 180rpx;
					margin-right: 10px;
					border-radius: 10px;
				}

				.desc {
					display: flex;
					flex-direction: column;

					.title {
						font-size: 18px;
						font-weight: bold;
						margin-bottom: 3px;
					}

					.content {
						width: 100%;
						font-size: 14px;
						color: $grey;
					}

				}
			}
		}
	}
</style>
