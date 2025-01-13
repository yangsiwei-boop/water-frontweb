<template>
	<view class="">
		<uni-section title="">
			<view class="reportDetail">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						我的排班
					</view>
				</view>
			</view>
		</uni-section>
		<view class="content">
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
				@monthSwitch="monthSwitch" />
		</view>
		<view class="cutLine"></view>
		<view class="currentSchedule">
			<view class="currentScheduleBtn">
				当日排班
			</view>
			<view class="itemBtn" v-for="item in currentScheduleList"
				:style="{background: getWorkClassBgColor(item.id)}">
				{{item.name}} {{getWorkClassTime(item.id)}}
			</view>
			<view class="empty itemBtn" v-if="currentScheduleList.length == 0">
				无
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import myHttp from "../../../api/my.js";

	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	export default {
		data() {
			return {
				pageHeight: 0,
				swiperWidth: 0,
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				currentScheduleList: [],
				classesShowList: [],
				depId: uni.getStorageSync('depId'),
				startTime: moment().startOf('month').format('YYYY-MM-DD'),
				endTime: moment().endOf('month').format('YYYY-MM-DD'),
			}
		},
		onLoad(options) {},
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true
			})
			this.info.date = getDate(new Date(), -30).fullDate
			this.info.startDate = getDate(new Date(), -60).fullDate
			this.info.endDate = getDate(new Date(), 30).fullDate
			// TODO 模拟请求异步同步数据
			this.initData()
		},
		mounted() {

			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 128
			this.getWorkClassQueryWorkClassShow()
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
			open() {
				this.$refs.calendar.open()
			},
			close() {
				console.log('弹窗关闭');
			},
			change(e) {
				console.log('change 返回:', e.extraInfo)
				this.currentScheduleList = []
				let planClassIdsList = e.extraInfo.data.planClassIds.split(',')
				let planClassNamesList = e.extraInfo.data.planClassNames.split(',')
				planClassIdsList.forEach((item, index) => {
					this.currentScheduleList.push({
						name: planClassNamesList[index],
						id: planClassIdsList[index]
					})
				})
			},
			initData(){
				let params = {
					endTime: this.endTime,
					pageNo: 1,
					pageSize: 10,
					startTime: this.startTime,
					userRealName: uni.getStorageSync('realName'),
				}
				myHttp.workPlanQueryUserWorkPlanPage(params).then((res) => {
					if (res.data.code == 200) {
						let selectedList = []
						console.log(getDate(new Date(), -3).fullDate, '1111')
						if (res.data.data.records && res.data.data.records.length >
							0) {
							res.data.data.records[0].workPlanPOList.forEach(item => {
								if (item.planClassNames) {
									selectedList.push({
										date: moment(item.planTime).format('YYYY-MM-DD'),
										// info: '1\n2',
										info: item.planClassNames,
										data: item
									})
								}
								if (item.planTime == moment().format('YYYY-MM-DD')) {
									let planClassNamesList = item.planClassNames.split(',')
									let planClassIdsList = item.planClassIds.split(',')
									let arr = []
									planClassNamesList.forEach((m, n) => {
										arr.push({
											name: planClassNamesList[n],
											id: planClassIdsList[n]
										})
									})
									this.currentScheduleList = arr
								}
							})
							this.info.selected = selectedList
						}
				
					}
				})
			},
			confirm(e) {
				console.log('confirm 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
				this.startTime = moment(e.year + '-' + e.month).startOf('month').format('YYYY-MM-DD')
				this.endTime = moment(e.year + '-' + e.month).endOf('month').format('YYYY-MM-DD')
			this.initData()
			},

			// 查询班次信息
			getWorkClassQueryWorkClassShow() {
				let params = {
					depId: '',
					isDelete: "0",
					pageNo: 1,
					pageSize: 1000,
				};
				myHttp.workClassQueryWorkClass(params).then(res => {
					if (res.data.code == 200) {
						res.data.data.records.forEach((item) => {
							item.label = item.className;
							item.shortLabel = item.classShortName + "";
							item.value = item.id;
							item.statusTrigger = false;
						});
						this.classesShowList = res.data.data.records;
					}
				})
			},
			getWorkClassBgColor(classes) {
				let bgColor = ''
				this.classesShowList.forEach(item => {
					console.log(classes, item.id)
					if (classes == item.id) {
						bgColor = item.color
					}
				})
				return bgColor
			},
			getWorkClassTime(classes) {
				let time = ''
				this.classesShowList.forEach(item => {
					console.log(classes, item.id)
					if (classes == item.id) {
						time = item.classStartTime + '至' + item.classEndTime
					}
				})
				return time
			},
		}
	}
</script>

<style lang="less" scoped>
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

	.content {
		padding: 10px 10px 0;
		font-size: 16px;
		line-height: 2;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}

	.cutLine {
		width: 100%;
		height: 10px;
		background-color: #ffeeee;
		margin-top: 10px;
	}

	.currentSchedule {
		padding: 10px;
	}

	.currentScheduleBtn {
		width: 82px;
		height: 36px;
		background: #ffeeee;
		border-radius: 8px;
		color: #ff575c;
		font-size: 14px;
		text-align: center;
		line-height: 36px;
		margin-bottom: 20px;
	}

	.itemBtn {
		margin: 0 auto;
		width: 248px;
		height: 36px;
		background: #ffeeee;
		border-radius: 8px;
		color: #fff;
		font-size: 14px;
		text-align: center;
		line-height: 36px;
		margin-bottom: 10px;
	}

	/deep/ .uni-calendar-item__weeks-lunar-text span {
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 50px;
		text-align: center;
	}


	/deep/ .uni-calendar-item--extra {
		color: #333 !important
	}
	
	.empty {
		text-align: center;
		color: #fff;
		background-color: #ff575c;
		margin-top: 20px;
	}
	
	// /deep/ .uni-calendar-item--extra {
	// 	color: #333 !important
	// }
	// /deep/ .uni-calendar-item--isDay {
	// 	background-color: #fff !important
	// }
	// /deep/ .uni-calendar-item--isDay span{
	// 	color: red !important
	// }
</style>