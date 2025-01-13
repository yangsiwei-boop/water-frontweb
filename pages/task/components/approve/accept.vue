<template>
	<view class="content">
		<uni-section title="">
			<view class="reportDetail" :style="{height: swiperWidth + 'px'}">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						{{type == 'accept' ? '审核' : '详情' }}
					</view>
				</view>
				<view class="container">
					<view class="acceptItem">
						<text class="labelName">
							提交类型：
						</text>
						<text class="text">
							{{transformDataType(dataType)}}
						</text>
					</view>
					<view class="acceptItem">
						<text class="labelName">
							数据类型：
						</text>
						<text class="text">
							{{transformAuditType(auditType)}}
						</text>
					</view>
					<view class="acceptItem">
						<text class="labelName">
							提交人：
						</text>
						<text class="text">
							{{username}}
						</text>
					</view>
					<view class="acceptItem">
						<text class="labelName">
							提交时间：
						</text>
						<text class="text">
							{{createTime}}
						</text>
					</view>
					<view class="acceptItem">
						<text class="labelName">
							审核结果：
						</text>
						<text class="text">
							{{auditStatus == '0' ? '审核通过' : '审核不通过'}}
						</text>
					</view>
					<view class="acceptItem">
						<text class="labelName">
							审核意见：
						</text>
						<text class="text">
							{{auditMsg == 'null' ? '' : auditMsg}}
						</text>
					</view>
					<view class="acceptDetail">
						<text class="labelName">
							详情
						</text>
						<view class="detail">
							<view class="excelView" @click="excelView(fileName, dataType)" v-if="dataType =='2'">
								<image style="width: 36px; height: 36px;margin-bottom: 10px;" :mode="'aspectFit'"
									src="../../../../static/images/excel.png"></image>
								<text style="margin-left: 4px;">{{fileName}}</text>
							</view>
							<view class="excelView" @click="excelView(fileName, dataType)" v-if="dataType =='1'">
								<image style="width: 36px; height: 36px;margin-bottom: 10px;" :mode="'aspectFit'"
									src="../../../../static/images/preview.png"></image>
								<text style="margin-left: 4px;">手工录入数据</text>
							</view>
						</view>

						<view class="inspectionContent" style="margin-top: 15px;" v-if="type == 'accept'">
							<textarea class="contentTextarea" placeholder-style="color:#aaa" placeholder="请填写审核意见" />
						</view>
					</view>

				</view>
				<view class="footer" v-if="type == 'accept'">
					<button class="footerBtn" type="primary" @click="acceptApprove('验收不通过')">不通过</button>
					<button class="footerBtn" type="primary" @click="acceptApprove('验收通过')">通过</button>
				</view>
			</view>

		</uni-section>

	</view>
</template>

