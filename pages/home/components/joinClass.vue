<template>
	<view>

		<view class="reportDetail">
			<view class="header" @click="goBack">
				<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
				<view class="" style="color: #333;">
					交接班
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height: swiperWidth + 'px'}">
			<view style="width: 100%;height: 1px;"></view>
			<view class="timeSection" style="padding:5px;z-index: 1002; justify-content: flex-start;"
				v-if="depId == '1'">
				<view class="year yearDataSelect" style="width: 25%;margin: 10px 0 0 10px;">
					<uni-data-select class="yearDataSelect" v-model="currentFactory" :localdata="range"
						@change="changeFactory" title='title'></uni-data-select>
				</view>
				<view class="" style="width: 33%;margin: 10px 0 0 10px;">
					<uni-datetime-picker class="yearDataSelect" type="date" :clear-icon="false" v-model="single"
						@maskClick="maskClick" />
				</view>
			</view>
			<view class="joinName">
				<view class="nameText">
					交班
				</view>
				<view class="nameText">
					接班
				</view>
			</view>
			<view class="timeSection" style="padding: 0 18px 10px;">
				<scroll-view scroll-y="true" :show-scrollbar='false' :style="{height: height + 45 + 'px'}">
					<view class="joinList" v-if="inspectionTaskList.length > 0">
						<view class="joinItem" v-for="item in inspectionTaskList" :key="item.id">
							<uni-card class="cardItem handIn" @click="eqDetail(item.id)">
								<view class="contant">
									<view class="msg contantItem">
										<view class="text classMsg">
											[{{item.fromClassName || '--'}}]交班
										</view>
										<view class="text class">
											{{item.fromUserName}}
										</view>
									</view>
									<view class="icon contantItem">
										<image v-show="item.status == '0'" style="width: 28px;height: 28px;"
											src="../../../static/images/jiaoban.png">
										</image>
									</view>
								</view>
							</uni-card>
							<uni-card class="cardItem pickUp" @click="eqDetail(item.id)">
								<view class="contant">
									<view class="msg contantItem">
										<view class="text classMsg">
											[{{item.toClassName || '--'}}]接班
										</view>
										<view class="text class">
											{{item.toUserName}}
										</view>
									</view>
									<view class="icon contantItem">

										<image v-show="item.status == '90'" style="width: 28px;height: 28px;" src="../../../static/images/done.png">
										</image>
									</view>
								</view>
							</uni-card>
						</view>
					</view>
					<view class="inspectionEmpty" v-else>
						<view style="display: block;text-align: center;padding-top: 40px;">
							<image style="width: 100px;height: 66px;" src="../../../static/images/noData.png">
							</image>
							<view style="color: #666;">今日无交接</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</scroll-view>
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
				depId: uni.getStorageSync('depId'),
				single: moment(new Date()).format('YYYY-MM-DD'),
			}
		},
		onLoad() {
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			console.log(this.pageHeight)
		},
		mounted() {
			this.swiperWidth = this.pageHeight - 80
			this.currentFactory = this.depId
			this.search()
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
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			changeFactory(e) {
				this.search()
			},
			search() {
				let params = {
					depId: this.currentFactory,
					// depId: '1',
					startTime: this.single,
					endTime: this.single,
					pageNo: 1,
					pageSize: 1000,
				};
				taskHttp.handoverRecordRecordList(params).then((res) => {
					if (res.data.code == 200) {
						console.log(res.data.data.records)
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
			},

			maskClick(e) {
				console.log('maskClick事件:', e);
				this.search()
			},
			eqDetail() {}

		}
	}
</script>

<style lang="scss" scoped>
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

	.joinList {
		.joinItem {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.cardItem {
				flex: 1;
				margin: 10px 10px !important;

				.contant {
					padding: 5px;
					display: flex;
					flex-direction: row;
					align-items: center;

					.contantItem {}

					.msg {
						width: 70%;
					}

					.icon {
						flex: 1;
					}
				}

				.text {
					line-height: 2;
				}

				.classMsg {
					color: #ff575c;
					flex: 1;
				}
			}
		}

	}

	.joinName {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 18px;

		.nameText {
			flex: 1;
			font-size: 16px;
			text-align: center;
		}
	}
</style>