<template>
	<view class="register-container">
		<view class="hint">
			<text>请如实填写以下信息，以便HR为您办理入职手续</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			onBackoff(e) {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';
	
	.register-container {
		
		.hint {
			font-size: 14px;
			color: $grey;
			text-align: center;
			margin: 10px 0;
		}
	}
</style>
