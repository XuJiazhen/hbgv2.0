<template>
	<view class="search-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons type="search" size="26" color="black" @click="onBackoff" />
				<input type="text" v-model="searchText" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText: ''
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
		onLoad(options) {
			console.log('SEARCH PAGE LOADED.')
		}
	}
</script>

<style lang="scss">
	@import '@/common/styles/variable.scss';
	
	.search-container {
		
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
		
	}
</style>
