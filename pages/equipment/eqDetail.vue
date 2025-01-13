<template>
	<view class="content">
		<uni-section title="">
			<view class="reportDetail">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						{{detail.facilityName}} {{detail.facilityNumber}}
					</view>
				</view>
			</view>
			<view class="timeSection" style="padding: 10px 18px 10px;z-index: 98;">
				<scroll-view scroll-y="true" :show-scrollbar='false' :style="{height: swiperWidth + 'px'}">
					<uni-card class="eqStatus">
						<view class="title">
							设备状态
						</view>
						<view class="status"
							:class="detail.facilityState == '1' ? 'normal' : (detail.facilityState == '3' ? 'repair' : 'standby')">
							{{detail.facilityState == '1' ? '正常' : (detail.facilityState == '3' ? '维修' : '备用')}}
						</view>
						<view class="updateTime">
							最近更新时间：{{detail.updateTime || detail.createTime}}
						</view>
					</uni-card>
					<uni-card class="eqStatus">
						<view class="title">
							设备详情
						</view>
						<view class="detailRow">
							<view class="detailRowItem">
								<view class="itemTitle">
									所属单位:
								</view>
								<view class="itemContent">
									{{transformDepId(detail.depId)}}
								</view>
							</view>
							<view class="detailRowItem">
								<view class="itemTitle">
									设备分类:
								</view>
								<view class="itemContent">
									{{detail.facilitySort}}
								</view>
							</view>
						</view>
						<view class="detailRow">
							<view class="detailRowItem">
								<view class="itemTitle">
									设备分级:
								</view>
								<view class="itemContent">
									{{detail.facilityLevel}}
								</view>
							</view>
							<view class="detailRowItem">
								<view class="itemTitle">
									资产编号:
								</view>
								<view class="itemContent">
									{{detail.assetNumber}}
								</view>
							</view>
						</view>
						<view class="detailRow">
							<view class="detailRowItem">
								<view class="itemTitle">
									唯一识别码:
								</view>
								<view class="itemContent">
									{{detail.facilityNumber}}
								</view>
							</view>
						</view>
						<view class="detailRow">
							<view class="detailRowItem">
								<view class="itemTitle">
									是否纳入特许经营权:
								</view>
								<view class="itemContent">
									{{detail.franchising}}
								</view>
							</view>
							<view class="detailRowItem">
								<view class="itemTitle">
									设备地点:
								</view>
								<view class="itemContent">
									{{detail.facilityLocations}}
								</view>
							</view>
						</view>
						<view class="detailRow">
							<view class="detailRowItem">
								<view class="itemTitle">
									数量:
								</view>
								<view class="itemContent">
									{{detail.facilityNumbers}}
								</view>
							</view>
							<view class="detailRowItem">
								<view class="itemTitle">
									单位:
								</view>
								<view class="itemContent">
									{{detail.unit}}
								</view>
							</view>
						</view>
						<view class="detailRow">
							<view class="detailRowItem">
								<view class="itemTitle">
									采购时间:
								</view>
								<view class="itemContent">
									{{detail.purchaseTime}}
								</view>
							</view>
							<view class="detailRowItem">
								<view class="itemTitle">
									开始使用:
								</view>
								<view class="itemContent">
									{{detail.startTime}}
								</view>
							</view>
						</view>
						<view class="detailRow">
							<view class="detailRowItem">
								<view class="itemTitle">
									供应商/厂家:
								</view>
								<view class="itemContent">
									{{detail.facilitySupplier}}
								</view>
							</view>
						</view>
						<view class="detailRow">
							<view class="detailRowItem">
								<view class="itemTitle">
									主要技术参数:
								</view>
								<view class="itemContent">
									{{detail.technicalParameter}}
								</view>
							</view>
						</view>
					</uni-card>
					<uni-card class="eqStatus" v-if="detail.facilityState != '2'">
						<view class="title">
							操作入口
						</view>
						<view class="oprations">
							<view class="oprationsItem" @click="toInspectionRecordList">
								<view class="content">
									<view class="oprateType">
										<view class="name">巡检记录</view>
										<uni-icons type="right" size="22" color="#ff575c"></uni-icons>
									</view>
									<view class="mark">
										最近一次计划巡检时间：{{inspectionTaskList.length == 0 ? '无' : (nextInspectionTaskDate == today ? '今日' : '')}}
									</view>
									<view class="mark"
										v-show="nextInspectionTaskDate != today && inspectionTaskList.length > 0">
										{{nextInspectionTaskDate == today ? '' : nextInspectionTaskDate}}
									</view>
								</view>
								<view class="btn" @click.stop="inspectionReport(item)">
									去巡检
								</view>
							</view>
							<view class="oprationsItem" @click="toUpkeepRecordList">
								<view class="content">
									<view class="oprateType">
										<view class="name">保养记录</view>
										<uni-icons type="right" size="22" color="#ff575c"></uni-icons>
									</view>
									<view class="mark">
										最近一次计划保养时间：{{upkeepTaskList.length == 0 ? '无' : (nextUpkeepTaskDate == today ? '今日' : '')}}
									</view>
									<view class="mark"
										v-show="nextUpkeepTaskDate != today && upkeepTaskList.length > 0">
										{{nextUpkeepTaskDate == today ? '' : nextUpkeepTaskDate}}
									</view>
								</view>
								<view class="btn" @click.stop="upkeepItemReport">
									填写
								</view>
							</view>
							<view class="oprationsItem" @click="toRepairRecordList">
								<view class="content">
									<view class="oprateType">
										<view class="name">维修记录</view>
										<uni-icons type="right" size="22" color="#ff575c"></uni-icons>
									</view>
									<view class="mark" v-if="repairRecordList.length > 0">
										上次记录时间：{{repairRecordList[0].createTime}}
									</view>
									<view class="mark" v-else>
										请维修人员填写维修记录
									</view>
								</view>
								<view class="btn" @click.stop="repairItemReport">
									填写
								</view>
							</view>
							<view class="oprationsItem" style="border: none">
								<view class="content">
									<view class="oprateType">
										<view class="name">故障上报</view>
									</view>
									<view class="mark">
										请填写故障描述，申请维修
									</view>
								</view>
								<view class="btn" @click="breakdownReport">
									填写
								</view>
							</view>
						</view>
					</uni-card>

					<uni-card class="eqStatus">
						<view class="title">
							设备照片
						</view>
						<view class="photo">
							<view class="takePhoto" style="padding: 0;"
								v-show="detail.ficilityPhoto != '' && detail.ficilityPhoto != null">
								<image style="width: 200px; height: 150px;" :mode="'aspectFit'"
									:src="detail.ficilityPhoto" @click="imgPreview(detail.ficilityPhoto)"></image>
								<view class="deleteIcon">
									<uni-icons @click="deleteUrl()" type="clear" size="30" color="#ff575c"
										style="position:absolute;left: -5px;top: -5px;"></uni-icons>
								</view>
							</view>
							<view class="takePhoto" v-show="detail.ficilityPhoto == '' || detail.ficilityPhoto == null"
								@click="takePhoto(index)">
								<uni-icons type="camera-filled" size="72" :style="{color: '#ccc'}"></uni-icons>
								<view class="takePhotoTip">
									拍照上传
								</view>
							</view>
						</view>
					</uni-card>
				</scroll-view>
			</view>
		</uni-section>

	</view>
