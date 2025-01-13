<template>
	<view style="height: 100%;">
		<scroll-view scroll-y="true" style="height: 100%;">
			<view style="width: 100%;height: 1px;"></view>
			<view class="timeSection" style="padding:5px;z-index: 1002;" v-if="depId == '1'">
				<view class="year yearDataSelect" style="width: 25%;margin: 10px 0 0 10px;">
					<!-- <picker style="width: 100%;text-align: center" @change="bindPickerChange"
						:value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker> -->
					<uni-data-select class="yearDataSelect" v-model="currentFactory" :localdata="range"
						@change="changeFactory" title='title'></uni-data-select>
				</view>
			</view>

			<view class="timeSection">
				<view class="year yearDataSelect yearMonthSelect" style="width: 100%;background: none;height: 36px">
					<picker style="width:100%;text-align: center;font-size: 16px;line-height: 1.5;color: #ff575c;"
						mode="date" :value="date" :fields="'month'" @change="bindDateChange" title='title'>
						<view class="uni-input">{{date}}</view>
					</picker>
					<view class="arrow left">
						<uni-icons type="left" size="20" :style="{color: '#ff575c'}"></uni-icons>
					</view>
					<view class="arrow right">
						<uni-icons type="right" size="20" :style="{color: '#ff575c'}"></uni-icons>
					</view>
				</view>

			</view>
			<view class="timeSection" style="padding: 0 18px 10px;">
				<scroll-view class="scroll-view_H" scroll-x="true" :scroll-left="scrollTop" :show-scrollbar='false'>
					<view id="demo1" class="scroll-view-item_H uni-bg-red" v-for="item in dateList"
						:class="item.workDate == currentDate ? 'active':''" @click="clickDate(item)">
						<view class="currentMonthweekday">
							{{transforWeekday(item.cnweekday)}}
						</view>
						<view class="currentMonthDate">
							{{transfordate(item.workDate)}}
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="timeSection" style="padding: 10px 18px 10px;">
				<scroll-view scroll-y="true" :show-scrollbar='false' :style="{height: height + 'px'}">
					<view class="inspectionList" v-if="inspectionTaskList.length > 0">
						<view class="inspectionItemItem" v-for="(item, index) in inspectionTaskList" :key="item.id">
							<uni-card class="cardItem" @click="viewDetail(item)">
								<view class="eqDetail">
									<view class="detailIcon">
										<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
											src="../../../../static/images/device_normal.png"></image>
									</view>
									<view class="detail">

										<view class="content">
											<view class="name" style="width: 75%;">
												{{item.equipName}}{{item.specificationModel}}
											</view>
											<view :class="upkeepLevelClass(item.status)" style="text-align: right;">
												{{upkeepLevelName(item.status)}}
											</view>
										</view>
										<view class="content">
											<view class="">
												{{item.facilityNumber}}
											</view>
											<view class="">
												{{item.equipLocations}}
											</view>
										</view>
									</view>
								</view>
								<view class="eqDetail">
									<view class="detailIcon">
										<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
											src="../../../../static/images/Maintenance_level.png"></image>
									</view>
									<view class="detail">
										{{item.upkeepLevel == "1"
										? "一级保养"
										: item.upkeepLevel == "2"
										? "二级保养"
										: "三级保养" }}
									</view>

									<image v-show="item.status == '10'" style="width: 28px; height: 28px;"
										:mode="'aspectFit'" src="../../../../static/images/check.png"
										@click.stop="upKeepItemReport(item)"></image>
									<!-- <view class="btn" v-show="item.status == '10'"
										@click="upKeepItemReport(item)">
										填报
									</view>
									<view class="btn" style="background: #ff575c;" v-show="item.acceptanceStatus == '90'"
										@click="upKeepItemAccept(item)">
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
							<view style="color: #666;">今日无保养任务</view>
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
				date: null, // 当前显示的年月
				dateList: [], // 当前显示的年月
				currentFirstDay: null, // 当前显示年月开始日期
				currentLastDay: null, // 当前显示年月结束日期
				currentDate: null, // 当前显示的日期
				currentDateIndex: 0,
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
				depId: uni.getStorageSync('depId')
			}
		},
		onLoad() {

		},
		mounted() {
			this.currentFactory = this.depId
			this.initDate()
			let that = this
			uni.$on('update', function(data) {
				console.log(data)
				that.search()
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
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				this.currentDateIndex = day
				var firstDay = new Date(year, month - 1, 2);
				this.currentFirstDay = firstDay.toISOString().split('T')[0];
				var lastDay = new Date(year, month, 1);
				this.currentLastDay = lastDay.toISOString().split('T')[0];
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				this.date = `${year}年${month}月`;
				this.currentDate = `${year}-${month}-${day}`
				console.log(month, this.currentDate, this.currentLastDay)
				this.getWorkCalendarByTime()
				this.search()
			},
			bindDateChange: function(e) {
				const date = new Date(e.detail.value);
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				var firstDay = new Date(year, month - 1, 2);
				this.currentFirstDay = firstDay.toISOString().split('T')[0];
				var lastDay = new Date(year, month, 1);
				this.currentLastDay = lastDay.toISOString().split('T')[0];
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				this.date = `${year}年${month}月`;
				console.log(month, this.currentDate, this.currentLastDay)
				this.getWorkCalendarByTime()
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}年${month}月`;
			},
			// 全年完成情况
			getWorkCalendarByTime() {
				let params = {
					startTime: this.currentFirstDay,
					endTime: this.currentLastDay,
				};
				taskHttp.workcalendarGetWorkCalendarByTime(params).then((res) => {
					if (res.data.code == 200) {
						this.dateList = res.data.data
						this.$nextTick(() => {
							this.scrollTop = (this.currentDateIndex - 1) * (46 + 8) + 4
							console.log(this.scrollTop, '11111')
						})
					}
				});
			},
			transforWeekday(weekday) {
				return weekday.replace('星期', '周')
			},
			transfordate(date) {
				return date.slice(5, 7) + '.' + date.slice(8, 10)
			},
			clickDate(item) {
				if (this.currentDate == item.workDate) {
					return
				} else {
					this.currentDate = item.workDate
					this.search()
				}
			},
			search() {
				let params = {
					depId: this.currentFactory,
					// depId: '1',
					startTime: this.currentDate,
					endTime: this.currentDate,
					pageNo: 1,
					pageSize: 1000,
				};
				taskHttp.upkeepTaskQueryTask(params).then((res) => {
					if (res.data.code == 200) {
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
			upKeepItemReport(item) {
				uni.navigateTo({
					url: `/pages/task/components/upKeep/report?id=${item.id}&name=${item.equipName}&equipId=${item.equipId}`,
					// ${item.specificationModel}
				})
			},
			viewDetail(item) {
				if (item.acceptanceStatus == '100') {
					let query = ''
					if (item.items) {

						query = Object.keys(item.items)
							.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(item.items[key])}`)
							.join('&');
					}
					uni.navigateTo({
						url: `/pages/task/components/upKeep/accept?acceptanceStatus=${item.acceptanceStatus}&id=${item.id}&name=${item.equipName}&equipId=${item.equipId}&upkeepTime=${item.upkeepTime}&planUpkeepUserName=${item.planUpkeepUserName}&imageIds=${item.imageIds}&${query}`,
						// ${item.specificationModel}
					})
				}
			},
			upKeepItemAccept(item) {
				let query = ''
				if (item.items) {

					query = Object.keys(item.items)
						.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(item.items[key])}`)
						.join('&');
				}
				uni.navigateTo({
					url: `/pages/task/components/upKeep/accept?id=${item.id}&name=${item.equipName}&equipId=${item.equipId}&upkeepTime=${item.upkeepTime}&planUpkeepUserName=${item.planUpkeepUserName}&imageIds=${item.imageIds}&${query}`,
					// ${item.specificationModel}
				})
			}
		}
	}
</script>

<style>
	@import '../../../../static/css/index.css';

	.scroll-Y {
		height: 300rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		display: flex;
		align-items: center;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		text-align: center;
		width: 46px;
		box-sizing: border-box;
		padding: 3px 5px;
		font-size: 20rpx;
		border-radius: 5px;
		background: rgba(0, 0, 0, .15);
		color: #fff;
		margin: 0 4px;
	}

	.scroll-view-item_H.active {
		color: #fff;
		background: #ff575c;
	}

	.scroll-view-item_H .currentMonthDate {
		font-size: 26rpx;
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
</style>