<script>
	import taskHttp from '../../../../api/task.js'
	export default {
		data() {
			return {
				options: [],
				buttonGroup: [{
					text: '提交',
					backgroundColor: '#ff0000',
					color: '#fff'
				}],
				pageHeight: 0,
				swiperWidth: 0,
				reportTaskDataList: [],
				currentReportTaskDataItem: {},
				currentIndex: 0,
				checkboxList: [{
						value: '正常',
						name: '正常',
						checked: 'false'
					},
					{
						value: '异常',
						name: '异常',
						checked: 'false'
					}
				],
				fileList: [],
				uploadImgCount: 0,
				currentTaskId: '',
				auditType: '',
				dataType: '',
				username: '',
				createTime: '',
				fileName: '',
				filePath: '',
				auditStatus: '',
				auditMsg: '',
				tableData: [],
				type: ''
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.currentTaskId = options.id
			this.type = options.type
			this.auditType = options.auditType
			this.dataType = options.dataType
			this.username = options.username
			this.createTime = decodeURIComponent(options.createTime)
			this.fileName = decodeURIComponent(options.fileName)
			this.filePath = decodeURIComponent(options.filePath)
			this.auditStatus = decodeURIComponent(options.auditStatus)
			this.auditMsg = decodeURIComponent(options.auditMsg)
			// if (this.dataType == '1') {
			// 	this.queryWaterDetail()
			// }
		},
		mounted() {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 28
		},
		methods: {
			radioChange: function(evt, index, key) {
				this.reportTaskDataList[index]['items'][key] = evt.detail.value;
				console.log('11111', evt.detail.value, index, key, this.reportTaskDataList[this.currentIndex]['items'])
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				if (e.index == '0') {
					this.submit()
				}
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
			imgPreview(url) {
				let arr = []
				this.fileList.forEach((item, index) => {
					if (item) {
						arr.push(item.url)
					}
				})
				let index = arr.findIndex(value => value == url)
				console.log(arr, index, '222222')
				uni.previewImage({
					current: index,
					urls: arr,
				});
			},
			acceptApprove(type) {
				let params = {
					id: this.currentTaskId,
					auditStatus: type == '验收不通过' ? '-1' : '1',
					remark: this.mark,
				};
				taskHttp.auditData(params).then(res => {
					if (res.data.code == 200) {
						console.log(res.data.data);
						uni.showToast({
							title: type,
							icon: type == '验收不通过' ? 'error' : 'success',
						});
						this.goBack()
					} else {
						uni.showToast({
							title: res.data.data.msg,
							icon: "error",
						});
					}
				})

			},

			transformDataType(id) {
				console.log(id, 'id2222')
				return id == "1" ?
					"手工录入" :
					"文件上传";
			},
			transformAuditType(id) {
				console.log(id, 'id33333')
				return id == 1 ?
					"生产数据" :
					id == 2 ?
					"化验数据" :
					"工艺数据"
			},
			excelView(fileName, dataType) {
				uni.showLoading({
					title: '加载中'
				})
				if (dataType == '2') {
					// /home/waterFile/城南水量数据20241203164800.xls
					console.log('城南水量数据20241203164800.xls')
					let encodedUrl = `http://47.106.144.138/waterFile/${encodeURIComponent(fileName)}`;
					console.log(encodedUrl, 'encodedUrl')
					uni.downloadFile({
						url: decodeURIComponent(encodedUrl), //后端返回的文件地址
						success: function(res) {
							if (res.statusCode === 200) {
								uni.openDocument({
									filePath: res.tempFilePath,
									success: function(res) {
										console.log(res, '打开文件成功')
									},
									fail: (err) => {
										uni.showToast({
											title: '打开文件失败请重试',
											icon: 'none'
										})
									}
								});
							} else {
								uni.showToast({
									title: '打开文件失败请重试',
									icon: 'none'
								})
							}
							uni.hideLoading()
						},
						fail: (err) => {
							uni.hideLoading()
							uni.showToast({
								title: '加载失败请重试',
								icon: "none"
							})
						}
					})
				} else {
					let encodedUrl = `http://47.106.144.138/audit/queryCraftExcel/${this.currentTaskId}`;
					console.log(encodedUrl, 'encodedUrl')
					uni.downloadFile({
						url: decodeURIComponent(encodedUrl), //后端返回的文件地址
						success: function(res) {
							if (res.statusCode === 200) {
								uni.openDocument({
									filePath: res.tempFilePath,
									success: function(res) {
										console.log(res, '打开文件成功')
									},
									fail: (err) => {
										uni.showToast({
											title: '打开文件失败请重试',
											icon: 'none'
										})
									}
								});
							} else {
								uni.showToast({
									title: '打开文件失败请重试',
									icon: 'none'
								})
							}
							uni.hideLoading()
						},
						fail: (err) => {
							uni.hideLoading()
							uni.showToast({
								title: '加载失败请重试',
								icon: "none"
							})
						}
					})
				}
			},
			queryWaterDetail() {
				console.log(this.auditType, 'auditType')
				let http =
					this.auditType == "1" ?
					"queryWaterDetail" :
					this.auditType == "2" ?
					"queryAssayDetail" :
					"queryCraftDetail";
				taskHttp[http](this.currentTaskId).then(res => {
					if (res.data.code == 200) {
						console.log(res.data.data, 'queryWaterDetail');
						this.tableData = res.data.data
					} else {}
				})
			}
		}
	}
</script>

<style lang="less">
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

	.reportDetail .container {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
		padding: 0 15px;

		.upKeepContentItem {

			.title {
				margin-bottom: 4px;
			}

			.contentTextarea {
				height: 50px;
				background: #f6f6f6;
				border-radius: 6px;
				padding: 8px;
				box-sizing: border-box;
				width: 100%;
				color: #666;
				font-size: 12px;
			}
		}
	}

	.photo {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.takePhoto {
		width: 70px;
		height: 70px;
		border: 1px solid #ddd;
		border-radius: 6px;
		text-align: center;
		padding-top: 8px;
		box-sizing: border-box;
		margin-right: 10px;
		margin-bottom: 10px;
		position: relative;

		.takePhotoTip {
			font-size: 10px;
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

	.footer {
		display: flex;
		flex-direction: row;
		padding: 5px;

		.footerBtn {
			height: 40px;
			line-height: 40px;
			width: 50%;
			margin: 5px;
			border-radius: 20px;
			font-size: 14px;
			background: #ff575c !important;
		}
	}

	.acceptItem {
		line-height: 3;
		border-bottom: 1px solid #ffeeee;
		padding: 0 5px;

		.labelName {
			color: #999;
		}

		.text {
			color: #333;
		}
	}

	.acceptDetail {
		.labelName {
			line-height: 3;
			padding: 0 5px;
			color: #999;
		}

		.detail {
			border: 1px solid #ffeeee;
			border-radius: 4px;
			padding: 10px;
			flex: 1;

			.excelView {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.upKeepContentItem {
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
	}

	.inspectionContent .contentTextarea {
		height: 60px;
		background: #f6f6f6;
		border-radius: 6px;
		padding: 8px;
		box-sizing: border-box;
		width: 100%;
		color: #666;
		font-size: 12px;
	}

	.uni-table-th {
		padding: 2px !important;
		width: 36px !important;
	}

	.ni-table-td {
		padding: 2px !important;
		width: 36px !important;
	}

	.uni-table {
		min-width: 336px !important;
		font-size: 10px !important;
	}

	.uni-table-th-content {
		font-size: 10px !important;
	}

	.uni-table-td {
		font-size: 10px !important;
		padding: 2px !important;
	}
</style>