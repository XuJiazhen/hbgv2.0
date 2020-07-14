<template>
	<view>
		<view class="cus-input">
			<input class="input-self" type="text" placeholder="用户名/邮箱/手机号" v-model="accountName" @input="onAccountNameInput" />
			<uni-icons type="closeempty" size="22" class="icon-input" @click="onClear" />
		</view>
		
		<view class="cus-input">
			<input class="input-self" type="text" :password="!showPassward" placeholder="登录密码" v-model="passward" @input="onPasswardInput" />
			<uni-icons :type="showPassward ? 'eye-slash' : 'eye'" size="22" class="icon-input" @click="onShowpassward" />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AccountView',
		data() {
			return {
				accountName: '',
				passward: '',
				showPassward: false
			}
		},
		methods: {
			onAccountNameInput() {
				this.$emit('inputAccountName', this.accountName)
			},
			onPasswardInput() {
				this.$emit('inputPassward', this.passward)
			},
			onClear() {
				this.$emit('inputAccountName', '')
				this.accountName = ''
				console.log('CLEAR INPUT.')
			},
			onShowpassward() {
				this.showPassward = !this.showPassward
				console.log('SHOW PASSWARD.')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';

	.cus-input {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: $white;
		width: 100%;
		height: 44px;
		margin-bottom: 10px;
		border-bottom: 1px solid $lightgrey;

		.input-self {
			flex: 1;
			width: 100%;
			height: 100%;
			font-size: 14px;
			padding-left: 10px;
		}
	}
</style>
