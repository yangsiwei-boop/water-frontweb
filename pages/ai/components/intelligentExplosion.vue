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

		<view class="timeSection" style="padding: 10px 18px 10px;">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="inspectionList" v-if="dataList.length > 0">
					<view class="inspectionItemItem" v-for="(item, index) in dataList" :key="item.id">
						<uni-card class="cardItem" @click="eqDetail(item.id)">
							<view class="tag" style="background: #3ac952;">
								通讯中
							</view>
							<!-- <view class="tag" style="background: #dcdcdf;">
							备用
						</view> -->
							<view class="title">
								<view class="name">
									1#风机
								</view>
								<view class="model">
									<view :class="checked ? '' : 'act'">
										手动模式
									</view>
									<switch color="#409ffe" :checked="checked" @change="switch2Change"
										style="transform:scale(0.7)" />
									<view :class="checked ? 'act' : ''">
										自动模式
									</view>
								</view>
							</view>
							<view class="options">
								<image style="width: 42px; height: 42px;margin: 10px 10px;" :mode="'aspectFit'"
									src="../../../static/images/start.png"></image>
								<image style="width: 42px; height: 42px;margin: 0 10px;" :mode="'aspectFit'"
									src="../../../static/images/stop.png"></image>
							</view>
							<view class="projectDetail">
								<view class="projectDetailLine">
									<view class="projectDetailLineItem">
										<view class="itemLabel">
											流量反馈：
										</view>
										<view class="itemValue">

										</view>
									</view>
									<view class="projectDetailLineItem">
										<view class="itemLabel">
											工作转速：
										</view>
										<view class="itemValue">

										</view>
									</view>
								</view>
								<view class="projectDetailLine">
									<view class="projectDetailLineItem">
										<view class="itemLabel">
											滤网压差：
										</view>
										<view class="itemValue">

										</view>
									</view>
									<view class="projectDetailLineItem">
										<view class="itemLabel">
											运行功率：
										</view>
										<view class="itemValue">

										</view>
									</view>
								</view>
								<view class="projectDetailLine">
									<view class="projectDetailLineItem">
										<view class="itemLabel">
											排气压力：
										</view>
										<view class="itemValue">

										</view>
									</view>
									<view class="projectDetailLineItem">
										<view class="itemLabel">
											输入电流：
										</view>
										<view class="itemValue">

										</view>
									</view>
								</view>
								<view class="projectDetailLine">
									<view class="projectDetailLineItem">
										<view class="itemLabel">
											运行时间：
										</view>
										<view class="itemValue">

										</view>
									</view>
									<view class="projectDetailLineItem">
										<view class="itemLabel">
											流量设定：
										</view>
										<view class="itemValue">

										</view>
									</view>
								</view>
								<view class="projectDetailLine">
									<view class="projectDetailLineItem">
										<view class="itemLabel">
											风量设定(㎡/min)：
										</view>
										<view class="itemValue">
											<uni-easyinput style="width: 120px;" class="itemValueInput" v-model="time" placeholder="" />
								
											<button class="itemValueButton" type="primary" size="mini">保存</button>
										</view>
									</view>
								</view>
							</view>
						</uni-card>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
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
				depId: uni.getStorageSync('depId'),
				title: '',
				dataList: [
					1
				],
				checked: true,
				time: ''
			}
		},
		onBackPress() {
			console.log('2222222')
			this.initDate()
		},
		onLoad(options) {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			this.swiperWidth = this.pageHeight - 96
			if (this.depId == '1') {
				this.swiperWidth2 = this.pageHeight + 96
			} else {
				this.swiperWidth2 = this.pageHeight + 136
			}
		},
		methods: {

			changeFactory(e) {
				this.search()
			},
			switch2Change: function(e) {
				console.log('switch2 发生 change 事件，携带值为', e.detail.value)
				this.checked = e.detail.value
			}
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
					.itemValueButton{
						width: 80px;
						line-height: 35px;
					}
					.itemValueInput{
						width: 100px;
						margin-right: 5px;
					}
				}
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