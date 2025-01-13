<template>
	<view class="content">

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

		<view class="timeSection" style="padding: 10px 18px 50px;">
			<scroll-view scroll-y="true" :style="{height: height + 'px'}">
				<view class="inspectionList" v-if="dataList.length > 0">
					<view class="inspectionItemItem" v-for="(item, index) in dataList" :key="item.id">
						<uni-card class="cardItem" @click="eqDetail(item.id)">
							<view class="tag" style="background: #3ac952;">
								运行
							</view>
							<!-- <view class="tag" style="background: #dcdcdf;">
							备用
						</view> -->
							<view class="title">
								<view class="name">
									系统启停区
								</view>
							</view>
							<view class="options">
								<image style="width: 42px; height: 42px;margin: 10px 10px;" :mode="'aspectFit'"
									src="../../../static/images/start.png"></image>
								<image style="width: 42px; height: 42px;margin: 0 10px;" :mode="'aspectFit'"
									src="../../../static/images/resetting.png"></image>
							</view>
						</uni-card>
					</view>
					<view class="inspectionItemItem">
						<uni-card class="cardItem" @click="eqDetail(item.id)">
							<view class="title">
								<view class="name">
									加药泵实时状态
								</view>
							</view>
							<view class="realStatus">
								<view class="realStatusItem">
									<view class="">
										<image style="width: 36px; height: 36px;margin: 10px 10px;" :mode="'aspectFit'"
											src="../../../static/images/dosingPumpOperation.png"></image>
									</view>
									<view class="">
										运行
									</view>
									<view class="">
										加药泵1
									</view>
								</view>
								<view class="realStatusItem">
									<view class="">
										<image style="width: 36px; height: 36px;margin: 10px 10px;" :mode="'aspectFit'"
											src="../../../static/images/dosingPumpBreakdown.png"></image>
									</view>
									<view class="">
										故障
									</view>
									<view class="">
										加药泵2
									</view>
								</view>
								<view class="realStatusItem">
									<view class="">
										<image style="width: 36px; height: 36px;margin: 10px 10px;" :mode="'aspectFit'"
											src="../../../static/images/dosingPumpStop.png"></image>
									</view>
									<view class="">
										停机
									</view>
									<view class="">
										加药泵3
									</view>
								</view>
							</view>
						</uni-card>
					</view>

					<view class="pojectValueBox">
						<view class="pojectValueList">
							<uni-card class="pojectValueItem">
								<view class="number">
									0.00%
								</view>
								<view class="name">
									加药浓度
								</view>
							</uni-card>
							<uni-card class="pojectValueItem">
								<view class="number">
									0.00%
								</view>
								<view class="name">
									TP目标设定
								</view>
							</uni-card>
						</view>
						<view class="pojectValueList">
							<uni-card class="pojectValueItem">
								<view class="number">
									0.00%
								</view>
								<view class="name">
									进水TP浓度
								</view>
							</uni-card>
							<uni-card class="pojectValueItem">
								<view class="number">
									0.00%
								</view>
								<view class="name">
									出水TP浓度
								</view>
							</uni-card>
						</view>
						<view class="pojectValueList">
							<uni-card class="pojectValueItem">
								<view class="number">
									0.00%
								</view>
								<view class="name">
									PAC投加流量
								</view>
							</uni-card>
						</view>
					</view>
				</view>
				<!-- 
				<uni-card title="PAC加药泵流量" extra="单位: %" :is-shadow="true" :border="false">
					<chart-line-water-goal :dataList="waterGoalChartDataList"
						:legendList="waterGoalChartType" :showStandardLine="true"></chart-line-water-goal>
				</uni-card>
				<uni-card title="PAC投加量" extra="单位: %" :is-shadow="true" :border="false">
					<chart-line-water-goal :dataList="waterGoalChartDataList"
						:legendList="waterGoalChartType" :showStandardLine="true"></chart-line-water-goal>
				</uni-card>
				<uni-card title="TP浓度" extra="单位: %" :is-shadow="true" :border="false">
					<chart-line-water-goal :dataList="waterGoalChartDataList"
						:legendList="waterGoalChartType" :showStandardLine="true"></chart-line-water-goal>
				</uni-card> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import chartLineWaterGoal from '../../../components/echarts/chartLineWaterGoal.vue'
	export default {
		components: {
			"chart-line-water-goal": chartLineWaterGoal,
		},
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
				pageHeight: 0,
				swiperWidth: 0,
				swiperWidth2: 0,
				depId: uni.getStorageSync('depId'),
				title: '',
				dataList: [
					1
				],
				dataList2: [
					1, 2, 3, 4, 5, 6,7,8
				],
				checked: true,
				time: '',
				
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
			}
		},
		onBackPress() {
		},
		onLoad(options) {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			console.log(this.height, 'this.height')
		},
		methods: {

			changeFactory(e) {
				this.search()
			},
			switch2Change: function(e) {
				console.log('switch2 发生 change 事件，携带值为', e.detail.value)
				this.checked = e.detail.value
			},
			
			// 每月水量目标完成情况
			queryWaterCompleteRate() {
				let params = {
					year: '2025',
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
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/index.css';


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

	.eqTotal {
		text-align: right;
		padding: 5px 20px;
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

	.content {
		color: #333 !important;
	}

	.content.repair {
		color: #fbb03b !important;
	}

	.content.standby {
		color: #dcdcdf !important;
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
		margin: 10px 0 !important;
		padding: 10px !important;
		box-sizing: border-box;
		position: relative;
		border-radius: 10px;

		.tag {
			width: 80px;
			height: 14px;
			line-height: 14px;
			font-size: 10px;
			text-align: center;
			position: absolute;
			right: -20px;
			top: 5px;
			color: #fff;
			transform: rotate(40deg);
		}

		.title {
			display: flex;
			flex-direction: row;
			align-items: center;

			.name {
				font-size: 16px;
				margin-right: 60px;
			}

			.model {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #ccc;

				.act {
					color: #409ffe;
				}
			}
		}

		.options {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		.realStatus {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.realStatusItem {
				width: 100px;
				text-align: center;
			}
		}

		.projectDetailLine {
			display: flex;
			flex-direction: row;

			.projectDetailLineItem {
				display: flex;
				flex-direction: row;
				flex: 1;
				line-height: 2.5;

				.itemLabel {
					flex: 1;
				}

				.itemValue {
					display: flex;
					flex-direction: row;

					.itemValueButton {
						width: 80px;
					}

					.itemValueInput {
						width: 100px;
						margin-right: 5px;
						line-height: 35px !important;
					}
				}
			}
		}
	}
	
.pojectValueBox{
		display: flex;
		flex-direction: column;
}
	.pojectValueList {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.pojectValueItem{
			margin: 10px!important;
			padding: 10px!important;
			width: 50%!important;
			.number{
				color: #ff575c;
				font-size: 16px;
				line-height: 1.5;
			}
			.name{
				color: #333;
				font-size: 12px;
				line-height: 1.5;
			}
		}
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

	.search {
		position: relative;

		image {
			position: absolute;
			right: 10px;
			z-index: 999;
		}
	}

	/deep/ .uni-searchbar__box {
		height: 46px !important;
	}

	.uni-searchbar__cancel {
		line-height: 46px !important;
	}
</style>