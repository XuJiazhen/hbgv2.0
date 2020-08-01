<template>
	<view class="search-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons class="icon-back" type="back" size="28" color="black" @click="onBackoff" />
				<input class="search-input" type="text" placeholder="搜索" focus="true" @input="onInput" />
			</view>
		</view>

		<view class="search-list">
			<view class="title" v-if="resultList.length !== 0">
				<text>联系人</text>
			</view>
			<view class="search-item" v-for="item in resultList" @click="toContactInfo(item.hj_uid)">
				<view class="left">
					<image v-if="item.avatarUrl" class="avatar-img" :src="item.avatarUrl" mode="scaleToFill" />
					<view v-else class="avatar-text">
						<text>{{ item.name | getInitial }}</text>
					</view>
				</view>
				<view class="right">
					<text class="text">{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		debounce
	} from '@/static/js/common.js'

	export default {
		data() {
			return {
				sourceData: [],
				resultList: [],
				searchText: '',
			};
		},
		methods: {
			onBackoff() {
				console.log('BACKOFF.')
				uni.navigateBack({
					delta: 1,
					animationType: 'fade-out',
					animationDuration: 300
				})
			},
			onInput: debounce(function(e) {
				this.searchText = e.detail.value
			}, 500),
			toContactInfo(id) {
				uni.navigateTo({
					url: `../contact/contact?hj_uid=${ id }`
				})
				console.log('TO PAGE CONTACT.')
			}
		},
		watch: {
			searchText(newVal, oldVal) {
				if (!newVal) {
					this.resultList = []
				}

				const tempList = []
				this.sourceData.forEach((item) => {
					if (newVal && item.name.indexOf(newVal) !== -1) {
						tempList.push(item)
					}
				})

				this.resultList = tempList
			}
		},
		filters: {
			getInitial(val) {
				return val.substring(1, 3)
			}
		},
		onLoad(options) {
			this.sourceData = JSON.parse(options.source_data)
			console.log('SEARCH PAGE LOADED.', options)
		}
	}
</script>

<style lang="scss">
	@import '@/common/styles/variable.scss';

	.search-container {

		.cus-navbar {
			height: calc(var(--status-bar-height) + 55px);
			background-color: $spgrey;
			color: $black;
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

				.icon-back {}

				.search-input {
					flex: 1;
					height: 60%;
					margin-left: 30rpx;
					border-bottom: 1px solid $grey;
				}
			}
		}

		.search-list {
			width: 100%;
			margin-top: calc(var(--status-bar-height) + 55px);

			.title {
				height: 30px;
				line-height: 30px;
				background-color: $white;
				padding: 0 30rpx;
				border-bottom: 1px solid $spgrey;
				color: $grey;
			}

			.search-item {
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

			.search-item:last-child {

				.right {
					border: none;
				}
			}
		}
	}
</style>
