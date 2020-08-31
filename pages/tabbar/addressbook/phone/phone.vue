<template>
	<view class="phonebook-container">
		<view class="cus-navbar">
			<view class="status_bar"></view>
			<view class="title_bar">
				<uni-icons class="icon-back" type="back" size="28" color="black" @click="onBackoff" />
				<input class="search-input" type="text" placeholder="搜索" focus="true" @input="onInput" />
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
				phoneContacts: []
			};
		},

		methods: {
			onBackoff() {
				console.log('BACKOFF.')
				uni.navigateBack({
					delta: 1
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
		onLoad() {
			uni.showLoading({
				title: '正在加载'
			})
			// #ifdef APP-PLUS
			plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => {
				console.log('GET ADDRESSBOOK SUCCESSFULLY.', addressbook)
				addressbook.find(['displayName', 'phoneNumbers'], (contacts) => {
					console.log('GET CONTACTS SUCCESSFULLY.', contacts)
				}, (err) => {
					console.log('GET CONTACTS FAILED.', err)
				})
				uni.hideLoading()
			}, (err) => {
				console.log('GET ADDRESSBOOK FAILED.', err)
				uni.hideLoading()
			})
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';

	.phonebook-container {

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
	}
</style>
