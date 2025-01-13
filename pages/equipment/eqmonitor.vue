<template>
	<view class="content">
		<uni-section title="">
			<view class="reportDetail">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						云控制
					</view>
				</view>
			</view>
			<!-- :style="{height: swiperWidth + 'px'}" -->
			<view class="timeSection" style="padding:5px;z-index: 1002;" v-if="depId == '1'">
				<view class="year yearDataSelect" style="width: 25%;margin: 10px 0 0 10px;">
					<uni-data-select class="yearDataSelect" v-model="currentFactory" :localdata="range"
						@change="changeFactory" title='title'></uni-data-select>
				</view>
			</view>
			<view class="timeSection" style="padding: 10px 18px 10px;">
				<scroll-view scroll-y="true" :show-scrollbar='false' :style="{height: swiperWidth + 'px'}">
					<view class="inspectionList" v-if="inspectionTaskList.length > 0">
						<view class="inspectionItemItem" v-for="(item, index) in inspectionTaskList" :key="item.id">
							<uni-card class="cardItem">
								<view class="eqDetail">
									<view class="detailIcon">
									<image style="width: 28px; height: 28px;" :mode="'aspectFit'" src="../../static/images/device_normal.png"></image>
									</view>
									<view class="detail">

										<view class="content">
											<!-- {{item}} -->
											<view class="name" style="width: 75%;">
												{{item.mod_name}}
											</view>
											<view style="text-align: right;">
												<switch :checked="item.status == '0'" color="#FF757c"
													style="transform:scale(0.7)" @change="switch1Change" />
											</view>
										</view>
										<view class="content">
											<view>
												imei: {{item.imei}}
											</view>
											<view>
												{{item.facilityLocations}}
											</view>
										</view>
									</view>
								</view>
								<view class="eqDetailList">
									<view class="eqDataItem" style="color: #666" v-for="m in item.paramList">
										<text>{{m.key }}: </text><text style="margin-left: 10px;color: #4b8cff;">{{m.value || '-'}}</text>
									</view>
								</view>
							</uni-card>
						</view>
					</view>
					<view class="inspectionEmpty" v-else>
						<view style="display: block;text-align: center;padding-top: 40px;">
							<image style="width: 100px;height: 66px;" src="../../static/images/noData.png">
							</image>
							<view style="color: #666;">暂无数据</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-section>

	</view>
</template>

<script>
	import equipmentHttp from '../../api/equipment.js'
	export default {
		data() {
			return {
				pageHeight: 0,
				swiperWidth: 0,
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
				inspectionTaskList: [],
				timer: null,
				depId: uni.getStorageSync('depId')
			}
		},
		onLoad(options) {
			this.timer = setInterval(() => {
				this.initDate();
			}, 10000);
		},
		onUnload() {
			this.timer = null
		},
		mounted() {
			this.currentFactory = this.depId
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 148
			this.initDate()
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
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
			},
			changeFactory(e) {

			},
			initDate() {
				this.search()
			},
			search() {
				let params = {
					depId: this.currentFactory,
					// depId: '1',
					// startTime: this.currentDate,
					// endTime: this.currentDate,
					// pageNo: 1,
					// pageSize: 10,
				};
				equipmentHttp.getFacilityDetail(params).then((res) => {
					if (res.data.code == 200) {
						this.inspectionTaskList = res.data.data
					}
				});
			},
		}
	}
</script>

<style lang="less">
	@import '../../static/css/index.css';

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
	.eqDetailList{
		
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;
			font-size: 12px;
			color: #ff575c;
			line-height: 1.5;
			padding: 4px 0;
				
			.eqDataItem{
				width: 50%;
				line-height: 2;
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