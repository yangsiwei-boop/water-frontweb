<template>
	<view class="content">
		<uni-section title="">
			<view class="reportDetail" :style="{height: swiperWidth + 'px'}">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						{{currentTaskName}}
					</view>
				</view>
				<view class="search">
					<uni-search-bar placeholder="请输入设备名称" bgColor="#ffeeee" @confirm="search" />

				</view>
				<view class="container">
					<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar='false' class="eqList">
						<view class="eqListItem" :class="index == currentIndex ? 'active' : ''"
							v-for="(item, index) in reportTaskDataList" :key="item.id" @click="switchItem(index)">
							<div class="reportLabel" :class="item.isCheck ? 'active' : ''">
								<p>{{ item.inspectionLevel }}巡检</p>
							</div>
						</view>
					</scroll-view>
					<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar='false' class="eqReport"
						v-if="reportTaskDataList.length > 0">

						<view class="eqReportItem" v-for="(item, index) in reportTaskDataList" :key="index"
							v-show="index == currentIndex">
							<view class="eqReportItem" v-for="(value, key) in item.items" :key="key">
								<view class="title">
									{{key}}
								</view>
								<radio-group @change="(e) => {radioChange(e, index, key)}">
									<label v-for="(m, t) in checkboxList" :key="m.value">
										<radio :value="m.value" :checked="m.value == value" color="#ff575c"
											style="transform:scale(0.7);" />
										<text style="margin-right: 20px;text-align: left;">{{m.name}}</text>
									</label>
								</radio-group>
							</view>
							<view class="eqReportItem">
								<view class="title" style="margin-bottom: 10px;">
									现场图片
									<!-- <text style="font-size: 10px;"> (最多上传3张图片)</text> -->
								</view>
								<view class="photo">
									<view class="takePhoto" style="padding: 0;" v-for="(m, n) in item.fileList">
										<!-- {{item.tempFilePaths[0]}} -->
										<image style="width: 68px; height: 68px;" :mode="'aspectFit'" :src="m.url"
											@click="imgPreview(m.url, item.fileList)"></image>
										<view class="deleteIcon" v-show="status == '10'">
											<uni-icons @click="deleteUrl(m, index)" type="clear" size="30"
												color="#ff575c"
												style="position:absolute;left: -5px;top: -5px;"></uni-icons>
										</view>
									</view>
									<!-- {{item.fileList}} -->
									<view class="takePhoto" v-show="item.fileList.length < 3" @click="takePhoto(index)">
										<uni-icons type="camera-filled" size="30" :style="{color: '#ccc'}"></uni-icons>
										<view class="takePhotoTip">
											拍照上传
										</view>
									</view>
									<!-- <button type="primary">拍照</button>
								{{srcList}} -->
								</view>
							</view>

						</view>
					</scroll-view>
				</view>
				<view class="inspectionContent" style="margin: 10px;">
					<textarea v-model="inspContent" class="contentTextarea" placeholder-style="color:#aaa"
						placeholder="请填写巡检内容" />
				</view>
				<view class="footer">
					<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
						@buttonClick="buttonClick" />
				</view>
			</view>

		</uni-section>

	</view>
</template>

