<template>
	<view class="register-container">

		<view class="hint">
			<text>请如实填写以下信息，以便HR为您办理入职手续</text>
		</view>

		<view class="form-content">
			<view class="section idcard-info">
				<view class="title">
					<view class="label">
						<text>基本信息</text>
					</view>
					<view class="autofill">
						<uni-icons type="camera" size="14" color="#fff"></uni-icons>
						<text>拍摄身份证自动填写信息</text>
					</view>
				</view>
				<view class="content">
					<view class="row" v-for="info in idcardInfo">
						<view class="row-title">
							<text class="text">{{ info.label }}</text>
						</view>
						<view class="row-content">
							<input type="text" :value="info.value" disabled="true" />
						</view>
					</view>
				</view>
			</view>

			<view class="section personal-info">
				<view class="title">
					<view class="label">
						<text>个人信息</text>
					</view>
				</view>
				<view class="content">
					<view class="row">
						<view class="row-title">
							<text class="text">手机号</text>
						</view>
						<view class="row-content">
							<input type="text" :value="phonenumber" placeholder="请输入手机号" />
						</view>
					</view>

					<view class="row">
						<view class="row-title">
							<text class="text">验证码</text>
						</view>
						<view class="row-content">
							<input type="text" :value="phonenumber" placeholder="请输入验证码" />
							<button type="default" size="mini">获取验证码</button>
						</view>
					</view>

					<view class="row">
						<view class="row-title">
							<text>婚姻状况</text>
						</view>
						<view class="row-content">
							<picker class="picker" mode="selector" :range="marStateList" :value="curMarState" @change="onMarStateChange">
								<view class="picker-view">{{ curMarState ? curMarState : '请选择' }}</view>
								<uni-icons type="forward"></uni-icons>
							</picker>
						</view>
					</view>

					<view class="row">
						<view class="row-title">
							<text>首次参加工作时间</text>
						</view>
						<view class="row-content">
							<picker class="picker" mode="date" :value="firstWorkingDate" @change="onFirstWorkingDateChange">
								<view class="picker-view">{{ firstWorkingDate ? firstWorkingDate : '请选择' }}</view>
								<uni-icons type="forward"></uni-icons>
							</picker>
						</view>
					</view>

					<view class="row">
						<view class="row-title">
							<text>户籍类型</text>
						</view>
						<view class="row-content">
							<picker class="picker" mode="selector" :range="hdTypeList" :value="curHDType" @change="onHDTypeChange">
								<view class="picker-view">{{ curHDType ? curHDType : '请选择' }}</view>
								<uni-icons type="forward"></uni-icons>
							</picker>
						</view>
					</view>

					<view class="row">
						<view class="row-title">
							<text class="text">居住地址</text>
						</view>
						<view class="row-content">
							<input type="text" :value="residentialAddr" placeholder="请输入居住地址" />
						</view>
					</view>

					<view class="row">
						<view class="row-title">
							<text class="text">社保账户</text>
						</view>
						<view class="row-content">
							<input type="text" :value="soseAccount" placeholder="请输入个人社保账户" />
						</view>
					</view>
					

				</view>
			</view>

			<view class="section education-info">
				<view class="title">
					<view class="label">
						<text>学历信息</text>
					</view>
				</view>
				<view class="content">

					<view class="row">
						<view class="row-title">
							<text>学历</text>
						</view>
						<view class="row-content">
							<picker class="picker" mode="selector" :range="eduInfoList" :value="curEduInfo" @change="onEduInfoChange">
								<view class="picker-view">{{ curEduInfo ? curEduInfo : '请选择' }}</view>
								<uni-icons type="forward"></uni-icons>
							</picker>
						</view>
					</view>
					
					<view class="row">
						<view class="row-title">
							<text>毕业院校</text>
						</view>
						<view class="row-content">
							<input type="text" :value="university" placeholder="请输入最高毕业院校" />
						</view>
					</view>
					
					<view class="row">
						<view class="row-title">
							<text>毕业时间</text>
						</view>
						<view class="row-content">
							<picker class="picker" mode="date" :value="graduationDate" @change="onGraduationDateChange">
								<view class="picker-view">{{ graduationDate ? graduationDate : '请选择' }}</view>
								<uni-icons type="forward"></uni-icons>
							</picker>
						</view>
					</view>

					<view class="row">
						<view class="row-title">
							<text class="text">所学专业</text>
						</view>
						<view class="row-content">
							<input type="text" :value="profession" placeholder="请输入专业名称" />
						</view>
					</view>

				</view>
			</view>
			
			
			<view class="section education-info">
				<view class="title">
					<view class="label">
						<text>紧急联系人</text>
					</view>
				</view>
				<view class="content">
					
					<view class="row">
						<view class="row-title">
							<text class="text">联系人姓名</text>
						</view>
						<view class="row-content">
							<input type="text" :value="contactName" placeholder="请输入专业名称" />
						</view>
					</view>
					
					<view class="row">
						<view class="row-title">
							<text class="text">联系人关系</text>
						</view>
						<view class="row-content">
							<picker class="picker" mode="selector" :value="contactRela" :range="contactRelaList" @change="onContactRelaChange">
								<view class="picker-view">{{ contactRela ? contactRela : '请选择' }}</view>
								<uni-icons type="forward"></uni-icons>
							</picker>
						</view>
					</view>
					
					<view class="row">
						<view class="row-title">
							<text class="text">联系人电话</text>
						</view>
						<view class="row-content">
							<input type="text" :value="contactNumber" placeholder="请输入手机号" />
						</view>
					</view>
			
				</view>
			</view>
			
		</view>

		<view class="submit-container">
			<button type="default" class="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idcardInfo: [{
						label: '身份证姓名',
						value: '胥佳桢',
					},
					{
						label: '身份证号码',
						value: '510182199609235115'
					},
					{
						label: '出生日期',
						value: '1996.9.23'
					},
					{
						label: '性别',
						value: '男'
					},
					{
						label: '民族',
						value: '汉'
					},
					{
						label: '身份证地址',
						value: '四川省彭州市XXX小区XX幢XX楼XX号'
					},
					{
						label: '证件有效期',
						value: '2022.6.1'
					}
				],
				phonenumber: '',
				marStateList: ['未婚', '已婚', '离异', '丧偶', '分居'],
				curMarState: '',
				hdTypeList: ['本地城镇', '本地农村', '外地城镇（省内）', '外地农村（省内）', '外地城镇（省外）', '外地农村（省外）'],
				curHDType: '',
				eduInfoList: ['高中', '中专', '大专', '本科', '硕士', '博士', '其他'],
				curEduInfo: '',
				firstWorkingDate: '',
				residentialAddr: '',
				soseAccount: '',
				university: '',
				graduationDate: '',
				profession: '',
				contactName: '',
				contactNumber: '',
				contactRelaList: ['父母', '配偶', '子女', '其它'],
				contactRela: ''
			};
		},
		methods: {
			onBackoff(e) {
				uni.navigateBack()
			},
			onMarStateChange(e) {
				this.curMarState = this.marStateList[e.detail.value]
			},
			onFirstWorkingDateChange(e) {
				this.firstWorkingDate = e.detail.value
			},
			onHDTypeChange(e) {
				this.curHDType = this.hdTypeList[e.detail.value]
			},
			onEduInfoChange(e) {
				this.curEduInfo = this.eduInfoList[e.detail.value]
			},
			onGraduationDateChange(e) {
				this.graduationDate = e.detail.value
			},
			onContactRelaChange(e) {
				this.contactRela = this.contactRelaList[e.detail.value]
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/styles/variable.scss';

	.register-container {
		background-color: $spgrey;
		position: relative;
		width: 100%;
		height: 100vh;

		.hint {
			font-size: 14px;
			color: $grey;
			text-align: center;
			padding: 10px 40rpx 0 40rpx;
		}

		.form-content {
			margin-bottom: 55px;

			.section:last-child::after {
				content: '';
				width: 100%;
				height: 10px;
				background-color: $spgrey;
				display: block;
			}

			.section {

				.title {
					font-size: 14px;
					color: $grey;
					padding: 30px 40rpx 10px 40rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					background-color: $spgrey;

					.label {
						padding: 3px 0;
					}

					.autofill {
						background-color: $Secondary;
						color: $white;
						border-radius: 3px;
						padding: 3px;

						text {
							margin-left: 5px;
							padding: 3px 0;
						}
					}
				}

				.content {
					background-color: $white;

					.row {
						padding: 10px 0;

						.row-title {
							padding: 0 40rpx;
							position: relative;
							font-size: 14px;
							color: $grey;

							.text {

								&::before {
									content: '*';
									color: red;
									position: absolute;
									left: 7px;
									top: 57%;
									transform: translateY(-43%);
								}
							}
						}

						.row-content {
							margin: 0 40rpx;
							height: 35px;
							line-height: 35px;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							border-bottom: 1px solid $spgrey;

							.picker {
								width: 100%;
								display: flex;
								flex-direction: row;
								justify-content: space-between;

								.picker-view {
									flex: 1;
								}
							}

							uni-input {
								height: 100%;
								box-sizing: border-box;
								flex: 1;
							}

							button {
								background-color: $Secondary;
								color: $white;
								font-size: 14px;
							}

						}
					}

					.row:last-child {
						padding-bottom: 0;
					}
				}
			}
		}

		.submit-container {
			background-color: $white;
			width: 100%;
			height: 55px;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 1px solid $spgrey;

			.submit {
				width: 90%;
				background-color: $Primary;
				border-radius: 3px;
				color: $white;
			}
		}
	}
</style>
