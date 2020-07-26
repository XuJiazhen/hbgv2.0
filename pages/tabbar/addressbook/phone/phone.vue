<template>
	<view class="phonebook-container">

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneContacts: []
			};
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
		
	}
</style>
