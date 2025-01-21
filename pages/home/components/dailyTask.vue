<template>
	<view>

		<view class="reportDetail">
			<view class="header" @click="goBack">
				<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
				<view class="" style="color: #333;">
					任务
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height: swiperWidth + 'px'}">
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

				<!-- <view class="historyList" @click="toHistory" style="padding: 12px 12px 0 0;">
					<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
						src="../../../static/images/History.png"></image>
				</view> -->
			</view>
			<view class="timeSection" style="padding: 20px 18px 10px;">
				<scroll-view scroll-y="true" :show-scrollbar='false' :style="{height: height + 45 + 'px'}">
					<view class="inspectionList" v-if="inspectionTaskList.length > 0">
						<view class="inspectionItemItem" v-for="(item, index) in inspectionTaskList" :key="item.id"
							@click="inspectionItemReport(item)">
							<view class="inspectionItemLeft">
								<view class="inspectionPeople inspectionText">
									{{item.executorName}}
								</view>
								<view class="inspectionStatus inspectionText" style="font-size: 12px;">
									日常任务
								</view>
							</view>
							<view class="inspectionItemRight" :class="rightColor(index, item)">
								<view class="inspectionPlanName"
									style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{item.taskContent}}
								</view>
								<view class="inspectionInterval">
									发布人: {{item.publishUserName}}，{{ momentFormat(item.planStartTime)}} 至
									{{momentFormat(item.planEndTime)}}
								</view>
							</view>
						</view>
					</view>
					<view class="inspectionEmpty" v-else>
						<view style="display: block;text-align: center;padding-top: 40px;">
							<image style="width: 100px;height: 66px;" src="../../../static/images/noData.png">
							</image>
							<view style="color: #666;">暂无数据</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</scroll-view>
		<view class="publish">
			<view class="btn" @click="toPublish">
				发布日常任务
			</view>
		</view>
	</view>
</template>

<script>
	import taskHttp from '../../../api/task.js'
	import moment from 'moment'
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

				pageHeight: 0,
				swiperWidth: 0,
				inspectionTaskList: [],
				depId: uni.getStorageSync('depId')
			}
		},
		onLoad() {

			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			console.log(this.pageHeight)
		},
		mounted() {
			this.swiperWidth = this.pageHeight - 80
			this.currentFactory = this.depId
			this.initDate()
			let that = this
			uni.$on('update', function(data) {
				console.log(data)
				that.search()
			})
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
			momentFormat(time) {
				return moment(time).format('MM-DD')
			},
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
					status: '10',
					pageNo: 1,
					pageSize: 1000,
				};
				taskHttp.dailyTaskQueryTask(params).then((res) => {
					if (res.data.code == 200) {
						this.inspectionTaskList = res.data.data.records
					}
				});
			},
			rightColor(index, item) {
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
					item.status == '10' ?
					"color7" :
					""
				console.log(colorClass, 'index')
				// if (item.status == '10) {
				// 	colorClass = 'color7'
				// }
				return '' + colorClass
			},
			inspectionItemReport(item) {
				uni.navigateTo({
					url: `/pages/home/components/dailyTaskReport?id=${item.id}`,
				})
			},
			toPublish() {
				uni.navigateTo({
					url: `/pages/home/components/publishDailyTask`,
				})
			}
		}
	}
</script>

<style>
	@import '../../../static/css/index.css';

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
		margin-bottom: 10px;
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

	.inspectionItemRight.color7 {
		background: #ccc;
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

	.reportDetail {
		display: flex;
		flex-direction: column;
		padding-top: 30px;
		border-bottom: 1px solid #ffeeee;
	}


	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #ff575c;
		font-size: 18px;
		padding: 0px 0px 5px 10px
	}

	.publish {
		background: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 15px 20px;
		box-sizing: border-box;
	}

	.publish .btn {
		height: 40px;
		border-radius: 20px;
		background: #ff575c;
		color: #fff;
		text-align: center;
		line-height: 40px;
	}
</style>