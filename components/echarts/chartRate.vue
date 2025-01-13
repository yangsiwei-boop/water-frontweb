<template>
	<view class="charts-box">
		<qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
	</view>
</template>

<script>
	export default {
		props: {
			rateData: String,
			color: Array,
		},
		data() {
			return {
				chartData: {},
				//这里的 opts 是图表类型 type="ring" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['ring'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					update: true,
					timing: "easeOut",
					duration: 1000,
					rotate: false,
					rotateLock: false,
					color: this.color,
					fontSize: 13,
					fontColor: "#666666",
					dataLabel: false,
					dataPointShape: true,
					dataPointShapeType: "solid",
					touchMoveLimit: 60,
					enableScroll: false,
					enableMarkLine: false,
					legend: {
						show: false,
						position: "right",
						lineHeight: 25,
						float: "center",
						padding: 5,
						margin: 5,
						backgroundColor: "rgba(0,0,0,0)",
						borderColor: "rgba(0,0,0,0)",
						borderWidth: 0,
						fontSize: 13,
						fontColor: "#666666",
						hiddenColor: "#CECECE",
						itemGap: 10
					},
					title: {
						name: '-',
						fontSize: 12,
						color: "#666666",
						offsetX: 0,
						offsetY: 0
					},
					subtitle: {
						name: "",
						fontSize: 25,
						color: "#7cb5ec",
						offsetX: 0,
						offsetY: 0
					},
					extra: {
						ring: {
							ringWidth: 4,
							activeOpacity: 0.5,
							activeRadius: 2,
							offsetAngle: -180,
							labelWidth: 5,
							border: false,
							borderWidth: 0,
							borderColor: "#FFFFFF",
							centerColor: "#FFFFFF",
							customRadius: 30,
							linearType: "none"
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
							fontSize: 13,
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
						}
					}
				}
			};
		},
		created() {
			this.getServerData();
		},
		watch: {
			rateData(){
				this.getServerData();
			}
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							data: [{
								"name": "1",
								"value": Number(this.rateData)
							},{
								"name": "2",
								"value": 100 - Number(this.rateData)
							}]
						}]
					};
					this.opts.title.name = Number(this.rateData) + '%'
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 100);
			},
		}
	};
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 80px;
	}
</style>