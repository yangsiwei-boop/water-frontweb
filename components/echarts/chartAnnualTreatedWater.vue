<template>
	<view class="charts-box">
		<qiun-data-charts type="bar" :opts="opts" :chartData="chartData" />
	</view>
</template>

<script>
	export default {
		props: {
			dataList: Array,
			colorList: Array,
			seriesDataList: Array
		},
		data() {
			return {
				chartData: {},
				//这里的 opts 是图表类型 type="bar" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['bar'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					timing: "easeOut",
					duration: 1000,
					rotate: false,
					rotateLock: false,
					color: [],
					padding: [15, 30, 0, 5],
					fontSize: 10,
					fontColor: "#666666",
					dataLabel: false,
					dataPointShape: true,
					dataPointShapeType: "solid",
					touchMoveLimit: 60,
					enableScroll: false,
					enableMarkLine: false,
					legend: {
						show: false,
						position: "bottom",
						float: "center",
						padding: 5,
						margin: 5,
						backgroundColor: "rgba(0,0,0,0)",
						borderColor: "rgba(0,0,0,0)",
						borderWidth: 0,
						fontSize: 10,
						fontColor: "#666666",
						lineHeight: 11,
						hiddenColor: "#CECECE",
						itemGap: 10
					},
					xAxis: {
						boundaryGap: "justify",
						disableGrid: false,
						min: 0,
						axisLine: false,
						disabled: false,
						axisLineColor: "#CCCCCC",
						calibration: false,
						fontColor: "#666666",
						fontSize: 10,
						lineHeight: 20,
						marginTop: 0,
						rotateLabel: false,
						rotateAngle: 45,
						itemCount: 5,
						splitNumber: 5,
						gridColor: "#F6F6F6",
						gridType: "solid",
						dashLength: 4,
						gridEval: 1,
						scrollShow: false,
						scrollAlign: "left",
						scrollColor: "#A6A6A6",
						scrollBackgroundColor: "#EFEBEF",
						title: "",
						titleFontSize: 13,
						titleOffsetY: 0,
						titleOffsetX: 0,
						titleFontColor: "#666666",
						format: ""
					},
					yAxis: {
						disabled: false,
						disableGrid: false,
						splitNumber: 5,
						gridType: "solid",
						dashLength: 8,
						fontSize: 10,
						gridColor: "#CCCCCC",
						padding: 10,
						showTitle: false,
						data: []
					},
					extra: {
						bar: {
							type: "stack",
							width: 18,
							meterBorde: 1,
							meterFillColor: "#FFFFFF",
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							seriesGap: 2,
							categoryGap: 3,
							barBorderCircle: false,
							linearType: "none",
							linearOpacity: 1,
							colorStop: 0
						},
						tooltip: {
							showBox: true,
							showArrow: true,
							showCategory: false,
							borderWidth: 0,
							borderRadius: 0,
							borderColor: "#000000",
							borderOpacity: 0.7,
							bgColor: "#000000",
							bgOpacity: 0.7,
							gridType: "solid",
							dashLength: 4,
							gridColor: "#CCCCCC",
							boxPadding: 3,
							fontSize: 10,
							lineHeight: 20,
							fontColor: "#FFFFFF",
							legendShow: true,
							legendShape: "auto",
							splitLine: true,
							horizentalLine: false,
							xAxisLabel: false,
							yAxisLabel: false,
							labelBgColor: "#FFFFFF",
							labelBgOpacity: 0.7,
							labelFontColor: "#666666"
						},
						markLine: {
							type: "solid",
							dashLength: 4,
							data: []
						}
					}
				}
			};
		},
		created() {
			this.getServerData();
		},
		watch: {
			dataList(){
				this.getServerData();
			}
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					this.opts.color = this.colorList
					let seriesData = [];
					let xAxisList = [];
					let legendList = [];
					this.dataList.forEach((t, v) => {
						xAxisList.push(t.name);
					});
					let seriesList = this.seriesDataList;
					for (let index = 0; index < seriesList.length; index++) {
						const element = seriesList[index];
						let itemDate = [];
						this.dataList.forEach(function(t, v) {
							itemDate.push(t[element]);
						});
						seriesData.push({
							name: element,
							data: itemDate
						})
					}
					console.log(seriesData)
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: xAxisList,
							fontSize: 10,
						series: seriesData
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		}
	};
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 160px;
	}
</style>