</template>

<script>
	import equipmentHttp from '../../api/equipment.js'
	import moment from 'moment/moment.js'
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
				detail: {},
				detailId: '',
				repairRecordList: [],
				inspectionTaskList: [],
				upkeepTaskList: '',
				nextInspectionTaskDate: '',
				nextUpkeepTaskDate: '',
				currentUpkeepTask: {},
				currentInspectionTask: {},
				today: moment(new Date()).format('YYYY-MM-DD')
			}
		},
		onLoad(options) {
			this.detailId = options.id
		},
		mounted() {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 100
			this.initDate()
			this.getRepairRecordList()
			this.seachRepairTaskList()
			this.getUpkeepRecordList()
			this.getInspectionRecordList()
			this.seachInspectionTaskList()
		},
		methods: {

			transformDepId(id) {
				console.log(id, 'id')
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
			changeFactory(e) {

			},
			initDate() {
				this.getDetail()
			},
			getDetail() {
				equipmentHttp.facilityDetailId(this.detailId).then((res) => {
					if (res.data.code == 200) {
						this.detail = res.data.data
					}
				});
			},
			takePhoto(index) {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'photos'],
					success: (res) => {
						console.log(res)
						let that = this
						this.uploadImgCount++;
						this.testsrcList = res
						const tempFilePaths = res.tempFilePaths
						const token = uni.getStorageSync('tokenValue'); //这里取token之前，你肯定需要先拿到token,存一下
						const tokenName = uni.getStorageSync('tokenName'); //这里取token之前，你肯定需要先拿到token,存一下
						let header = {}
						header[tokenName] = token
						uni.uploadFile({
							url: 'http://47.106.231.125:18082/fileInfo/upload', // 开发者服务器的URL
							filePath: tempFilePaths[0], // 要上传文件资源的路径
							header: header,
							name: 'file', // 文件对应的key
							formData: { // 其他要上传的参数
							},
							success: function(uploadFileRes) {
								let result = JSON.parse(uploadFileRes.data)
								if (result.code == 200) {
									that.detail.ficilityPhoto = result.data.url
									that.edit('upLoad')
								}
							},
							fail: function(uploadFileErr) {
								console.log(uploadFileErr); // 输出上传失败信息
							}
						});

					},
					fail: (err) => {
						this.uploadImgCount--;
						console.error(err)
					}
				});
			},
			imgPreview(url) {
				let arr = []
				arr.push(this.detail.ficilityPhoto)
				uni.previewImage({
					current: 0,
					urls: arr,
				});
			},
			deleteUrl() {
				this.detail.ficilityPhoto = ''
				this.edit('del')
			},
			edit(type) {
				equipmentHttp.updateFacility(this.detail).then((res) => {
					if (res.data.code == 200) {
						console.log(res.data);
						if (type == 'upLoad') {
							uni.showToast({
								title: "上传成功",
								icon: "success",
							});
						} else if (type == 'del') {
							uni.showToast({
								title: "删除成功",
								icon: "success",
							});
						}
					}
				})
			},
			getUpkeepRecordList() {
				let params = {
					equipId: this.detailId,
					startTime: moment(new Date()).format('YYYY-MM-DD'),
					// startTime: '2024-09-29',
					endTime: moment(new Date()).add(1, 'month').format('YYYY-MM-DD'),
					pageNo: 1,
					pageSize: 1000,
				};
				equipmentHttp.upkeepTaskQueryTask(params).then(res => {
					console.log(res);
					if (res.data.code == 200) {
						if (res.data.data.records.length > 0) {
							this.upkeepTaskList = res.data.data.records;
							this.nextUpkeepTaskDate = this.upkeepTaskList[0].planDate
						}
					}
				})
			},
			getRepairRecordList() {
				const self = this;
				let params = {
					// facilityState: '3',
					equipId: this.detailId,
					facilityName: this.detail.facilityName,
					// assetNumber: this.detai.assetNumber,
					pageNo: 1,
					pageSize: 1000,
				}
				equipmentHttp.equipRepairQueryRepairRecord(params).then((res) => {
					if (res.data.code == 200) {
						self.repairRecordList = res.data.data.records
					}
				});
			},
			// 维修任务台账查看能否填写
			seachRepairTaskList() {
				let params = {
					equipId: this.detailId,
					startTime: moment(new Date()).format('YYYY-MM-DD'),
					endTime: moment(new Date()).format('YYYY-MM-DD'),
					pageNo: 1,
					pageSize: 1000,
				};
				equipmentHttp.equipRepairQueryRepair(params).then(res => {
					console.log(res);
					if (res.data.code == 200) {
						this.repairTaskList = res.data.data.records;
					}
				})
			},
			// 巡检任务台账看能否填写
			seachInspectionTaskList() {
				let params = {
					equipId: this.detailId,
					startTime: moment(new Date()).format('YYYY-MM-DD'),
					endTime: moment(new Date()).add(1, 'month').format('YYYY-MM-DD'),
					pageNo: 1,
					pageSize: 1000,
				};
				equipmentHttp.inspTaskQueryTask(params).then(res => {
					console.log(res, '3333333333333');
					if (res.data.code == 200) {
						if (res.data.data.records.length > 0) {
							this.inspectionTaskList = res.data.data.records;
							console.log(this.inspectionTaskList, 'this.inspectionTaskList1111111')
							this.nextInspectionTaskDate = this.inspectionTaskList[0].planInspDate
						}
					}
				})
			},
			getInspectionRecordList() {
				let params = {
					equipId: this.detailId,
					startTime: moment(new Date()).format('YYYY-MM-DD'),
					endTime: moment(new Date()).format('YYYY-MM-DD'),
					pageNo: 1,
					pageSize: 1000,
				};
				equipmentHttp.inspTaskQueryInspRecord(params).then(res => {
					console.log(res);
					if (res.data.code == 200) {
						this.inspectionRecordList = res.data.data.records;
					}
				})
			},
			// 故障申报
			breakdownReport() {
				if (this.detail.facilityState == '3') {
					uni.showToast({
						title: "设备维修中，暂不支持故障上报",
						icon: "none",
					});
					return
				}
				uni.navigateTo({
					url: `/pages/equipment/components/breakdownReport?id=${this.detailId}&depId=${this.detail.depId}&facilityName=${this.detail.facilityName}&facilityNumber=${this.detail.facilityNumber}`,
				})
			},
			// 维修
			toRepairRecordList() {
				uni.navigateTo({
					url: `/pages/equipment/components/repairRecordList?id=${this.detailId}&facilityName=${this.detail.facilityName}&assetNumber=${this.detail.assetNumber}`,
				})
			},
			toUpkeepRecordList() {
				uni.navigateTo({
					url: `/pages/equipment/components/upkeepRecordList?id=${this.detailId}&facilityName=${this.detail.facilityName}&assetNumber=${this.detail.assetNumber}`,
				})
			},
			repairItemReport(item) {
				if (this.repairTaskList.length == 0) {
					uni.showToast({
						title: "当前无维修任务",
						icon: "none",
					});
					return
				} else {
					if (this.repairTaskList[0].status !== '10') {
						uni.showToast({
							title: "当前无维修任务",
							icon: "none",
						});
						return
					}
				}
				uni.navigateTo({
					url: `/pages/task/components/repair/report?id=${this.detailId}&name=${this.detail.facilityName}&facilityNumber=${this.detail.facilityNumber}&equipId=${this.detailId}`,
					// ${item.specificationModel}
				})
			},
			// 巡检
			toInspectionRecordList() {
				uni.navigateTo({
					url: `/pages/equipment/components/inspectionRecordList?id=${this.detailId}&facilityName=${this.detail.facilityName}&assetNumber=${this.detail.assetNumber}`,
				})
			},
			// 巡检
			inspectionReport(item) {
				if (this.nextInspectionTaskDate != this.today) {
					uni.showToast({
						title: "今日无巡检计划",
						icon: "none",
					});
					return
				}
				uni.navigateTo({
					// url: `/pages/equipment/components/inspectionReport?id=${this.detailId}&name=${this.detail.facilityName}&facilityNumber=${this.detail.facilityNumber}&equipId=${this.detailId}`,
					url: `/pages/task/index?type=xunjian`,
					// ${item.specificationModel}
				})
			},
			// 保养
			upkeepItemReport(item) {
				if (this.nextUpkeepTaskDate != this.today) {
					uni.showToast({
						title: "今日无保养计划",
						icon: "none",
					});
					return
				}
				if (this.upkeepTaskList[0].status == '0') {
					uni.showToast({
						title: "今日保养计划未分配",
						icon: "none",
					});
					return
				}
				if (this.upkeepTaskList[0].status == '90') {
					uni.showToast({
						title: "今日保养计划已完成",
						icon: "none",
					});
					return
				}
				if (this.upkeepTaskList[0].status == '100') {
					uni.showToast({
						title: "今日保养计划已关闭",
						icon: "none",
					});
					return
				}
				uni.navigateTo({
					url: `/pages/task/components/upKeep/report?id=${this.upkeepTaskList[0].id}&name=${this.upkeepTaskList[0].equipName}${this.upkeepTaskList[0].facilityNumber}&equipId=${this.upkeepTaskList[0].equipId}`,
					// ${item.specificationModel}
				})
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

	.eqStatus {
		margin: 5px 0 20px !important;
		padding: 15px 15px !important;
		box-sizing: border-box;
		z-index: 99;

		.title {
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 10px;
		}

		.status {
			text-align: center;
			font-size: 20px;
			font-weight: bold;
			margin-bottom: 10px;

			&.normal {
				color: #3ac952 !important;
			}

			&.repair {
				color: #fbb03b !important;
			}

			&.standby {
				color: #dcdcdf !important;
			}
		}

		.updateTime {
			text-align: center;
			font-size: 14px;
		}

		.detailRow {
			display: flex;
			flex-direction: row;

			.detailRowItem {
				flex: 1;
				font-size: 13px;
				display: flex;
				flex-direction: row;

				.itemTitle {
					padding-right: 10px;
					line-height: 2;
					color: #999;
					white-space: nowrap;
				}

				.itemContent {
					line-height: 2;
					color: #666;
				}
			}
		}

		.oprations {
			.oprationsItem {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 1px solid #ffeeee;
				padding: 15px 0;

				.oprateType {
					display: flex;
					flex-direction: row;
					margin-bottom: 5px;

					.name {
						font-size: 18px;
						font-weight: bold
					}
				}

				.btn {
					width: 72px;
					height: 32px;
					background: #ff575c;
					color: #fff;
					line-height: 32px;
					text-align: center;
					border-radius: 16px;
				}
			}
		}

		.photo {
			display: flex;
			flex-direction: row;
			justify-content: center;
			flex-wrap: wrap;
		}

		.takePhoto {
			width: 200px;
			height: 150px;
			border: 1px solid #ddd;
			border-radius: 6px;
			text-align: center;
			padding-top: 48px;
			box-sizing: border-box;
			margin: 10px 0;
			position: relative;
			text-align: center;

			.takePhotoTip {
				font-size: 16px;
				color: #ccc;
			}

			.deleteIcon {
				width: 20px;
				height: 20px;
				line-height: ;
				background: #fff;
				border-radius: 50%;
				position: absolute;
				right: -5px;
				top: -5px;
			}
		}
	}
</style>