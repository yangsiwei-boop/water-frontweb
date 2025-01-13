<template>
	<view>
		<scroll-view scroll-y="true" style="height: 100%;">
			<view style="width: 100%;height: 1px;"></view>
			<view class="timeSection" style="padding:5px;z-index: 1002;">
				<view class="year yearDataSelect" style="width: 25%;margin: 10px 0 0 10px;" v-if="depId == '1'">
					<!-- <picker style="width: 100%;text-align: center" @change="bindPickerChange"
						:value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker> -->
					<uni-data-select class="yearDataSelect" v-model="currentFactory" :localdata="range"
						@change="changeFactory" title='title'></uni-data-select>
				</view>
				<view class="" style="width: 1px;">

				</view>
				<view class="historyList" @click="toHistory">
					<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
						src="../../../../static/images/History.png"></image>
				</view>
			</view>

			<view class="timeSection" style="padding: 10px 18px 10px;">
				<scroll-view scroll-y="true" :show-scrollbar='false' :style="{height: height + 'px'}">
					<view class="inspectionList" v-if="hasDate > 0">
						<view class="inspectionItemItem" v-for="(item, index) in inspectionTaskList" :key="item.id">
							<uni-card class="cardItem" v-if="item.auditStatus == '0'">
								<view class="eqDetail">
									<view class="detailIcon">
										<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
											src="../../../../static/images/device_normal.png"></image>
									</view>
									<view class="detail">

										<view class="content">
											<!-- {{item}} -->
											<view class="name" style="width: 75%;">
												[{{transformDepId(item.depId)}}]
												[{{transformDataType(item.dataType)}}]
												[{{transformAuditType(item.auditType)}}]
											</view>
											<view style="text-align: right;">
												<uni-icons type="trash" size="24" :style="{color: '#ff575c'}"
													@click="dialogToggle(item)"></uni-icons>
											</view>
										</view>
										<view class="content">
											<view style="color: #666">
												{{item.username}}
											</view>
										</view>
									</view>
								</view>
								<view class="eqDetail">
									<view class="detailIcon">
										<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
											src="../../../../static/images/addtime.png"></image>
									</view>
									<view class="detail" style="color: #666">
										{{item.createTime }}
									</view>
									<view v-if="userId == '1'" class="btn" style="background: #ff575c;"
										@click="approveItemAccept(item)">
										审核
									</view>
								</view>
							</uni-card>
						</view>
					</view>
					<view class="inspectionEmpty" v-else>
						<view style="display: block;text-align: center;padding-top: 40px;">
							<image style="width: 100px;height: 66px;" src="../../../../static/images/noData.png">
							</image>
							<view style="color: #666;">无审批任务</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</scroll-view>
	</view>

	<!-- 提示窗示例 -->
	<uni-popup ref="alertDialog" type="dialog" style="z-index: 9999;top: 0;bottom: 0;">
		<uni-popup-dialog cancelText="取消" confirmText="确认" title="删除" content="是否删除当前审批数据？" @confirm="dialogConfirm"
			@close="dialogClose"></uni-popup-dialog>
	</uni-popup>
</template>

