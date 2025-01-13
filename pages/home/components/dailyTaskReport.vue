<template>
	<view class="content">
		<view class="header">
			<view class="headerGoBack" @click="goBack">
				<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
				<view class="" style="color: #333;">
					日常任务
				</view>
			</view>
		</view>
		<!-- {{reportTaskDataList}} -->
		<view class="container" :style="{height: swiperWidth + 'px'}">
			<scroll-view :style="{height: swiperWidth + 'px'}" scroll-y="true" :show-scrollbar='false' class="eqList">
				<view class="eqListItem" :class="index == currentIndex ? 'active' : ''"
					v-for="(item, index) in reportTaskDataList" :key="item.id" @click="switchItem(index)">
					<div class="reportLabel" :class="item.isCheck ? 'active' : ''">
						<p>{{ item.reportDate }}</p>
						<p>{{ item.userName }}</p>
					</div>
				</view>
			</scroll-view>
			<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar='false' class="eqReport"
				v-if="reportTaskDataList.length > 0">

				<view class="eqReportItem" v-for="(item, index) in reportTaskDataList" :key="index"
					v-show="index == currentIndex">

					<view class="eqReportItem">
						<view class="title" style="margin: 10px 0;">
							任务内容
						</view>
						<textarea class="contentTextarea" v-model="item.taskContent" style="height: 72px;"
							placeholder-style="color:#aaa" placeholder="" disabled />
					</view>

					<view class="eqReportItem">
						<view class="title" style="margin: 10px 0;">
							完成情况
						</view>
						<textarea class="contentTextarea" v-model="item.content" style="height: 72px;"
							placeholder-style="color:#aaa" placeholder="请输入" />
					</view>
					<view class="eqReportItem">
						<view class="title" style="margin-bottom: 10px;">
							现场图片
						</view>
						<view class="photo">
							<view class="takePhoto" style="padding: 0;" v-for="(m, n) in item.fileList">
								<!-- {{item.tempFilePaths[0]}} -->
								<image style="width: 68px; height: 68px;" :mode="'aspectFit'" :src="m.url"
									@click="imgPreview(m.url, item.fileList)"></image>
								<view class="deleteIcon" v-show="status == '10'">
									<uni-icons @click="deleteUrl(m, index)" type="clear" size="30" color="#ff575c"
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
		<!-- <scroll-view scroll-y="true" :style="{height: swiperWidth + 'px'}">
			<view class="container">
				<uni-forms ref="form" :modelValue="formData" label-width="200px" label-position="top" :rules="rules">
					<uni-forms-item label="任务内容" required name="taskContent">
						<textarea class="contentTextarea" v-model="formData.taskContent" style="height: 72px;"
							placeholder-style="color:#aaa" placeholder="请输入" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</scroll-view> -->
		<view class="footer">
			<view class="btn" @click="submit">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import taskHttp from '../../../api/task.js'
	import {
		nextTick
	} from 'vue'
	export default {
		data() {
			return {
				pageHeight: 0,
				swiperWidth: 0,
				username: uni.getStorageSync('username'),
				realName: uni.getStorageSync('realName'),
				phone: uni.getStorageSync('phone'),
				roleIds: uni.getStorageSync('roleIds'),
				roleNames: uni.getStorageSync('roleNames'),
				userDepId: uni.getStorageSync('depId'),
				formData: {
					id: '',
					taskContent: '',
				},
				reportTaskDataList: [],
				currentReportTaskDataItem: {},
				currentIndex: 0,
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.formData.id = options.id
			this.reportTask()
		},
		watch: {},
		mounted() {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 150
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

			reportTask() {
				let self = this
				taskHttp.dailyTaskReportDailyTaskDetail(this.formData).then(res => {
					if (res.data.code == "200") {
						console.log(res.data.data, "res.data.data");
						if (res.data.code == 200) {
							self.reportTaskDataList = []
							const uploadTasks = res.data.data.map((m, n) => {
								console.log(m, n, '1111111----------')
								
										m.fileUrlList = [];
										m.fileList = [];
								self.reportTaskDataList.push(m)
								if(m.imageIds) {
									return new Promise((resolve, reject) => {
										taskHttp.fileInfoGetByIds(
											m.imageIds
										).then(res => {
											if(res){
												resolve(res.data)
											}
										})
									})
								}
								
							})
							Promise.all(uploadTasks)
								.then((res) => {
									let self = this
									console.log(res, 'res')
									res.forEach((item, index) => {
										console.log(self.reportTaskDataList)
										self.reportTaskDataList[index].fileUrlList = item.data
										self.reportTaskDataList[index].fileList = item.data
									})
								})
								.catch((err) => {
									console.log('上传失败', err)
									// 上传失败后的操作
								})
							
						console.log(self.reportTaskDataList, 'llllll')
						}
					}
				})
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
			submit() {

				let msgReportNoFinish = 0;
				let msgReportNoFinishList = [];
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
				});

				if (msgReportNoFinish > 0) {
					console.log("每天完");
					let msgText = msgReportNoFinishList.join("\n");
					uni.showToast({
						title: msgText,
						icon: "none",
					});
					return;
				}
				let params = {
					id: this.formData.id,
					detailList: this.reportTaskDataList,
					inspContent: ''
				};
				taskHttp.dailyTaskReportDailyTask(params).then(res => {
					if (res.data.code == "200") {
						uni.showToast({
							title: '提交成功',
							icon: "success",
						});
						this.goBack();
					} else {
						uni.showToast({
							title: '提交失败',
							icon: "error",
						});
					}
				})

			}
		},
	}
</script>
<style lang="less">
	.content {
		width: 100%;
		height: 100%;
		position: relative;
		box-sizing: border-box;
		padding: 80px 0 40px;

		.header {
			height: 80px;
			position: absolute;
			top: 0px;
			width: 100%;
			padding-top: 30px;
			box-sizing: border-box;
			border-bottom: 1px solid #ffeeee;

			.headerGoBack {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #ff575c;
				font-size: 18px;
				line-height: 50px;
				padding: 0px 0px 5px 10px
			}
		}

		.container {
			flex: 1;

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

		.footer {
			border-top: 1px solid #ffeeee;
			height: 70px;
			position: absolute;
			bottom: 0px;
			width: 100%;
			box-sizing: border-box;
			padding: 15px 15px;
			display: flex;
			flex-direction: row;

			.btn {
				flex: 1;
				height: 40px;
				border-radius: 20px;
				background: #ff575c;
				color: #fff;
				text-align: center;
				line-height: 40px;
				margin: 0 10px;

				&.act {
					background: #ffeeee;
					color: #ff575c;
				}
			}
		}
	}

	.time {
		width: 100%;
		display: flex;
		flex-direction: column;

		.timeItem {

			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.uni-input {
		background: #f6f6f6;
		padding: 10px;
		border-radius: 6px;
	}

	.uni-label-pointer {
		margin-right: 10px;
		margin-bottom: 10px !important;
	}

	.uni-checkbox-input {
		width: 16px;
		height: 16px;
		margin: 5px;
		border: 1px solid #ff575c !important;
	}

	.container {
		flex: 1;
		display: flex;
		flex-direction: row;
		min-height: 0;
		padding: 0;

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