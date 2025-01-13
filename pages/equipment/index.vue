<template>
	<view class="content">
		<view class="" style="position: fixed;z-index: 9999; width: 100%;background: #fff;">
			<uni-section title="" style="border-bottom: 1px solid #ffeeee;padding-top: 10px;">
				<div class="eqList">

					<view class="reportDetail">
						<view class="header" @click="goBack">
							<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
							<view class="" style="color: #333;">
								列表
							</view>
						</view>
					</view>
					<!-- <image style="width: 32px; height: 32px;padding: 0 20px 4px;" :mode="'aspectFit'"
						src="../../static/images/equipment_monitoring.png" @click="eqMonitor"></image> -->
				</div>
			</uni-section>


			<view class="search" v-if="depId != '1'">
				<uni-search-bar v-model="searchValue" style="padding: 10px 20px;" placeholder="请输入设备名称/地点/识别码"
					bgColor="#f9f9f9" @confirm="onSearch" @cancel="cancelSearch" />
			</view>
			<view class="eqTotal" v-if="depId != '1'">
				正常设备数： <text style="color: #3ac592">{{useCount}}</text>/{{total}}
			</view>
		</view>
		<view class="banner" v-if="depId == '1'">
			<view class="bannerItem">
				<view class="icon" style="background: #ff0000;">
					<image style="width: 28px; height: 28px;" :mode="'aspectFit'" src="../../static/images/all.png">
					</image>
				</view>
				<view class="name" style="color: #ff575c">
					全部设备
				</view>
				<view class="number" style="color: #ff575c">
					{{equipmentOverview.total}}
				</view>
			</view>
			<view class="bannerItem">
				<view class="icon" style="background: #3ac952;">
					<image style="width: 28px; height: 28px;" :mode="'aspectFit'" src="../../static/images/normal.png">
					</image>
				</view>
				<view class="name" style="color: #3ac952">
					正常
				</view>
				<view class="number" style="color: #3ac952">
					{{equipmentOverview.useCount}}
				</view>
			</view>
			<view class="bannerItem">
				<view class="icon" style="background: #999;">
					<image style="width: 28px; height: 28px;" :mode="'aspectFit'" src="../../static/images/spare.png">
					</image>
				</view>
				<view class="name" style="color: #999">
					备用
				</view>
				<view class="number" style="color: #999">
					{{equipmentOverview.standbyCount}}
				</view>
			</view>
			<view class="bannerItem">
				<view class="icon" style="background: #fbb038;">
					<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
						src="../../static/images/maintenance.png"></image>
				</view>
				<view class="name" style="color: #fbb038">
					维修
				</view>
				<view class="number" style="color: #fbb038">
					{{equipmentOverview.repairCount}}
				</view>
			</view>
		</view>
		<view class="company" v-if="depId == '1'">
			<view class="eqCompayNumber">
				公司（{{equipmentOverview.useCount}}/{{equipmentOverview.total}}）
			</view>
			<uni-card class="cardItem">
				<view class="cardItemContent"
					@click="eqList('2', '星沙厂', xingshaEquipmentOverview.useCount, xingshaEquipmentOverview.total )">
					<view class="icon">
						<image style="width: 18px; height: 18px;" :mode="'aspectFit'"
							src="../../static/images/device2.png"></image>
					</view>
					<view class="name">
						星沙厂
					</view>
					<view class="number">
						（{{xingshaEquipmentOverview.useCount}}/{{xingshaEquipmentOverview.total}}）
					</view>
					<view class="number">
						<uni-icons type="right" size="20" style="line-height: 48px;"
							:style="{color: '#ff575c'}"></uni-icons>
					</view>
				</view>
			</uni-card>
			<uni-card class="cardItem">
				<view class="cardItemContent"
					@click="eqList('3', '城西厂', chengxiEquipmentOverview.useCount, chengxiEquipmentOverview.total)">
					<view class="icon">
						<image style="width: 18px; height: 18px;" :mode="'aspectFit'"
							src="../../static/images/device2.png"></image>
					</view>
					<view class="name">
						城西厂
					</view>
					<view class="number">
						（{{chengxiEquipmentOverview.useCount}}/{{chengxiEquipmentOverview.total}}）
					</view>
					<view class="number">
						<uni-icons type="right" size="20" style="line-height: 48px;"
							:style="{color: '#ff575c'}"></uni-icons>
					</view>
				</view>
			</uni-card>
			<uni-card class="cardItem">
				<view class="cardItemContent"
					@click="eqList('4', '城北厂', chengbeiEquipmentOverview.useCount, chengbeiEquipmentOverview.total)">
					<view class="icon">
						<image style="width: 18px; height: 18px;" :mode="'aspectFit'"
							src="../../static/images/device2.png"></image>
					</view>
					<view class="name">
						城北厂
					</view>
					<view class="number">
						（{{chengbeiEquipmentOverview.useCount}}/{{chengbeiEquipmentOverview.total}}）
					</view>
					<view class="number">
						<uni-icons type="right" size="20" style="line-height: 48px;"
							:style="{color: '#ff575c'}"></uni-icons>
					</view>
				</view>
			</uni-card>
			<uni-card class="cardItem">
				<view class="cardItemContent"
					@click="eqList('5', '城南厂', chengnanEquipmentOverview.useCount, chengnanEquipmentOverview.total)">
					<view class="icon">
						<image style="width: 18px; height: 18px;" :mode="'aspectFit'"
							src="../../static/images/device2.png"></image>
					</view>
					<view class="name">
						城南厂
					</view>
					<view class="number">
						（{{chengnanEquipmentOverview.useCount}}/{{chengnanEquipmentOverview.total}}）
					</view>
					<view class="number">
						<uni-icons type="right" size="20" style="line-height: 48px;"
							:style="{color: '#ff575c'}"></uni-icons>
					</view>
				</view>
			</uni-card>
			<uni-card class="cardItem">
				<view class="cardItemContent"
					@click="eqList('6', '城东厂', chengdongEquipmentOverview.useCount, chengdongEquipmentOverview.total)">
					<view class="icon">
						<image style="width: 18px; height: 18px;" :mode="'aspectFit'"
							src="../../static/images/device2.png"></image>
					</view>
					<view class="name">
						城东厂
					</view>
					<view class="number">
						（{{chengdongEquipmentOverview.useCount}}/{{chengdongEquipmentOverview.total}}）
					</view>
					<view class="number">
						<uni-icons type="right" size="20" style="line-height: 48px;"
							:style="{color: '#ff575c'}"></uni-icons>
					</view>
				</view>
			</uni-card>
		</view>
		<view class="timeSection" style="padding: 180px 20px 60px; z-index: 1;" v-if="depId != '1'">
			<scroll-view scroll-y="true" :show-scrollbar='false'>
				<view class="inspectionList" v-if="dataList.length > 0">
					<view class="inspectionItemItem" v-for="(item, index) in dataList" :key="item.id">
						<uni-card class="cardItem" style="margin: 15px 0;" @click="eqDetail(item.id)">
							<view class="tag" v-show="item.facilityState == '3'" style="background: #fbb03b;">
								维修中
							</view>
							<view class="tag" v-show="item.facilityState == '2'" style="background: #dcdcdf;">
								备用
							</view>
							<view class="eqDetail">
								<view class="detailIcon">
									<image v-show="item.facilityState == '1'" style="width: 28px; height: 28px;"
										:mode="'aspectFit'" src="../../static/images/device_normal.png"></image>
									<image v-show="item.facilityState == '3'" style="width: 28px; height: 28px;"
										:mode="'aspectFit'" src="../../static/images/device_maintenance.png"></image>
									<image v-show="item.facilityState == '2'" style="width: 28px; height: 28px;"
										:mode="'aspectFit'" src="../../static/images/devicespare_.png"></image>
								</view>
								<view class="detail">

									<view class="content"
										:class="item.facilityState == '3' ? 'repair' : (item.facilityState == '2' ? 'standby' : '')">
										<view class="name" style="width: 75%;">
											{{item.facilityName}}{{item.specificationModel}}
										</view>
									</view>
									<view class="content"
										:class="item.facilityState == '3' ? 'repair' : (item.facilityState == '2' ? 'standby' : '')">
										<view class="">
											{{item.facilityNumber}}
										</view>
										<view class="">
											{{item.facilityLocations}}
										</view>
									</view>
								</view>
							</view>

						</uni-card>
					</view>
				</view>
				<view class="inspectionEmpty" v-else>
					<view style="display: block;text-align: center;padding-top: 40px;">
						<image style="width: 100px;height: 66px;" src="../../static/images/noData.png">
						</image>
						<view style="color: #666;">无数据</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import equipmentHttp from '../../api/equipment.js'
	export default {
		components: {},
		data() {
			return {
				value: 1,
				array: ['星沙厂', '城西厂', '城北厂', '城南厂', '城东厂'],
				index: 0,
				currentIndex: 0,
				pageHeight: 0,
				swiperWidth: 0,
				equipmentOverview: {},
				xingshaEquipmentOverview: {},
				chengxiEquipmentOverview: {},
				chengbeiEquipmentOverview: {},
				chengnanEquipmentOverview: {},
				chengdongEquipmentOverview: {},
				depId: uni.getStorageSync('depId'),
				depName: '',
				total: '',
				useCount: '',
				searchValue: '',
				dataList: [],
				current: 1,
				pagas: 0,
				isPullDownRefresh: false,
			}
		},
		onBackPress() {
			console.log('2222222')
			this.initDate()
		},
		onLoad() {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			this.swiperWidth = this.pageHeight - 56
			if (this.depId == '0' || this.depId == '1') {
				this.facilitySituation()
				this.facilitySituationDepId('2', 'xingsha')
				this.facilitySituationDepId('3', 'chengxi')
				this.facilitySituationDepId('4', 'chengbei')
				this.facilitySituationDepId('5', 'chengnan')
				this.facilitySituationDepId('6', 'chengdong')
			} else {

				this.facilitySituationDepIdView(this.depId, this.depIdName(this.depId))
			}
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
			this.getDataList();
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
			depIdName(id) {
				return id == "1" ?
					"公司" :
					id == "2" ?
					"星沙厂" :
					id == "3" ?
					"城西厂" :
					id == "4" ?
					"城北厂" :
					id == "5" ?
					"城南厂" :
					"城东厂";
			},
			facilitySituation() {
				const depId = uni.getStorageSync('depId');
				console.log(depId, '2222')
				equipmentHttp.facilitySituation(depId).then((res) => {
					if (res.data.code == 200) {
						console.log(res.data);
						this.equipmentOverview = res.data.data;
					}
				});
			},
			facilitySituationDepId(depId, depIdName) {
				equipmentHttp.facilitySituation(depId).then((res) => {
					if (res.data.code == 200) {
						console.log(res.data);
						this[depIdName + 'EquipmentOverview'] = res.data.data;
					}
				});
			},
			facilitySituationDepIdView(depId, depIdName) {
				let self = this
				equipmentHttp.facilitySituation(depId).then((res) => {
					if (res.data.code == 200) {
						console.log(res.data);
						this.depId = depId
						this.depName = depIdName
						this.total = res.data.data.total
						this.useCount = res.data.data.useCount
						this.getDataList();
					}
				});
			},
			eqMonitor() {
				uni.navigateTo({
					url: `/pages/equipment/eqmonitor`,
				})
			},
			eqList(depId, depName, useCount, total) {
				uni.navigateTo({
					url: `/pages/equipment/eqList?depId=${depId}&depName=${depName}&useCount=${useCount}&total=${total}`,
				})
			},
			getDataList() {
				const self = this;
				let params = {
					depId: self.depId,
					facilityName: self.searchValue,
					// facilityState: '3',
					pageNo: self.current,
					pageSize: 10,
				}
				equipmentHttp.queryFacility(params).then((res) => {
					if (res.data.code == 200) {
						self.pages = res.data.data.pages;
						if (self.isPullDownRefresh) {
							self.isPullDownRefresh = false;
							uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
						}
						let list = res.data.data.records;
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
			cancelSearch(val) {
				this.dataList = [];
				this.searchValue = ''
				this.current = 1;
				this.getDataList()
			},

			eqDetail(id) {
				uni.navigateTo({
					url: `/pages/equipment/eqDetail?id=${id}`,
				})
			},

		}
	}
</script>

<style lang="less">
	@import '../../static/css/index.css';

	.eqList {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.reportDetail {
		display: flex;
		flex-direction: column;
		padding-left: 10px;
	}

	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #ff575c;
		font-size: 18px;
	}

	.banner {
		display: flex;
		flex-direction: row;
		padding-top: 86px;

		.bannerItem {
			flex: 1;
			text-align: center;

			.icon {
				width: 60px;
				height: 60px;
				margin: 5px auto 10px;
				border-radius: 22px;
				box-sizing: border-box;
				padding: 16px;
			}

			.name {
				font-size: 14px;
			}

			.number {
				font-size: 12px;
			}
		}
	}

	.company {
		padding: 20px;

		.eqCompayNumber {
			width: 100%;
			height: 42px;
			border: 1px solid #ff575c;
			border-radius: 6px;
			line-height: 22px;
			padding: 10px 16px;
			box-sizing: border-box;
			font-size: 15px;
			color: #666;
		}

		.cardItem {
			margin: 15px 0px 0 0 !important;

			.name {
				flex: 1
			}

			.number {
				line-height: 40px;
			}
		}

		.cardItemContent {
			width: 100%;
			height: 40px;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 16px;

			.icon {
				width: 28px;
				height: 28px;
				background: #ff575c;
				border-radius: 14px;
				text-align: center;
				padding-top: 5px;
				box-sizing: border-box;
				margin-right: 8px;
			}

			.number {
				font-size: 14px;
			}
		}
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
		margin: 5px 0 !important;
		padding: 10px !important;
		box-sizing: border-box;
		position: relative;

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