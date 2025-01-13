<template>
	<view class="content">
		<view class="header">
			<view class="headerGoBack" @click="goBack">
				<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
				<view class="" style="color: #333;">
					发布日常任务
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height: swiperWidth + 'px'}">
			<view class="container">
				<uni-forms ref="form" :modelValue="formData" label-width="200px" label-position="top" :rules="rules">
					<uni-forms-item label="所属单位" required name="depId" v-if="userDepId == 1">
						<picker @change="depIdChange" :value="depIdIndex" :range="depIdArray" range-key="label">
							<view class="uni-input">{{depIdArray[depIdIndex].label}}</view>
						</picker>
					</uni-forms-item>
					<uni-forms-item label="发布类型" required name="publishType">
						<picker @change="publishTypeChange" :value="publishTypeIndex" :range="publishTypeArray"
							range-key="label">
							<view class="uni-input">{{publishTypeArray[publishTypeIndex].label}}</view>
						</picker>
					</uni-forms-item>

					<uni-forms-item label="计划时间(开始-结束)" required name="planStartTime">
						<view class="time">

							<view class="timeItem">
								<picker style="width: 60%;" mode="date" :value="formData.planStartTimeYMD"
									@change="startYMDbindDateChange">
									<view class="uni-input">{{formData.planStartTimeYMD}}</view>
								</picker>
								<picker style="width: 38%;" mode="time" :value="formData.planStartTimeHms" start="00:00"
									end="23:59" @change="startHmsbindTimeChange">
									<view class="uni-input">{{formData.planStartTimeHms}}</view>
								</picker>
							</view>
							<view style="height: 8px;">

							</view>
							<view class="timeItem">
								<picker style="width: 60%;" mode="date" :value="formData.planEndTimeYMD"
									@change="endYMDbindDateChange">
									<view class="uni-input">{{formData.planEndTimeYMD}}</view>
								</picker>
								<picker style="width: 38%;" mode="time" :value="formData.planEndTimeHms" start="00:00"
									end="23:59" @change="endHmsbindTimeChange">
									<view class="uni-input">{{formData.planEndTimeHms}}</view>
								</picker>
							</view>
						</view>
					</uni-forms-item>
					<uni-forms-item label="任务内容" required name="taskContent">
						<textarea class="contentTextarea" v-model="formData.taskContent" style="height: 72px;"
							placeholder-style="color:#aaa" placeholder="请输入" />
					</uni-forms-item>
					<uni-forms-item label="执行类型" required name="executorMode">
						<picker @change="executorModeChange" :value="executorModeIndex" :range="executorModeArray"
							range-key="label">
							<view class="uni-input">{{executorModeArray[executorModeIndex].label}}</view>
						</picker>
					</uni-forms-item>
					<uni-forms-item label="执行人" required name="executor">
						<picker @change="executorChange" :value="executorIndex" :range="executorArray"
							range-key="label">
							<view class="uni-input">{{executorArray[executorIndex].label}}</view>
						</picker>
					</uni-forms-item>
				</uni-forms>
			</view>
		</scroll-view>
		<view class="footer">
			<view class="btn act" @click="reset">
				重置
			</view>
			<view class="btn" @click="publish">
				发布
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import taskHttp from '../../../api/task.js'
	export default {
		data() {
			return {
				pageHeight: 0,
				swiperWidth: 0,
				username: uni.getStorageSync('username'),
				realName: uni.getStorageSync('realName'),
				phone: uni.getStorageSync('phone'),
				roleIds: uni.getStorageSync('roleIds'),
				roleNames: uni.getStorageSync('roleNames'),
				userDepId: uni.getStorageSync('depId'),
				formData: {
					depId: '',
					publishType: '1',
					planStartTime: moment().format('YYYY-MM-DD 00:00:00'),
					planStartTimeYMD: moment().format('YYYY-MM-DD'),
					planStartTimeHms: '00:00',
					planEndTime: moment().format('YYYY-MM-DD 23:59:59'),
					planEndTimeYMD: moment().format('YYYY-MM-DD'),
					planEndTimeHms: '23:59',
					taskContent: '',
					executor: "",
					executorMode: "1",
				},
				depIdArray: [{
						label: "星沙厂",
						value: "2",
					},
					{
						label: "城西厂",
						value: "3"
					},
					{
						label: "城北厂",
						value: "4"
					},
					{
						label: "城南厂",
						value: "5"
					},
					{
						label: "城东厂",
						value: "6"
					},
				],
				depIdIndex: 0,
				publishTypeArray: [{
						label: "单次",
						value: "1"
					},
					{
						label: "每天",
						value: "2"
					},
				],
				publishTypeIndex: 0,
				executorModeArray: [{
						label: "当日值班班组",
						value: "1"
					},
					{
						label: "固定班组",
						value: "2"
					},
					{
						label: "固定人员",
						value: "3"
					},
				],
				executorModeIndex: 0,
				classesShowList: [],
				userList: [],
				groupList: [],
				executorArray: [],
				executorIndex: 0
			}
		},
		onLoad(options) {},
		watch: {
			'formData.depId'(newVal, oldVal) {
				console.log(newVal, oldVal)
				this.getWorkClassQueryWorkClassShow()
				this.userQueryUserList()
				this.getWorkteamsQueryWorkTeams()
			},
			'formData.executorMode'(newVal, oldVal) {
				if (newVal == '1') {
					this.executorArray = this.classesShowList
				} else if (newVal == '2') {
					this.executorArray = this.groupList
				} else if (newVal == '3') {
					this.executorArray = this.userList
				}
				console.log(this.executorArray, 'typeList')
			},
		},
		mounted() {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 150
			console.log(this.userDepId)
			this.depIdIndex = this.userDepId > 1 ? this.userDepId - 2 : 0
			this.formData.depId = this.userDepId
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1, // 返回层数，2则上上页
					success() {
						console.log('11111')
						uni.$emit('update', {
							msg: '页面更新'
						})
					}
				})
			},
			depIdChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.depIdIndex = e.detail.value
				this.formData.depId = this.depIdArray[this.depIdIndex].value
			},
			publishTypeChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.publishTypeIndex = e.detail.value
				this.formData.publishType = this.publishTypeArray[this.publishTypeIndex].value
			},
			executorModeChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.executorModeIndex = e.detail.value
				this.formData.executorMode = this.executorModeArray[this.executorModeIndex].value
			},
			executorChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.executorIndex = e.detail.value
				this.formData.executor = this.executorArray[this.executorIndex].value
			},
			startYMDbindDateChange: function(e) {
				this.formData.planStartTimeYMD = e.detail.value
				this.formData.planStartTime = this.formData.planStartTimeYMD + ' ' + this.formData.planStartTimeHms + ':00'
			},
			startHmsbindTimeChange: function(e) {
				this.formData.planStartTimeHms = e.detail.value
				this.formData.planStartTime = this.formData.planStartTimeYMD + ' ' + this.formData.planStartTimeHms + ':00'
			},
			endYMDbindDateChange: function(e) {
				this.formData.planEndTimeYMD = e.detail.value
				this.formData.planEndTime = this.formData.planEndTimeYMD + ' ' + this.formData.planEndTimeHms + ':59'
			},
			endHmsbindTimeChange: function(e) {
				this.formData.planEndTimeHms = e.detail.value
				this.formData.planEndTime = this.formData.planEndTimeYMD + ' ' + this.formData.planEndTimeHms + ':59'
			},
			// 查询班次信息
			getWorkClassQueryWorkClassShow(type, row) {
				let params = {
					depId: this.formData.depId,
					classType: "1",
					isDelete: "0",
					pageNo: 1,
					pageSize: 1000,
				};
				taskHttp.workClassQueryWorkClass(params).then(res => {
					if (res.data.code == 200) {
						res.data.data.records.forEach((item) => {
							item.label = item.className;
							item.value = item.id + "";
						});
						this.classesShowList = res.data.data.records;
						this.executorArray = this.classesShowList
						this.formData.executor = this.executorArray[0].value
					}
				})
			},
			userQueryUserList(row) {
				let params = {
					depId: this.formData.depId,
					isDelete: 0,
					pageNo: 1,
					pageSize: 10000,
				};
				taskHttp.userQueryUserList(params).then(res => {
					if (res.data.code == 200) {
						res.data.data.records.forEach((item) => {
							item.label = item.realName;
							item.value = item.id + "";
						});
						this.userList = res.data.data.records;
					}
				})
			},
			// 查询班组信息
			getWorkteamsQueryWorkTeams(row) {
				let params = {
					depId: this.formData.depId,
					pageNo: 1,
					pageSize: 10000,
				};
				taskHttp.workteamsQueryWorkTeams(params).then(res => {
					if (res.data.code == 200) {
						res.data.data.records.forEach((item) => {
							item.label = item.teamName;
							item.value = item.id + "";
						});
						this.groupList = res.data.data.records;
					}
				})
			},
			publish(){
				console.log(this.formData, 'this.formData')
				taskHttp.dailyTaskPublish(this.formData).then(res => {
					if (res.data.code == 200) {
							uni.showToast({
								title: "发布成功",
								icon: "none",
							});
							this.goBack()
					}
				})
			},
			reset() {
				this.formData.depId = this.userDepId
				this.formData.publishType = '1'
				this.formData.planStartTime = moment().format('YYYY-MM-DD 00:00')
				this.formData.planStartTimeYMD = moment().format('YYYY-MM-DD')
				this.formData.planStartTimeHms = '00:00'
				this.formData.planEndTime = moment().format('YYYY-MM-DD 23:59')
				this.formData.planEndTimeYMD = moment().format('YYYY-MM-DD')
				this.formData.planEndTimeHms = '23:59'
				this.formData.taskContent = ''
				this.formData.executor = ''
				this.formData.executorMode = '1'
				this.depIdIndex = 0
				this.publishTypeIndex = 0
				this.executorModeIndex = 0
				this.executorIndex = 0
			}
		},
	}
