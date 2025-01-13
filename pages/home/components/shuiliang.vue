<template>
	<view class="content">

		<uni-section title="" style="height: 100%;">

			<view class="reportDetail">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						水质数据
					</view>
				</view>
			</view>

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

			<scroll-view scroll-y="true" :style="{height : swiperWidth2 + 'px'}">
				<view class="tableList">
					<uni-table style="width: 100%;min-width: 0;" ref="table" :loading="loading" border
						emptyText="暂无更多数据">
						<uni-tr>
							<uni-th width="110" style="width: 32px!important;border-right: none!important;" align="center">日期</uni-th>
							<uni-th width="30" style="border-left: none!important;" align="center"></uni-th>
							<uni-th align="center">{{beforeYesterday}}</uni-th>
							<uni-th align="center">{{yesterday}}</uni-th>
							<uni-th  align="center">今日</uni-th>
						</uni-tr>
						<uni-tr>
							<uni-td colspan="2" style="border-right: none!important;">
								<view class="">处理水量</view>
								<view class="">(m³)</view>
							</uni-td>
							<uni-td colspan="2"></uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.treatedWaterQuantity || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.treatedWaterQuantity || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.treatedWaterQuantity || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr v-show="currentFactory == '1'">
							<uni-td colspan="2" style="border-right: none!important;">
								<view class="">外溢雨污</view>
								<view class="">水量(m³)</view>
							</uni-td>
							<uni-td colspan="2"></uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.overflowsSewage || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.overflowsSewage || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.overflowsSewage || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td colspan="2" style="border-right: none!important;">水温(°C)</uni-td>
							<uni-td colspan="2"></uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.waterTemperature || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.waterTemperature || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.waterTemperature || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">PH</uni-td>
							<uni-td>
								<view class="name">进水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.phIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.phIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.phIn || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">出水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.phOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.phOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.phOut || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">SS(mg/L)</uni-td>
							<uni-td>
								<view class="name">进水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.ssIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.ssIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.ssIn || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">出水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.ssOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.ssOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.ssOut || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">COD</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name">进水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.codIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.codIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.codIn || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">出水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.codOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.codOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.codOut || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">BOD5</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name">进水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.bodIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.bodIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.bodIn || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">出水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.bodOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.bodOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.bodOut || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">TN</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name">进水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.tnIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.tnIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.tnIn || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">出水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.tnOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.tnOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.tnOut || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">NH3-N</view>
								<view class="">(mg/L)</view>
								</uni-td>
							<uni-td>
								<view class="name">进水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.nhNIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.nhNIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.nhNIn || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">出水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.nhNOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.nhNOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.nhNOut || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">TP</view>
								<view class="">(mg/L)</view>
								</uni-td>
							<uni-td>
								<view class="name">进水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.tpIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.tpIn || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.tpIn || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">出水</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.tpOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.tpOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.tpOut || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td colspan="2" style="border-right: none!important;">粪大肠菌群(个/L)</uni-td>
							<uni-td colspan="2"></uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.cufOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.cufOut || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.cufOut || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td colspan="2" style="border-right: none!important;">色度</uni-td>
							<uni-td colspan="2"></uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.chroma || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.chroma || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.chroma || '-'}}</view>
							</uni-td>
						</uni-tr>

					</uni-table>
				</view>
			</scroll-view>
		</uni-section>
	</view>
</template>

<script>
	import moment from 'moment'

	import dataHttp from '../../../api/data.js'
	export default {
		components: {
			// inspectionVue,
			// upKeepVue,
			// repairVue,
			// approveVue,
			// acceptVue,
		},
		data() {
			return {
				value: 1,
				array: ['星沙厂', '城西厂', '城北厂', '城南厂', '城东厂'],
				index: 0,
				currentIndex: 0,
				pageHeight: 0,
				swiperWidth: 0,
				swiperWidth2: 0,
				depId: uni.getStorageSync('depId'),
				title: '',
				currentDateIndex: 0,
				currentFactory: uni.getStorageSync('depId') == '1' ? '2' : uni.getStorageSync('depId'),
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
				today: moment().format('MM-DD'),
				yesterday: moment().add(-1, 'day').format('MM-DD'),
				beforeYesterday: moment().add(-2, 'day').format('MM-DD'),
				loading: false,
				todayData: {},
				yesterdayData: {},
				beforeYesterdayData: {},
			}
		},
		onBackPress() {
			console.log('2222222')
			this.initDate()
		},
		onLoad(options) {
			console.log(options.type)
			if (options.type == 'xunjian') {
				this.currentIndex = 0
				this.title = '巡检'
			} else if (options.type == 'baoyang') {
				this.currentIndex = 1
				this.title = '保养'
			} else if (options.type == 'weixiu') {
				this.currentIndex = 2
				this.title = '维修'
			} else if (options.type == 'shenpi') {
				this.currentIndex = 3
				this.title = '数据审批'
			}
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			this.swiperWidth = this.pageHeight - 96
			if (this.depId == '1') {
				this.swiperWidth2 = this.pageHeight - 96
			} else {
				this.swiperWidth2 = this.pageHeight - 60
			}
			this.getWaterDateList()
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
			changepage(item) {
				console.log(666);
				this.currentIndex = item
				console.log("当前选中", item)
			},
			swiperTab(e) {
				this.currentIndex = e.detail.current; //获取索引
				console.log("this.currentIndex", this.currentIndex)
			},
			changeFactory(e) {
				this.getWaterDateList()
			},
			getWaterDateList() {
				this.loading = true
				this.todayData = {}
				this.yesterdayData = {}
				this.beforeYesterdayData = {}
				let params = {
					depId: this.currentFactory,
					// "depId": 4,
					startTime: moment().add(-2, 'day').format("YYYY-MM-DD 00:00:00"),
					endTime: moment().format("YYYY-MM-DD 23:59:59"),
					auditStatus: "1",
				};
				dataHttp.queryAssay(params).then((res) => {
					if (res.data.code == '200') {
						let keys = Object.keys(res.data.data);
						console.log(keys)
						keys.forEach(item => {
							if(item == this.today) {
								this.todayData = res.data.data[item]
							}
							if(item == this.yesterday) {
								this.yesterdayData = res.data.data[item]
							}
							if(item == this.beforeYesterday) {
								this.beforeYesterdayData = res.data.data[item]
							}
						})
						this.loading = false
					}
				});
			}

		}
	}
</script>

<style>
	@import '../../../static/css/index.css';

	.reportDetail {
		display: flex;
		flex-direction: column;
		padding-top: 10px;
	}

	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #ff575c;
		font-size: 18px;
		padding: 0px 0px 5px 10px
	}

	.tableList {
		width: 100%;
		box-sizing: border-box;
		padding: 10px 20px;
	}

	/deep/ .uni-table {
		min-width: 0 !important;
	}

	/deep/ .uni-table-th {
		width: 20% !important;
	}

	/deep/ .uni-table-td {
		min-width: 20px !important
	}
</style>