<script>
	import taskHttp from '../../../../api/task.js'
	export default {
		props: {
			height: Number
		},
		data() {
			return {
				currentFactory: '2',
				range: [{
					value: '2',
					text: '星沙厂'
				}, {
					value: '3',
					text: '城西厂'
				}, {
					value: '4',
					text: '城北厂'
				}, {
					value: '5',
					text: '城南厂'
				}, {
					value: '6',
					text: '城东厂'
				}, ],
				scrollTop: 0,

				inspectionTaskList: [],
				depId: uni.getStorageSync('depId'),
				userId: uni.getStorageSync('userId'),
				hasDate: 0,
				roleIds: uni.getStorageSync('roleIds'),
				roleNames: uni.getStorageSync('roleNames'),
				isAdmin: false,
				isEquipmentManager: false,
				msgType: '',
				messageText: '',
				currentTask: ''
			}
		},
		onLoad() {

		},
		mounted() {
			this.isAdmin = this.roleNames.includes('sysadmin') || this.roleNames.includes('admin')
			this.isEquipmentManager = this.roleNames.includes('设备负责人')
			this.currentFactory = this.depId
			this.initDate()
			let that = this
			uni.$on('update', function(data) {
				console.log(data)
				that.initDate()
			})
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			changeFactory(e) {
				this.search()
			},
			initDate() {
				this.search()
			},
			search() {
				let params = {
					depId: this.currentFactory,
					// depId: '1',
					// startTime: this.currentDate,
					// endTime: this.currentDate,
					auditStatus: '0',
					pageNo: 1,
					pageSize: 1000,
				};
				taskHttp.queryAudit(params).then((res) => {
					if (res.data.code == 200) {
						res.data.data.records.forEach(item => {
							if (item.auditStatus == '0') {
								this.hasDate++
							}
						})
						this.inspectionTaskList = res.data.data.records
					}
				});
			},

			transformDepId(id) {
				console.log(id, 'id')
				return id == "1" ?
					"公司" :
					id == "2" ?
					"星沙厂" :
					id == "3" ?
					"城西厂" :
					id == "4" ?
					"城北厂" :
					id == "5" ?
					"城南厂" :
					"城东厂";
			},
			transformDataType(id) {
				console.log(id, 'id2222')
				return id == "1" ?
					"手工录入" :
					"文件上传";
			},
			transformAuditType(id) {
				console.log(id, 'id33333')
				return id == 1 ?
					"生产数据" :
					id == 2 ?
					"化验数据" :
					"工艺数据"
			},
			rightColor(index) {
				let colorClass = index % 6 == 0 ?
					"color1" :
					index % 6 == 1 ?
					"color2" :
					index % 6 == 2 ?
					"color3" :
					index % 6 == 3 ?
					"color4" :
					index % 6 == 4 ?
					"color5" :
					index % 6 == 5 ?
					"color6" :
					""
				console.log(colorClass, 'index')
				return '' + colorClass
			},

			upkeepLevelName(id) {
				return id == "0" ?
					"未分配" :
					id == "10" ?
					"进行中" :
					id == "90" ?
					"已完成" :
					id == "100" ?
					"关闭" :
					id == "99" ?
					"未通过" :
					"";
			},
			upkeepLevelClass(id) {
				return id == "0" ?
					"color0" :
					id == "10" ?
					"color10" :
					id == "90" ?
					"color90" :
					id == "99" ?
					"color99" :
					id == "100" ?
					"color100" :
					"";
			},
			approveItemAccept(item) {
				let query = ''
				if (item) {

					query = Object.keys(item)
						.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(item[key])}`)
						.join('&');
				}
				uni.navigateTo({
					url: `/pages/task/components/approve/accept?type=accept&${query}`,
					// ${item.specificationModel}
				})
			},
			toHistory() {
				console.log(1111)
				uni.navigateTo({
					url: `/pages/task/components/approve/history`,
					// ${item.specificationModel}
				})
			},

			dialogToggle(item) {
				this.currentTask = item
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				taskHttp.auditRemove(this.currentTask).then((res) => {
					console.log(res);
					if (res.data.code == 200) {
						uni.showToast({
							'title': '删除成功',
							'icon': 'success'
						})
						this.search()
					} else {
						uni.showToast({
							'title': '删除失败',
							'icon': 'error'
						})
					}
				});
			},
			dialogClose() {
				console.log('点击关闭')
			},
		}
	}
</script>

<style>
	@import '../../../../static/css/index.css';

	.yearMonthSelect {
		position: relative;
	}

	.yearMonthSelect .arrow {
		position: absolute;
		font-weight: bold;
		color: #ff575c;
		font-size: 16px;
		z-index: -1;
	}

	.yearMonthSelect .left {
		left: 0
	}

	.yearMonthSelect .right {
		right: 0
	}

	.inspectionList .inspectionItemItem {
		display: flex;
		flex-direction: row;

	}

	.inspectionList .inspectionItemItem .inspectionItemLeft {
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.inspectionItemLeft .inspectionText {
		font-size: 14px;
		color: #666;
		height: 20px;
		line-height: 20px;
		text-align: center;
	}

	.inspectionItemLeft .inspectionPeople {
		font-size: 16px;
		color: #333;
	}

	.inspectionList .inspectionItemItem .inspectionItemRight {
		width: 75%;
		border-radius: 10px;
		box-sizing: border-box;
		padding: 10px 20px;
	}

	.inspectionItemRight.color1 {
		background: #ff575c;
	}

	.inspectionItemRight.color2 {
		background: #4b8cff;
	}

	.inspectionItemRight.color3 {
		background: #545df0;
	}

	.inspectionItemRight.color4 {
		background: #3ac952;
	}

	.inspectionItemRight.color5 {
		background: #fbb03b;
	}

	.inspectionItemRight.color6 {
		background: #00d2ba;
	}

	.content .color0 {
		color: #fbb03b !important;
	}

	.content .color10 {
		color: #545df0 !important;
	}

	.content .color90 {
		color: #3ac952 !important;
	}

	.content .color99 {
		color: red !important;
	}

	.content .color100 {
		color: #ccc !important;
	}


	.inspectionItemRight .inspectionPlanName {
		font-size: 20px;
		color: #fff;
		font-weight: bold;
		height: 30px;
		line-height: 30px;
	}

	.inspectionItemRight .inspectionInterval {
		font-size: 14px;
		color: #fff;
		font-weight: bold;
		height: 30px;
		line-height: 30px;
	}

	.inspectionItemItem .cardItem {
		margin: 5px 0 !important;
		padding: 10px !important;
		box-sizing: border-box;
	}

	.eqDetail {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 12px;
		color: #ff575c;
		padding: 4px 0;
	}

	.detail {
		flex: 1;
	}

	.eqDetail .detailIcon {
		width: 30px;
		margin-right: 10px;
	}

	.eqDetail .content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.name {
			font-size: 14px;
			font-weight: 600;
		}
	}

	.eqDetail .btn {
		width: 54px;
		height: 24px;
		font-size: 12px;
		line-height: 24px;
		border-radius: 12px;
		background: #3ac952;
		text-align: center;
		color: #fff;
		margin-top: 5px;
	}

	.historyList {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 9px;
		margin-right: 10px;
	}
</style>