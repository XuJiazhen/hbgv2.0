<template>
	<view class="cus-input">
		<input 
		class="input-self" 
		:type="inputType" 
		:value="value" 
		:placeholder="placeholder" 
		:password="type === 'passward' && !showPassward"
		@input="onInput" />
		<slot name="button"></slot>
		<template v-if="clearable && value.length">
			<uni-icons type="closeempty" size="22" class="icon-input" @click="onClear" />
		</template>
		<template v-if="displayable">
			<uni-icons :type="showPassward ? 'eye-slash' : 'eye'" size="22" class="icon-input" @click="onShowpassward" />
		</template>
	</view>
</template>

<script>
	export default {
		name: 'CusInput',
		props: {
			placeholder: String,
			type: String,
			value: String,
			clearable: {
				type: [Boolean, String],
				default: false
			},
			displayable: {
				type: [Boolean, String],
				default: false
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		data() {
			return {
				showPassward: false
			}
		},
		computed: {
			inputType() {
				const type = this.type
				return type === 'passward' ? 'text' : type
			}
		},
		methods: {
			onInput(e) {
				this.$emit('input', e.detail.value)
			},
			onClear(e) {
				this.$emit('input', '')
				console.log('CLEAR INPUT.')
			},
			onShowpassward(e) {
				this.showPassward = !this.showPassward
				console.log('SHOW PASSWARD.')
			}
		}
	}
</script>

<style lang="scss">
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