</script>
<style lang="less">
	.content {
		width: 100%;
		height: 100%;
		position: relative;
		box-sizing: border-box;
		padding: 80px 0 40px;

		.header {
			height: 80px;
			position: absolute;
			top: 0px;
			width: 100%;
			padding-top: 30px;
			box-sizing: border-box;
			border-bottom: 1px solid #ffeeee;

			.headerGoBack {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #ff575c;
				font-size: 18px;
				line-height: 50px;
				padding: 0px 0px 5px 10px
			}
		}

		.container {
			flex: 1;
			display: flex;
			flex-direction: column;
			min-height: 0;
			padding: 0 15px;

			.title {
				margin-bottom: 4px;
			}

			.contentTextarea {
				height: 50px;
				background: #f6f6f6;
				border-radius: 6px;
				padding: 8px;
				box-sizing: border-box;
				width: 100%;
				color: #666;
				font-size: 12px;
			}
		}

		.footer {
			border-top: 1px solid #ffeeee;
			height: 70px;
			position: absolute;
			bottom: 0px;
			width: 100%;
			box-sizing: border-box;
			padding: 15px 15px;
			display: flex;
			flex-direction: row;

			.btn {
				flex: 1;
				height: 40px;
				border-radius: 20px;
				background: #ff575c;
				color: #fff;
				text-align: center;
				line-height: 40px;
				margin: 0 10px;

				&.act {
					background: #ffeeee;
					color: #ff575c;
				}
			}
		}
	}

	.time {
		width: 100%;
		display: flex;
		flex-direction: column;

		.timeItem {

			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.uni-input {
		background: #f6f6f6;
		padding: 10px;
		border-radius: 6px;
	}

	.uni-label-pointer {
		margin-right: 10px;
		margin-bottom: 10px !important;
	}

	.uni-checkbox-input {
		width: 16px;
		height: 16px;
		margin: 5px;
		border: 1px solid #ff575c !important;
	}
</style>