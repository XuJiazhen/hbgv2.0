<template>
	<view class="login-container">
		<view class="login-form">
			<view class="login-method">
				<view class="use-account" @click="onUseAccount" :class="[useAccount ? 'active' : '']">
					<text>账号密码登录</text>
				</view>
				<view class="use-phone" @click="onUsePhone" :class="[usePhone ? 'active' : '']">
					<text>手机快速登录</text>
				</view>
			</view>			

			<template v-if="useAccount">
				<account-view @inputAccountName="onInputAccountName" @inputPassward="onInputPassward" />
			</template>
			
			<template v-if="usePhone">
				<phone-view />
			</template>

			<button type="default" class="btn-primary" style="margin: 30px 0 10px 0;" @click="login">登录</button>
			<button type="default" class="btn-secondary" style="margin-bottom: 10px;" @click="register">新员工入职</button>
			<template v-if="usePhone">
				<view class="forget-pwd">
					忘记密码
				</view>
			</template>
		</view>
		<view class="other-login">
			<view class="title">
				<text class="line line-left"></text>
				<text class="text">其它登录方式</text>
				<text class="line line-right"></text>
			</view>

			<view class="btns">
				<view class="wexin" style="background-color: #6cc2a5;">
					<uni-icons type="weixin" size="28" color="#ffffff"></uni-icons>
				</view>
				<view class="qq" style="background-color: #85b7cb;">
					<uni-icons type="qq" size="28" color="#ffffff"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AccountView from './AccountView.vue'
	import PhoneView from './PhoneView.vue'

	export default {
		components: {
			AccountView,
			PhoneView
		},
		data() {
			return {
				phonenumber: '',
				captcha: '',
				nameOrEmailOrPhone: '',
				passward: '',
				useAccount: true,
				usePhone: false,
				accountName: '',
				passward: ''
			}
		},
		computed: {
			whichMethod() {
				return this.useAccount ? 'account-view' : 'phone-view'
			}
		},
		methods: {
			onUseAccount(e) {
				console.log('LOGIN WITH ACCOUNT.')
				this.useAccount = true
				this.usePhone = false
			},
			onUsePhone(e) {
				console.log('LOGIN WITH PHONE.')
				this.useAccount = false
				this.usePhone = true
			},
			login(e) {
				console.log('LOGIN')
				const _this = this
				const accountName = this.accountName
				const passward = this.passward
				if (!accountName) {
					uni.showToast({
						title: '请填写用户名',
						position: 'bottom',
						icon: 'none'
					})
					return 
				}
				if (!passward) {
					uni.showToast({
						title: '请填写密码',
						position: 'bottom',
						icon: 'none'
					})
					return 
				}
				
				wx.request({
					url: 'https://ht.huijianfc.cn/appapi.php/login/login',
					method: 'GET',
					data: {
						cellphone: accountName,
						pwd: passward,
						clientid: plus.push.getClientInfo().clientid
					},
					success: ({ data }) => {
						if(data.status === 0) {
							uni.showToast({
								title: data.msg,
								position: 'bottom',
								icon: 'none',
								success: () => {
									console.log('登录失败')
								}
							})
						} else {
							uni.showToast({
								title: '登录成功',
								position: 'bottom',
								icon: 'success',
								success: () => {
									uni.setStorageSync('userInfo', JSON.stringify(data.info))
									uni.reLaunch({
										url: '../../tabbar/desk/desk',
										success: () => {
											console.log('TO INDEX PAGE.')
										}
									})
									console.log('登录成功')
								}
							})
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			register(e) {
				uni.navigateTo({
					url: '../register/index',
					success: () => {
						console.log('TO REGISTER PAGE.')
					}
				})
			},
			onInputAccountName(val) {
				this.accountName = val
			},
			onInputPassward(val) {
				this.passward = val
			}
		},
		onLoad(option) {
			console.log('PHONE-LOGIN PAGE IS LOADED.')
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/styles/variable.scss';

	.login-container {
		width: 100%;
		height: 100vh;
		background-color: $white;
		position: relative;

		.login-form {
			width: 90%;
			height: auto;
			margin: 20% auto;
			height: 300px;

			.login-method {
				display: flex;
				flex-direction: row;
				margin-bottom: 30px;

				view {
					width: 50%;
					background-color: $white;
					color: $grey;
					font-size: 16px;
					height: 40px;
					line-height: 40px;
				}

				.use-account {
					text-align: left;
				}

				.use-phone {
					text-align: right;
				}

				.active {
					color: $primary;
					font-weight: bold;
					font-size: 24px;
				}
			}

			.forget-pwd {
				color: $grey;
				text-align: right;
				font-size: 14px;
			}
		}

		.other-login {
			width: 90%;
			margin: 0 auto;

			.title {
				display: flex;
				flex-direction: row;
				align-items: center;

				.line {
					border-bottom: 1px solid $lightgrey;
					flex: 1;
				}

				.text {
					color: $grey;
					font-size: 14px;
					margin: 0 10px;
				}
			}

			.btns {
				display: flex;
				flex-direction: row;
				justify-content: center;

				view {
					margin: 0 30px;
					margin-top: 30px;
					width: 40px;
					height: 40px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
				}
			}

		}
	}
</style>
