<template>
	<view class="content">
		<view class="" style="position: fixed;z-index: 9999; width: 100%;background: #fff;">
			<uni-section title="" style="border-bottom: 1px solid #ffeeee;">
				<view class="header reportDetail" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						巡检记录
					</view>
				</view>
			</uni-section>
		</view>
		
		<view class="timeSection" style="padding: 95px 20px 10px;">
			<scroll-view scroll-y="true" :show-scrollbar='false'>
				<view class="inspectionList" v-if="dataList.length > 0">
					<view class="inspectionItemItem" v-for="(item, index) in dataList" :key="item.id">
						<uni-card class="cardItem" style="margin: 15px 0;" @click="eqRepairDetail(item)">
							<view class="eqDetail">
								<view class="detail">

									<view class="content">
										<view class="name" style="width: 75%;color: #ff575c">
											{{item.itemLevelName}}
										</view>
									</view>
									<view class="content">
										<view class="">
											巡检日期：{{item.inspDateApp}}
										</view>
										<view class="">
											巡检人：{{item.inspUser}}
										</view>
									</view>
								</view>
							</view>

						</uni-card>
					</view>
				</view>
				<view class="inspectionEmpty" v-else>
					<view style="display: block;text-align: center;padding-top: 40px;">
						<image style="width: 100px;height: 66px;" src="../../../static/images/noData.png">
						</image>
						<view style="color: #666;">无维修记录</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import equipmentHttp from '../../../api/equipment.js'
	export default {
		components: {},
		data() {
			return {
				depId: '',
				depName: '',
				total: '',
				useCount: '',
				searchValue: '',
				dataList: [],
				current: 1,
				pagas: 0,
				isPullDownRefresh: false,
				recordListId: '',
				facilityName: '',
				assetNumber: '',
			}
		},
		onBackPress() {},
		onLoad(options) {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 160
			this.recordListId = options.id
			this.facilityName = options.facilityName
			this.assetNumber = options.assetNumber
			
			this.getDataList();
		},
		onPullDownRefresh() {
			this.isPullDownRefresh = true;
			this.dataList = [];
			this.current = 1;
			this.getDataList()
		},
		onReachBottom() {
			if (this.current > this.pages) {
				uni.showToast({
					'title': '当前已是最后一页',
					'icon': 'none'
				})
				return
			}
			// this.getDataList();
		},
		mounted() {
			console.log(this.pageHeight, 'this.pageHeigh')
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
			getDataList() {
				const self = this;
				let params = {
					// facilityState: '3',
					id: self.recordListId,
					facilityName: self.facilityName,
					assetNumber: self.assetNumber,
					pageNo: self.current,
					pageSize: 10,
				}
				equipmentHttp.inspTaskQueryInspRecord(params).then((res) => {
					if (res.data.code == 200) {
						let inspectionList = []
						res.data.data.forEach(item => {
							if(item.itemLevelOne) {
								inspectionList.push({
									itemLevelName: '一级巡检',
									itemLevelInfo: item.itemLevelOne,
									inspDateApp: item.inspDateApp,
									equipId: self.recordListId,
									facilityName: self.facilityName,
									assetNumber: self.assetNumber,
									inspUser: item.inspUserOne,
									imageIds: item.imagePathOne,
								})
							}
							if(item.itemLevelTwo) {
								inspectionList.push({
									itemLevelName: '二级巡检',
									itemLevelInfo: item.itemLevelTwo,
									inspDateApp: item.inspDateApp,
									equipId: self.recordListId,
									facilityName: self.facilityName,
									assetNumber: self.assetNumber,
									inspUser: item.inspUserTwo,
									imageIds: item.imagePathTwo,
								})
							}
							if(item.itemLevelThree) {
								inspectionList.push({
									itemLevelName: '三级巡检',
									itemLevelInfo: item.itemLevelThree,
									inspDateApp: item.inspDateApp,
									equipId: self.recordListId,
									facilityName: self.facilityName,
									assetNumber: self.assetNumber,
									inspUser: item.inspUserThree,
									imageIds: item.imagePathThree,
								})
							}
						})
						self.pages = res.data.data.pages;
						if (self.isPullDownRefresh) {
							self.isPullDownRefresh = false;
							uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
						}
						let list = inspectionList;
						self.dataList = self.dataList.concat(list);
						self.current++;
					}
				});
			},
			onSearch(val) {
				this.dataList = [];
				this.current = 1;
				this.getDataList()
			},
			eqRepairDetail(item) {
				uni.navigateTo({
					url: `/pages/equipment/components/inspectionRecordDetail?itemLevelName=${item.itemLevelName}&inspDateApp=${item.inspDateApp}&inspUser=${item.inspUser}&imageIds=${item.imageIds}&itemLevelInfo=${item.itemLevelInfo}`,
					// ${item.specificationModel}
				})
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
		height: 22px;
		line-height: 22px;
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
		margin: 5px 0 !important;
		padding: 10px !important;
		box-sizing: border-box;
		position: relative;
		.tag{
			width: 80px;
			height: 14px;
			line-height: 14px;
			font-size: 10px;
			text-align: center;
			position: absolute;
			right: -20px;
			top: 5px;
			color: #fff;
			transform: rotate(30deg);
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
</style>