<template>
	<view class="content">
		<view class="" style="position: fixed;z-index: 9999; width: 100%;background: #fff;">
			<uni-section title="" style="border-bottom: 1px solid #ffeeee;">
				<view class="header reportDetail" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						验收记录
					</view>
				</view>
			</uni-section>
		</view>

		<view class="timeSection" style="padding: 86px 20px 10px;z-index: 1;">
			<scroll-view scroll-y="true" :show-scrollbar='false'>
				<view class="inspectionList" v-if="dataList.length > 0">
					<view class="inspectionItemItem" v-for="(item, index) in dataList" :key="item.id">
						<uni-card class="cardItem" @click="viewDetail(item)">
							<view class="eqDetail">
								<view class="detailIcon">
									<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
										src="../../../../static/images/device_normal.png"></image>
								</view>
								<view class="detail">

									<view class="content">
										<view class="name"
											style="width: 280px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
											{{item.facilityName}} {{item.specificationModel}}
										</view>
									</view>
									<view class="content">
										<view class="">
											{{item.taskType}}
										</view>
										<view class="" style="color: #666;">
											{{item.submitUserName}}
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
									{{item.submitTime }}
								</view>

								<view class="btn" style="background: #ff575c;">
									详情
								</view>
							</view>
						</uni-card>
					</view>
				</view>

				<view class="inspectionEmpty" v-else>
					<view style="display: block;text-align: center;padding-top: 40px;">
						<image style="width: 100px;height: 66px;" src="../../../../static/images/noData.png">
						</image>
						<view style="color: #666;">今日无巡检任务</view>
					</view>
				</view>
			</scroll-view>
		</view>
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
				userId: uni.getStorageSync('userId'),
				dataList: [],
				current: 1,
				pagas: 0,
				isPullDownRefresh: false,
			}
		},
		onLoad() {
			this.currentFactory = this.depId
			this.getDataList();
		},
		onPullDownRefresh() {
			this.isPullDownRefresh = true;
			this.dataList = [];
			this.current = 1;
			this.getDataList()
		},
		onReachBottom() {
			if (this.current > this.pages) {
				uni.showToast({
					'title': '当前已是最后一页',
					'icon': 'none'
				})
				return
			}
			this.getDataList();
		},
		mounted() {
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
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			changeFactory(e) {

			},
			initDate() {
				// this.search()
			},
			getDataList() {
				const self = this;
				let params = {
					depId: self.currentFactory,
					acceptanceStatus: '100',
					pageNo: self.current,
					pageSize: 10,
				}
				
				taskHttp.appQueryTask(params).then((res) => {
					if (res.data.code == 200) {
						self.pages = res.data.data.pages;
						if (self.isPullDownRefresh) {
							self.isPullDownRefresh = false;
							uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
						}
						let list = res.data.data.records;
						self.dataList = self.dataList.concat(list);
						self.current++;
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
					url: `/pages/task/components/approve/accept?type=detail&${query}`,
					// ${item.specificationModel}
				})
			},

			viewDetail(item) {
				item.items = JSON.parse(item.operateResult)
				console.log(item.items,'operateResult')
				let query = ''
				if (item.items) {

					query = Object.keys(item.items)
						.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(item.items[key])}`)
						.join('&');
				}

				if (item.taskType == '设备维修') {
					uni.navigateTo({
						url: `/pages/task/components/repair/accept?type=detail&acceptanceStatus=${item.acceptanceStatus}&id=${item.id}&name=${item.facilityName+item.specificationModel}&equipId=${item.equipId}&upkeepTime=${item.submitTime}&planUpkeepUserName=${item.operateUserName}&imageIds=${item.imageIds}&${query}`,
						// ${item.specificationModel}
					})
				} else if (item.taskType == '设备保养') {
					uni.navigateTo({
						url: `/pages/task/components/upKeep/accept?type=detail&acceptanceStatus=${item.acceptanceStatus}&id=${item.id}&name=${item.facilityName+item.specificationModel}&equipId=${item.equipId}&upkeepTime=${item.submitTime}&planUpkeepUserName=${item.operateUserName}&imageIds=${item.imageIds}&${query}`,
						// ${item.specificationModel}
					})
				}
			},
		}
	}
</script>

<style>
	@import '../../../../static/css/index.css';


	.reportDetail {
		display: flex;
		flex-direction: column;
	}

	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #ff575c;
		font-size: 18px;
		padding: 20px 0px 5px 10px
	}

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
		z-index: 999;
	}
</style>