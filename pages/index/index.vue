<template>
	<view class="content">
		<uni-section title="">
			<uni-nav-bar class="navBar" leftWidth="0rpx" :border="false">
				<view class="navBarTitle">经开区水质净化工程</view>
				<template #right>
					<view class="navBarIconMsg" slot="right" @click="toBigScreen">
						<image src="../../static/images/PC.png"></image>
						<!-- <image src="../../static/images/msg-read.png"></image> -->
						<!-- <image src="../../static/images/msg-unread.png"></image> -->
					</view>
				</template>
			</uni-nav-bar>

		</uni-section>
		<uni-section title="">
			<view class="timeSection">
				<view class="year">
					<text class="yearLabel">年度</text>
					<uni-data-select class="yearDataSelect" v-model="currentYear" :localdata="range"
						@change="changeYear"></uni-data-select>
				</view>
				<view>水量数据更新至{{uploadTime}}</view>
			</view>
		</uni-section>
		<uni-section title="">
			<view class="tab_out">
				<view class="tabs" :class="{tabClick:currentIndex==0}" @click="changepage(0)">
					完成情况
				</view>
				<view class="tabs" :class="{tabClick:currentIndex==1}" @click="changepage(1)">
					能耗成本
				</view>
				<view class="tabs" :class="{tabClick:currentIndex==2}" @click="changepage(2)">
					财务情况
				</view>
			</view>

			<view class="uni-margin-wrap">
				<swiper class="swiper" :style="{height: swiperWidth + 'px'}" @change="swiperTab" circular
					:current='currentIndex'>
					<swiper-item>
						<scroll-view scroll-y="true" style="height: 100%;">
							<view style="width: 100%;height: 1px;"></view>
							<uni-card title="全年完成情况" :is-shadow="true" :border="false">
								<view class="chartRates">
									<view class="chartRates-item">
										<chart-rate :rateData="dataObj.scaleOfYearDays"
											:color="rateColor1"></chart-rate>
										<view class="rateValueBox">
											<view class="rateValue">
												<text>{{ dataObj.runDays }}</text>天
											</view>
											<view class="rateValue">
												运行时间
											</view>
										</view>
									</view>
									<view class="chartRates-item">
										<chart-rate :rateData="dataObj.scaleOfYear" :color="rateColor2"></chart-rate>
										<view class="rateValueBox">
											<view class="rateValue">
												<text>{{ dataObj.completeOfYear }}</text>万吨
											</view>
											<view class="rateValue">
												水量
											</view>
										</view>
									</view>
									<view class="chartRates-item">
										<chart-rate :rateData="dataObj.scaleOfCod" :color="rateColor3"></chart-rate>
										<view class="rateValueBox">
											<view class="rateValue">
												<text>{{ dataObj.actualCodOfYear }}</text>吨
											</view>
											<view class="rateValue">
												COD削减量
											</view>
										</view>
									</view>
									<view class="chartRates-item">
										<chart-rate :rateData="dataObj.scaleOfAn" :color="rateColor4"></chart-rate>
										<view class="rateValueBox">
											<view class="rateValue">
												<text>{{ dataObj.actualAnOfYear }}</text>吨
											</view>
											<view class="rateValue">
												氨氮削减量
											</view>
										</view>
									</view>
								</view>

							</uni-card>
							<view class="allYearCompletion">
								<view class="allYearCompletionitem">
									<uni-card :is-shadow="true" :border="false" style="padding-right: 0!important;">
										<view class="number">
											<text class="uni-body">{{dataObj.completeOfMonth}}</text> 万吨
										</view>
										<view class="name">
											<text class="uni-body">当月实际完成水量</text>
											<image src="../../static/images/up.png" alt=""
												v-if="dataObj.completeToLastMonth && dataObj.completeToLastMonth > 0" />
											<image src="../../static/images/down.png" class="down" alt=""
												v-if="dataObj.completeToLastMonth && dataObj.completeToLastMonth < 0" />
											<text class="rate"
												:class="dataObj.completeToLastMonth && dataObj.completeToLastMonth > 0 ? 'red' : 'green'"
												v-if="dataObj.completeToLastMonth">
												{{ dataObj.completeToLastMonth }}%</text>
										</view>
									</uni-card>
								</view>
								<view class="allYearCompletionitem">
									<uni-card :is-shadow="true" :border="false">
										<view class="number">
											<text class="uni-body">{{dataObj.scaleOfMonth}}</text>%
										</view>
										<view class="name">
											<text class="uni-body">当月完成率(水务)</text>
											<image src="../../static/images/up.png" alt=""
												v-if="dataObj.scaleToLastMonth && dataObj.scaleToLastMonth > 0" />
											<image src="../../static/images/down.png" class="down" alt=""
												v-if="dataObj.scaleToLastMonth && dataObj.scaleToLastMonth < 0" />
											<text class="rate"
												:class="dataObj.scaleToLastMonth && dataObj.scaleToLastMonth > 0 ? 'red' : 'green'"
												v-if="dataObj.scaleToLastMonth">
												{{ dataObj.scaleToLastMonth }}%</text>
										</view>
									</uni-card>
								</view>
								<view class="allYearCompletionitem">
									<uni-card :is-shadow="true" :border="false">
										<view class="number">
											<text class="uni-body">{{dataObj.dailyAvgOfMonth}}</text> 万吨
										</view>
										<view class="name">
											<text class="uni-body">当月实际日均</text>
											<image src="../../static/images/up.png" alt=""
												v-if="dataObj.dailyAvgToLastMonth && dataObj.dailyAvgToLastMonth > 0" />
											<image src="../../static/images/down.png" class="down" alt=""
												v-if="dataObj.dailyAvgToLastMonth && dataObj.dailyAvgToLastMonth < 0" />
											<text class="rate"
												:class="dataObj.dailyAvgToLastMonth && dataObj.dailyAvgToLastMonth > 0 ? 'red' : 'green'"
												v-if="dataObj.dailyAvgToLastMonth">
												{{ dataObj.dailyAvgToLastMonth }}%</text>
										</view>
									</uni-card>
								</view>
								<view class="allYearCompletionitem special">
									<uni-card :is-shadow="true" :border="false" style="padding-right: 0!important;">
										<view class="name">
											<text class="uni-body" style="font-size: 12px;">日均水量(水务)</text>
										</view>
										<view class="compare">
											<view class="target">
												<view class="">
													目标
												</view>
												<view class="number">
													<text class="uni-body">{{dataObj.targetOfDailyAvg}}</text>万吨
												</view>
											</view>
											<view class="real">
												<view class="">
													实际
												</view>
												<view class="number">
													<text class="uni-body">{{dataObj.dailyAvgOfYear}}</text>万吨
												</view>
											</view>
										</view>
									</uni-card>
								</view>
								<view class="allYearCompletionitem">
									<uni-card :is-shadow="true" :border="false">
										<view class="number">
											<text class="uni-body">{{dataObj.targetYear}}</text> 万吨
										</view>
										<view class="name">
											<text class="uni-body">全年目标水量(水务)</text>
										</view>
									</uni-card>
								</view>
								<view class="allYearCompletionitem">
									<uni-card :is-shadow="true" :border="false">
										<view class="number">
											<text class="uni-body">{{dataObj.completeOfYear}}</text> 万吨
										</view>
										<view class="name">
											<text class="uni-body">全年已完成水量(水务)</text>
										</view>
									</uni-card>
								</view>
							</view>
							<uni-card title="公司全年处理水量" extra="单位: 万吨" :is-shadow="true" :border="false">
								<chart-annual-treated-water :dataList="disposeWaterChartDataList"
									:colorList="currentColorList"
									:seriesDataList="seriesDataList"></chart-annual-treated-water>
								<view class="legendList">
									<view class="legendItem" v-for="(item, index) in legendList" :key="index">
										<view class="legendItemIcon" :style="{ background: currentColorList[index] }">
										</view><text>{{item}}</text>
									</view>
								</view>
							</uni-card>
							<uni-card title="每月水量目标完成率" extra="单位: %" :is-shadow="true" :border="false">
								<chart-line-water-goal :dataList="waterGoalChartDataList"
									:legendList="waterGoalChartType" :showStandardLine="true"></chart-line-water-goal>
							</uni-card>
							<uni-card title="各厂水量目标完成情况" extra="单位: 万吨" :is-shadow="true" :border="false">
								<chart-bar-water-status :dataList="waterStatusChartDataList"
									:colorList="waterStatusCurrentColorList"
									:seriesDataList="waterStatusLegendList"></chart-bar-water-status>
								<view class="legendList">
									<view class="legendItem" v-for="(item, index) in waterStatusLegendList"
										:key="index">
										<view class="legendItemIcon" :style="{ background: currentColorList[index] }">
										</view><text>{{item}}</text>
									</view>
								</view>
							</uni-card>
							<uni-card title="各厂日均水量对比" extra="单位: 万吨/日" :is-shadow="true" :border="false">
								<chart-line-water-goal :dataList="dailyWaterAvgChartDataList"
									:legendList="dailyWaterAvgChartType"
									:showStandardLine="false"></chart-line-water-goal>
							</uni-card>
							<view style="width: 100%;height: 1px;"></view>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view scroll-y="true" style="height: 100%;">
							<view style="width: 100%;height: 1px;"></view>
							<uni-card title="各厂能耗对比" extra="单位: kwh/吨" :is-shadow="true" :border="false">
								<chart-line-water-goal :dataList="powerChartDataList" :legendList="powerChartType"
									:showStandardLine="false"></chart-line-water-goal>
							</uni-card>
							<uni-card title="每月吨水生产成本、处理成本" extra="单位: 元/吨水" :is-shadow="true" :border="false">
								<view class="timeSection action">
									<view class="year" style="width: 80px;">
										<uni-data-select class="yearDataSelect" v-model="currentMonth"
											:localdata="monthRange" @change="changeMonth"></uni-data-select>
									</view>
									<view class="cost">
										<view class="costNumber">
											公司平均处理成本{{queryTonWaterCostAVGObj.handlingCostAVG}}
										</view>
										<view class="costNumber">
											公司平均生产成本{{queryTonWaterCostAVGObj.productCostAVG}}
										</view>
									</view>
								</view>
								<chart-water-product-cost :dataList="currentMonthWaterProductCostChartDataList"
									:chartType="waterProductCostChartType"
									:markLineList="markLineList"></chart-water-product-cost>
							</uni-card>
							<uni-card title="各厂吨水处理成本" extra="单位: 元/吨水" :is-shadow="true" :border="false">
								<chart-processing-cost :dataList="processingCostChartDataList"
									:chartType="processingCostChartType"></chart-processing-cost>
							</uni-card>
							<view style="width: 100%;height: 1px;"></view>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view scroll-y="true" style="height: 100%;">
							<view style="width: 100%;height: 1px;"></view>
							<uni-card title="财务收支情况" extra="单位: 万元" :is-shadow="true" :border="false">
								<chart-finance-status :dataList="financeStatusChartDataList"
									:chartType="financeStatusChartType"></chart-finance-status>
							</uni-card>
							<uni-card title="资产保值率" extra="单位: %" :is-shadow="true" :border="false">
								<chart-asset-retention-ratio
									:dataList="financeStatusChartDataList"></chart-asset-retention-ratio>
							</uni-card>
							<view style="width: 100%;height: 1px;"></view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import chartRate from '../../components/echarts/chartRate.vue'
	import chartAnnualTreatedWater from '../../components/echarts/chartAnnualTreatedWater.vue'
	import chartLineWaterGoal from '../../components/echarts/chartLineWaterGoal.vue'
	import chartBarWaterStatus from '../../components/echarts/chartBarWaterStatus.vue'
	import chartFinanceStatus from '../../components/echarts/chartFinanceStatus.vue'
	import chartAssetRetentionRatio from '../../components/echarts/chartAssetRetentionRatio.vue'
	import chartProcessingCost from '../../components/echarts/chartProcessingCost.vue'
	import chartWaterProductCost from '../../components/echarts/chartWaterProductCost.vue'

	import moment from 'moment'
	import homeHttp from '../../api/home.js'
	export default {
		components: {
			"chart-rate": chartRate,
			"chart-annual-treated-water": chartAnnualTreatedWater,
			"chart-line-water-goal": chartLineWaterGoal,
			"chart-finance-status": chartFinanceStatus,
			"chart-bar-water-status": chartBarWaterStatus,
			"chart-asset-retention-ratio": chartAssetRetentionRatio,
			"chart-processing-cost": chartProcessingCost,
			"chart-water-product-cost": chartWaterProductCost
		},
		data() {
			return {
				uploadTime: (moment().add(-1, "day").format("MM月DD日")),
				currentYear: moment().format('YYYY'),
				range: [{
						value: moment().format('YYYY'),
						text: moment().format('YYYY')
					},
					{
						value: moment().add(-1, 'year').format('YYYY'),
						text: moment().add(-1, 'year').format('YYYY')
					}
				],
				currentMonth: 1,
				monthRange: [],
				currentIndex: 0,
				rateColor1: ['#FF575C', '#DCDCDF'],
				rateColor2: ['#3AC952', '#DCDCDF'],
				rateColor3: ['#4B8CFF', '#DCDCDF'],
				rateColor4: ['#FBB03B', '#DCDCDF'],
				dataObj: {},
				disposeWaterChartDataList: [],
				colorList: ['#FFC40A', '#C5E635', '#4D73A7', '#FDA8E0', '#ED4B67', '#F7A019', '#A4CC35', '#0A8AA8',
					'#DA81FA', '#9A81FA', '#EE5A1F', '#09CBC4'
				],
				legendList: [],
				seriesDataList: [],
				currentColorList: [],
				halfColorList: ["#3AC952", "#FBB03B"],
				waterGoalChartDataList: [],
				waterGoalChartType: [{
						name: '公司',
						code: 'companyRate'
					},
					{
						name: '星沙厂',
						code: 'xingshaRate'
					}, {
						name: '城北厂',
						code: 'cityNorthRate'
					}, {
						name: '城南厂',
						code: 'citySouthRate'
					}, {
						name: '城西厂',
						code: 'cityWestRate'
					},
				],
				dailyWaterAvgChartDataList: [],
				dailyWaterAvgChartType: [{
						name: '公司',
						code: 'companyWaterYield'
					},
					{
						name: '星沙厂',
						code: 'xingshaWaterYield'
					}, {
						name: '城北厂',
						code: 'cityNorthWaterYield'
					}, {
						name: '城南厂',
						code: 'citySouthWaterYield'
					}, {
						name: '城西厂',
						code: 'cityWestWaterYield'
					},
				],
				waterStatusChartDataList: [],
				waterStatusCurrentColorList: [],
				waterStatusSeriesDataList: [],
				waterStatusLegendList: [],
				chartMax: 0,
				pageHeight: 0,
				swiperWidth: 0,
				powerChartDataList: [],
				powerChartType: [{
					name: '星沙厂',
					code: 'xingshaPower'
				}, {
					name: '城北厂',
					code: 'cityNorthPower'
				}, {
					name: '城南厂',
					code: 'citySouthPower'
				}, {
					name: '城西厂',
					code: 'cityWestPower'
				}],
				financeStatusChartDataList: [],
				financeStatusChartType: [{
					name: '营业收入',
					code: 'operatingIncome',
					type: 'column'
				}, {
					name: '营业成本',
					code: 'operatingCost',
					type: 'column'
				}, {
					name: '净利润',
					code: 'netProfit',
					type: 'column'
				}, {
					name: '人均创收',
					code: 'incomePeCapita',
					type: 'line'
				}],
				processingCostChartDataList: [],
				processingCostChartType: [{
					name: '处理成本',
					code: 'totalCost',
					type: 'column'
				}, {
					name: '生产成本',
					code: 'fourProductionCost',
					type: 'column'
				}, {
					name: '人工',
					code: 'laborCost',
					type: 'column'
				}, {
					name: '折旧',
					code: 'depreciationCost',
					type: 'column'
				}],
				waterProductCostChartDataList: [],
				currentMonthWaterProductCostChartDataList: [],
				waterProductCostChartType: [{
					name: '电耗',
					code: 'powerConsumption',
					type: 'column'
				}, {
					name: '污泥',
					code: 'sludge',
					type: 'column'
				}, {
					name: '设备',
					code: 'equipment',
					type: 'column'
				}, {
					name: '药耗',
					code: 'drugConsumption',
					type: 'column'
				}, {
					name: '平均生产成本',
					code: 'companyProductionCost',
					type: 'line'
				}, {
					name: '平均处理成本',
					code: 'companyHandlingCost',
					type: 'line'
				}],
				queryTonWaterCostAVGObj: {},
				markLineList: []
			}
		},
		onLoad() {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
		},

		created() {
			this.queryAchievedOfYear()
			this.queryDisposeWater()
			this.queryWaterCompleteRate()
			this.queryDailyWaterAvg()
			this.querywaterTargetCompletion()
			this.queryPower()
			this.queryFinancialData()
			this.queryTotalTonWaterCost()
			this.queryProductionCost()
			this.queryTonWaterCostAVG()
		},
		mounted() {
			this.swiperWidth = this.pageHeight - 56 - 110 - 40
			console.log(this.pageHeight, 'pageHeight')
		},
		methods: {
			toBigScreen(){
				uni.navigateTo({
					url: `/pages/index/components/bigScreen`,
					// ${item.specificationModel}
				})
			},
			changeYear(e) {
				if (this.currentYear == moment().format("YYYY")) {
					this.uploadTime = moment().add(-1, "day").format("MM月DD日");
				} else {
					this.uploadTime = moment(this.currentYear).endOf("year").format("MM月DD日");
				}
				this.queryAchievedOfYear()
				this.queryDisposeWater()
				this.queryWaterCompleteRate()
				this.queryDailyWaterAvg()
				this.querywaterTargetCompletion()
				this.queryPower()
				this.queryFinancialData()
				this.queryTotalTonWaterCost()
				this.queryProductionCost()
				this.queryTonWaterCostAVG()
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
			getMonthRange() {
				this.monthRange = []
				let currentYear = moment().format('YYYY')
				let currentMonth = moment().format('MM')
				let monthLen = currentYear == this.currentYear ? Number(currentMonth) : 12
				console.log(monthLen)
				for (let i = 0; i < monthLen; i++) {
					this.monthRange.push({
						value: i + 1,
						text: i + 1 + '月'
					})
				}
				this.currentMonth = this.monthRange[monthLen - 1].value
			},
			// 全年完成情况
			queryAchievedOfYear() {
				let params = {
					year: this.currentYear,
				};
				homeHttp.queryAchievedOfYear(params).then((res) => {
					if (res.data.data) {
						res.data.data.scaleOfYearDays = (
							res.data.data.scaleOfYearDays * 100
						).toFixed(1);
						console.log(res.data.data, "111111");
						res.data.data.scaleOfYear = (res.data.data.scaleOfYear * 100).toFixed(1);
						res.data.data.scaleOfCod = (res.data.data.scaleOfCod * 100).toFixed(1);
						res.data.data.scaleOfAn = (res.data.data.scaleOfAn * 100).toFixed(1);
						this.dataObj = res.data.data;
					}
				});
			},
			// 公司全年处理水量
			queryDisposeWater() {
				let params = {
					year: this.currentYear,
				};
				homeHttp.queryDisposeWater(params).then((res) => {
					if (res.data.code == 200) {
						let resObj = res.data.data;
						let list = [];
						let len = res.data.data.actualWaterList.length;
						let legArr = [];
						let seriesArr = [];
						let colorArr = [];
						let sjWater = {};

						list.push({
							name: "全年目标",
							上半年: Number(resObj.firstHalfYearWater) || 0,
							下半年: Number(resObj.secondHalfYearWater) || 0,
						});

						let mbWater = {};
						mbWater.name = "每月目标";
						for (let i = 0; i <= len - 1; i++) {
							mbWater[`${i + 1}月`] = Number(resObj.targetWaterList[i]);
						}
						list.push(mbWater);
						sjWater.name = "实际水量";
						for (let i = 0; i <= len - 1; i++) {
							legArr.push(i + 1 + "月");
							seriesArr.push(`${i + 1}月`);
							colorArr.push(this.colorList[i]);
							sjWater[`${i + 1}月`] = Number(resObj.actualWaterList[i]);
						}
						list.push(sjWater);
						legArr = legArr.concat(["上半年", "下半年"]);
						seriesArr = seriesArr.concat(["上半年", "下半年"]);
						this.legendList = legArr;
						this.seriesDataList = seriesArr;
						this.currentColorList = colorArr.concat(this.halfColorList);

						this.disposeWaterChartDataList = list;
						console.log(this.disposeWaterChartDataList, 'this.disposeWaterChartDataList')
					}
				});
			},
			// 每月水量目标完成情况
			queryWaterCompleteRate() {
				let params = {
					year: this.currentYear,
				};
				homeHttp.queryWaterCompleteRate(params).then((res) => {
					if (res.data.code == 200) {
						res.data.data.forEach((item) => {
							item.month = item.month + "月";
						});
						let len = res.data.data.length;
						for (let i = 0; i < 6 - len; i++) {
							res.data.data.push({
								month: len + i + 1 + "月",
							});
						}
						this.waterGoalChartDataList = res.data.data;
						console.log(this.waterGoalChartDataList, 'this.waterGoalChartDataList')
					}
				});
			},
			// 各厂日均水量对比
			queryDailyWaterAvg() {
				let params = {
					year: this.currentYear,
				};
				homeHttp.queryDailyWaterAvg(params).then((res) => {
					if (res.data.code == 200) {
						res.data.data.forEach((item) => {
							item.month = item.month + "月";
						});
						let len = res.data.data.length;
						for (let i = 0; i < 6 - len; i++) {
							res.data.data.push({
								month: len + i + 1 + "月",
							});
						}
						this.dailyWaterAvgChartDataList = res.data.data;
					}
				});
			},
			// 各厂水量目标完成情况
			querywaterTargetCompletion(year) {
				let params = {
					year: this.currentYear
				};
				homeHttp.querywaterTargetCompletion(params).then((res) => {
					if (res.data.code == 200) {
						this.waterStatusChartDataList = []
						let list = [{
								name: '星沙目标',
								list: res.data.data['星沙'],
							},
							{
								name: '星沙实际',
								list: res.data.data['星沙'],
							},
							{
								name: '城北目标',
								list: res.data.data['城北'],
							},
							{
								name: '城北实际',
								list: res.data.data['城北'],
							},
							{
								name: '城南目标',
								list: res.data.data['城南'],
							},
							{
								name: '城南实际',
								list: res.data.data['城南'],
							},
							{
								name: '城西目标',
								list: res.data.data['城西'],
							},
							{
								name: '城西实际',
								list: res.data.data['城西'],
							}
						]
						let chartList = [];
						let targetMax = 0;
						let actualMax = 0;
						console.log(list, 'linst[0]')
						list[0].list.forEach((item) => {
							console.log(item.targetWater);
							targetMax = targetMax + parseInt(item.targetWater);
							actualMax = actualMax + parseInt(item.actualWater);
						});

						let len = list[0].list.length;
						let legArr = [];
						let colorArr = [];
						let seriesArr = [];
						for (let i = 0; i <= len - 1; i++) {
							legArr.push(i + 1 + "月");
							colorArr.push(this.colorList[i]);
							// seriesArr.push(i + 1 + "月(目标值)");
						}

						console.log(list, '-------')
						this.waterStatusCurrentColorList = colorArr.concat(colorArr);
						this.waterStatusSeriesDataList = seriesArr;
						this.waterStatusLegendList = legArr;
						list.forEach((item, index) => {
							let chartObj = {};
							chartObj.name = item.name
							item.list.forEach((t, n) => {
								if (item.name.indexOf('目标') > -1) {
									chartObj[t.month + "月"] = t.targetWater;
								} else {
									chartObj[t.month + "月"] = t.actualWater;
								}
							});
							this.waterStatusChartDataList.push(chartObj);
						});
						console.log(list, '+++++++++++++++')

						this.chartMax = targetMax > actualMax ? targetMax : actualMax;
					}
				});
			},
			// 各厂能耗对比
			queryPower() {
				let params = {
					year: this.currentYear
				};
				homeHttp.queryPower(params).then((res) => {
					if (res.data.code == 200) {
						res.data.data.forEach((item) => {
							item.month = item.month + "月";
						});
						let len = res.data.data.length;
						for (let i = 0; i < 6 - len; i++) {
							res.data.data.push({
								month: len + i + 1 + "月",
							});
						}
						this.powerChartDataList = res.data.data;
					}
				});
			},
			// 财务收支情况
			queryFinancialData() {
				let params = {
					year: this.currentYear
				};
				homeHttp.queryFinancialData(params).then((res) => {
					if (res.data.code == 200) {
						res.data.data.forEach((item) => {
							item.month = item.month + "月";
						});
						let len = res.data.data.length;
						for (let i = 0; i < 6 - len; i++) {
							res.data.data.push({
								month: len + i + 1 + "月",
							});
						}
						this.financeStatusChartDataList = res.data.data;
					}
				});
			},
			// 各厂吨水处理成本
			queryTotalTonWaterCost() {
				let params = {
					year: this.currentYear
				};
				homeHttp.queryTotalTonWaterCost(params).then((res) => {
					if (res.data.code == 200) {
						res.data.data.forEach((item) => {
							if (item.depId == 1) {
								item.depName = "总公司";
							}
							if (item.depId == 2) {
								item.depName = "星沙厂";
							}
							if (item.depId == 4) {
								item.depName = "城北厂";
							}
							if (item.depId == 5) {
								item.depName = "城南厂";
							}
							if (item.depId == 3) {
								item.depName = "城西厂";
							}
						});
						this.processingCostChartDataList = res.data.data;
					}
				});
			},
			// 吨水生产成本、处理成本
			queryProductionCost() {
				let params = {
					year: this.currentYear
				};
				homeHttp.queryProductionCost(params).then((res) => {
					if (res.data.code == 200) {
						let resObj = res.data.data;
						let list = [];
						this.monthRange = []
						for (let key in resObj) {
							// console.log(key)
							list.push({
								name: key,
								list: resObj[key],
							});
							this.monthRange.push({
								value: key.replace('月', ' '),
								text: key
							})
						}
						this.monthRange.sort((a, b) => {
							return parseInt(a.value) - parseInt(b.value);
						});
						console.log(this.monthRange)
						this.currentMonth = this.monthRange[this.monthRange.length - 1].value
						list.sort((a, b) => {
							return parseInt(a.name) - parseInt(b.name);
						});
						list.forEach((item) => {
							let chartObj = {};
							chartObj.name = item.name;
							item.list.sort((a, b) => {
								return a.depId - b.depId;
							});
							item.list.forEach((t) => {
								if (t.depId == 1) {
									t.depName = "总公司";
								}
								if (t.depId == 2) {
									t.depName = "星沙厂";
								}
								if (t.depId == 4) {
									t.depName = "城北厂";
								}
								if (t.depId == 5) {
									t.depName = "城南厂";
								}
								if (t.depId == 3) {
									t.depName = "城西厂";
								}
							});
						});
						this.waterProductCostChartDataList = list;
						this.currentMonthWaterProductCostChartDataList = list[this.monthRange.length - 1].list;
						console.log("---------", this.currentMonthWaterProductCostChartDataList);
						this.queryTotalTonWaterCostChild()
					}
				});
			},
			queryTotalTonWaterCostChild() {
				let params = {
					year: this.currentYear
				};
				homeHttp.queryTonWaterCost(params).then((res) => {
					if (res.data.code == 200) {
						res.data.data.forEach((item, index) => {
							if (item.month == this.currentMonth) {
								this.markLineList = [{
										value: item.companyProductionCost,
										lineColor: "#3CA272",
										labelFontColor: "#3CA272",
										showLabel: true,
										labelFontSize: 10
									},
									{
										value: item.companyHandlingCost,
										lineColor: "#73C0DE",
										labelFontColor: "#73C0DE",
										showLabel: true,
										labelFontSize: 10
									}
								]
								console.log(this.markLineList, 'this.markLineList')
							}
						});
					}
				});
			},
			changeMonth(e) {
				console.log(e)
				this.currentMonthWaterProductCostChartDataList = this.waterProductCostChartDataList[e - 1].list;
			},
			// 公司平均成本
			queryTonWaterCostAVG() {
				let params = {
					year: this.currentYear
				};
				homeHttp.queryTonWaterCostAVG(params).then((res) => {
					if (res.data.code == 200) {
						console.log(res.data);
						this.queryTonWaterCostAVGObj = res.data.data;
					}
				});
			}
		}
	}
</script>

<style>
	@import '../../static/css/index.css';
</style>