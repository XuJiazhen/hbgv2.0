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
					<image :src="item.pic" mode="aspectFit" />
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
			loadNewsList() {
				uni.showLoading({
					title: '正在加载'
				})
				uni.request({
					url: `${ this.$baseUrl }info/getcontentlist`,
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
			this.loadNewsList()
			console.log('STUDY PAGE LOADED.')
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
				padding: 0 5px;
				border-bottom: 1px solid $spgrey;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				image {
					width: 256rpx;
					height: 256rpx;
					margin-right: 10px;
					background-color: red;
					margin: 0;
					padding: 0;
					border-radius: 10px;
				}

				.desc {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: center;

					.title {
						font-size: 18px;
						font-weight: bold;
						text-overflow: ellipsis;
						margin-bottom: 3px;
					}

					.content {
						font-size: 14px;
						color: $grey;
					}

				}
			}
		}
	}
</style>