<script>
	import taskHttp from '../../../api/task.js'
	import equipmentHttp from '../../../api/equipment.js'
	import moment from 'moment/moment.js'
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
				currentTaskId: '',
				currentTaskName: '',
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
				srcList: [],
				testsrcList: [],
				status: '',
				inspContent: '',
				inspectionTaskList: ''
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.currentTaskId = options.id
			this.currentTaskName = options.name
			this.status = options.status
		},
		mounted() {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 28
			this.search()
		},
		methods: {
			radioChange: function(evt, index, key) {
				this.reportTaskDataList[index]['items'][key] = evt.detail.value;
				console.log('11111', evt.detail.value, index, key, this.reportTaskDataList[this.currentIndex]['items'])
				// for (let i = 0; i < this.checkboxList.length; i++) {
				// 	if (this.checkboxList[i].value === evt.detail.value) {
				// 		break;
				// 	}
				// }
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				// this.options[2].info++
				if (e.index == '0') {
					this.reportTaskConfirm()
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
			search() {
				let self = this
				let params = {
					equipId: this.currentTaskId,
					startTime: moment(new Date()).format('YYYY-MM-DD'),
					endTime: moment(new Date()).format('YYYY-MM-DD'),
					pageNo: 1,
					pageSize: 1000,
				};
				equipmentHttp.inspTaskQueryTask(params).then(res => {
					if (res.data.code == 200) {
						self.reportTaskDataList = []
						res.data.data.records.forEach((item) => {
							equipmentHttp.inspTaskQueryItems(item).then(result => {
								result.data.data.forEach((m) => {
									m.taskId = item.id
									m.inspectionLevel = item.inspectionLevel
									m.fileList = [];
									if (m.imageIds && m.imageIds !== "" && m
										.imageIds !== null) {
										taskHttp.fileInfoGetByIds(
											m.imageIds
										).then(rsp => {
											m.fileUrlList = rsp.data.data;
											m.fileList = rsp.data.data;
											console.log(m, "item.fileUrlList");
										})
									}
									self.reportTaskDataList.push(m)
								})
							})
						})
					}
				});
			},
			switchItem(index) {
				console.log(index, '2222')
				this.currentIndex = index
			},
			takePhoto(index) {
				uni.chooseImage({
					count: 3,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'photos'],
					success: (res) => {
						console.log(res)
						let that = this
						this.testsrcList = res
						const tempFilePaths = res.tempFilePaths
						const token = uni.getStorageSync('tokenValue'); //这里取token之前，你肯定需要先拿到token,存一下
						const tokenName = uni.getStorageSync('tokenName'); //这里取token之前，你肯定需要先拿到token,存一下
						let header = {}
						header[tokenName] = token
						const uploadTasks = tempFilePaths.map((file, ind) => {
							return new Promise((resolve, reject) => {
								const uploadTask = uni.uploadFile({
									url: 'http://47.106.231.125:18082/fileInfo/upload', // 接口地址
									filePath: file, // 临时文件路径
									name: 'file', // 服务器接收的文件字段名(这个地方很重要要和后端沟通一下)
									header: header,
									formData: {
										// 可以在这里添加额外的formData参数
									},
									success: function(res) {
										resolve(res.data)
									},
									fail: function(err) {
										reject(err)
									},
								})
							})
						})

						Promise.all(uploadTasks)
							.then((res) => {
								let self = this
									res.forEach(item => {
										let itemObj = JSON.parse(item)
										self.reportTaskDataList[index].fileList.push({
											fileName: itemObj.data.fileName,
											url: itemObj.data.url,
											id: itemObj.data.id,
										})
									})
							})
							.catch((err) => {
								console.log('上传失败', err)
								// 上传失败后的操作
							})

					},
					fail: (err) => {
						console.error(err)
					}
				});
			},
			reportTaskConfirm() {
				this.reportTaskDataList.forEach((item) => {
					item.equipmentId = item.id;
					let imgids = [];
					if (item.fileList.length > 0) {
						item.fileList.forEach((m) => {
							imgids.push(m.id);
						});
						item.imageIds = imgids.join(",");
					} else {
						item.imageIds = "";
					}
					let reportTaskDataList = []
					reportTaskDataList.push(item)
					console.log()
					let params = {
						id: item.taskId,
						detailList: reportTaskDataList,
					};
					taskHttp.inspTaskReportTask(params).then(res => {
						if (res.data.code == "200") {
							uni.showToast({
								title: "提交成功",
								icon: "success",
							});
							this.goBack()
						} else {
							uni.showToast({
								title: "提交失败",
								icon: "error",
							});
						}
					})
				});


			},
			saveTaskConfirm() {
				this.reportTaskDataList.forEach((item) => {
					item.equipmentId = item.id;
				});
				if (this.inspContent == '') {
					uni.showToast({
						title: "请填写巡检内容",
						icon: "error",
					});
				}
				let params = {
					id: this.currentTaskId,
					detailList: this.reportTaskDataList,
					inspContent: this.inspContent
				};
				taskHttp.inspTaskSaveTask(params).then(res => {
					if (res.data.code == "200") {
						uni.showToast({
							title: "保存成功",
							icon: "success",
						});
						this.goBack()
					} else {
						uni.showToast({
							title: "保存失败",
							icon: "error",
						});
					}
				})

			},

			deleteUrl(uploadFile, index) {
				this.reportTaskDataList[index].fileList.forEach((m, n) => {
					if (uploadFile.id == m.id) {
						this.reportTaskDataList[index].fileList.splice(n, 1);
					}
				})
			},
			imgPreview(url, fileList) {
				let arr = []
				fileList.forEach((item, index) => {
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
		flex-direction: row;
		min-height: 0;

		.eqList {
			width: 35%;
			background: #ffeeee;

			.eqListItem {
				background: #ffeeee;
				padding: 10px 0;

				&.active {
					background: #fff;
					font-weight: bold;

					.reportLabel {
						font-size: 14px !important;
					}
				}
			}

			.reportLabel {
				text-align: center;
				color: #ff575c;
				font-size: 12px;

				&.active {
					color: #999;
				}
			}
		}

		.eqReport {
			width: 65%;

			.eqReportItem {
				padding: 0 10px;
				margin-bottom: 20px;

				.title {
					color: #ff575c;

				}
			}
		}
	}

	.inspectionContent .contentTextarea {
		height: 48px;
		background: #f6f6f6;
		border-radius: 6px;
		padding: 8px;
		box-sizing: border-box;
		width: 100%;
		color: #666;
		font-size: 12px;
	}

	/deep/ .uni-radio-input {
		border-radius: 4px !important;
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
</style>