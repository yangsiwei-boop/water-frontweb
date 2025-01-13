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
					<view class="inspectionList" v-if="inspectionTaskList.length > 0">
						<view class="inspectionItemItem" v-for="(item, index) in inspectionTaskList" :key="item.id"
							v-show="item.isShow">
							<uni-card class="cardItem">
								<view class="eqDetail">
									<view class="detailIcon">
										<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
											src="../../../../static/images/device_normal.png"></image>
									</view>
									<view class="detail">

										<view class="content">
											<view class="name" style="width: 75%;">
												{{item.facilityName}}{{item.specificationModel}}
											</view>
											<view :class="upkeepLevelClass(item.status)" style="text-align: right;">
												<!-- {{upkeepLevelName(item.status)}} -->
											</view>
										</view>
										<view class="content">
											<view class="">
												{{item.facilityNumber}}
											</view>
											<view class="">
												{{item.facilityLocations}}
											</view>
										</view>
									</view>
								</view>
								<view class="eqDetail">
									<view class="detailIcon">
										<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
											src="../../../../static/images/addtime.png"></image>
									</view>
									<view class="detail">
										{{item.reportDate }}
									</view>

									<image v-show="item.status == '10' || item.status == '0'"
										style="width: 28px; height: 28px;" :mode="'aspectFit'"
										src="../../../../static/images/check.png" @click.stop="repairItemReport(item)">
									</image>
									<!-- <view class="btn" v-show="item.status == '10'" @click="repairItemReport(item)">
										填报
									</view> -->
									<!-- <view class="btn" style="background: #ff575c;"
										v-show="item.acceptanceStatus == '90'" @click="repairItemAccept(item)">
										验收
									</view> -->
								</view>
							</uni-card>
						</view>
					</view>
					<view class="inspectionEmpty" v-else>
						<view style="display: block;text-align: center;padding-top: 40px;">
							<image style="width: 100px;height: 66px;" src="../../../../static/images/noData.png">
							</image>
							<view style="color: #666;">无维修任务</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</scroll-view>
	</view>
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
				roleIds: uni.getStorageSync('roleIds'),
				roleNames: uni.getStorageSync('roleNames'),
				isAdmin: false,
				isEquipmentManager: false,
			}
		},
		onLoad() {

		},
		mounted() {
			this.isAdmin = this.roleNames.includes('sysadmin') || this.roleNames.includes('admin')
			this.isEquipmentManager = this.roleNames.includes('设备负责人')
			console.log(this.depId + '', 'this.depId')
			this.currentFactory = this.depId + ''
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
					status: "",
					// depId: '1',
					// startTime: this.currentDate,
					// endTime: this.currentDate,
					pageNo: 1,
					pageSize: 1000,
				};
				taskHttp.equipRepairQueryRepair(params).then((res) => {
					if (res.data.code == 200) {
						res.data.data.records.forEach(item => {
							console.log(item.status,this.isAdmin || this.isEquipmentManager, item.status == '10')
							item.isShow = false
							if ((this.isAdmin || this.isEquipmentManager) && item.status == '0') {
								item.isShow = true
							}
							if (item.status == '10') {
								item.isShow = true
							}
						})
						console.log(res.data.data.records)
						this.inspectionTaskList = res.data.data.records
					}
				});
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
			repairItemReport(item) {
				if (item.status == '10') {
					uni.navigateTo({
						url: `/pages/task/components/repair/report?id=${item.id}&name=${item.facilityName}&facilityNumber=${item.facilityNumber}&equipId=${item.equipId}`,
						// ${item.specificationModel}
					})
				} else if (item.status == '0') {
					uni.navigateTo({
						url: `/pages/task/components/repair/distribution?depId=${item.depId}&id=${item.id}&name=${item.facilityName}&facilityNumber=${item.facilityNumber}&equipId=${item.equipId}&failureImageIds=${item.failureImageIds}&failureDesc=${item.failureDesc}`,
						// ${item.specificationModel}
					})
				}
			},
			viewDetail(item) {
				let query = ''
				if (item.items) {

					query = Object.keys(item.items)
						.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(item.items[key])}`)
						.join('&');
				}
				uni.navigateTo({
					url: `/pages/task/components/repair/accept?type=detail&acceptanceStatus=${item.acceptanceStatus}&id=${item.id}&name=${item.facilityName+item.specificationModel}&equipId=${item.equipId}&upkeepTime=${item.reportDate}&planUpkeepUserName=${item.repairUser}&imageIds=${item.imageIds}&${query}`,
					// ${item.specificationModel}
				})
			},
			repairItemAccept(item) {
				let query = ''
				if (item.items) {

					query = Object.keys(item.items)
						.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(item.items[key])}`)
						.join('&');
				}
				uni.navigateTo({
					url: `/pages/task/components/repair/accept?type=accept&id=${item.id}&name=${item.facilityName+item.specificationModel}&facilityNumber=${item.facilityNumber}&equipId=${item.equipId}&upkeepTime=${item.reportDate}&planUpkeepUserName=${item.repairUser}&imageIds=${item.imageIds}&${query}`,
					// ${item.specificationModel}
				})
			},
			toHistory() {
				console.log(1111)
				uni.navigateTo({
					url: `/pages/task/components/repair/history`,
					// ${item.specificationModel}
				})
			}
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
		line-height: 1.5;
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