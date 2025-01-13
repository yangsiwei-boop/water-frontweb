<template>
	<view class="content">
		<uni-section title="">
			<view class="reportDetail" :style="{height: swiperWidth + 'px'}">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						{{facilityName}}{{facilityNumber}}
					</view>
				</view>
				<view class="container">
					<uni-forms ref="form" :modelValue="formData" label-width="120px" label-position="top"
						:rules="rules">
						<uni-forms-item label="故障描述" required name="failureDesc" class="upKeepContentItem">
							<textarea class="contentTextarea" v-model="formData.failureDesc" style="height: 72px;"
								placeholder-style="color:#aaa" placeholder="请填写故障描述" />
						</uni-forms-item>
					</uni-forms>
					<view class="upKeepContentItem">
						<view class="title">
							图片
						</view>
						<view class="photo">
							<view class="takePhoto" style="padding: 0;" v-for="(m, n) in fileList">
								<image style="width: 68px; height: 68px;" :mode="'aspectFit'" :src="m.url"
									@click="imgPreview(m.url)"></image>
								<view class="deleteIcon">
									<uni-icons @click="deleteUrl(m, n)" type="clear" size="30" color="#ff575c"
										style="position:absolute;left: -5px;top: -5px;"></uni-icons>
								</view>
							</view>
							<view class="takePhoto" v-show="fileList.length < 3" @click="takePhoto(index)">
								<uni-icons type="camera-filled" size="30" :style="{color: '#ccc'}"></uni-icons>
								<view class="takePhotoTip">
									拍照上传
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="footer">
					<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup"
						@buttonClick="buttonClick" />
				</view>
			</view>

		</uni-section>

	</view>
</template>

<script>
	import taskHttp from '../../../api/task.js'
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
				fileList: [],
				facilityName: '',
				facilityNumber: '',
				uploadImgCount: 0,
				formData: {
					equipmentId: '',
					id: '',
					failureDesc: '',
					imageIds: ''
				},
				rules: {
					failureDesc: {
						rules: [{
							required: true,
							errorMessage: '请输入故障描述',
						}]
					},
				},
				depId: '',
				groupList: []
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.formData.id = options.id
			this.depId = options.depId
			this.facilityName = options.facilityName
			this.facilityNumber = options.facilityNumber
		},
		mounted() {
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 28
			this.getWorkteamsQueryWorkTeams()
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		methods: {
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
			takePhoto(index) {
				uni.chooseImage({
					count: 3,
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
						const uploadTasks = tempFilePaths.map((file, index) => {
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
								console.log('上传成功', JSON.parse(item))
									self.fileList.push({
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

			getWorkteamsQueryWorkTeams() {
				let self = this
				let params = {
					depId: this.depId,
					pageNo: 1,
					pageSize: 10000,
				};
				taskHttp.workteamsQueryWorkTeams(params).then(res => {

					if (res.data.code == 200) {
						res.data.data.records.forEach((item) => {
							item.text = item.teamName;
							item.value = item.id;
						});
						self.groupList = res.data.data.records;
					}
				})
			},
			submit(form) {
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
					this.fileList.forEach((item) => {
						let imgids = [];
						if (this.fileList.length > 0) {
							this.fileList.forEach((m) => {
								imgids.push(m.id);
							});
							this.formData.imageIds = imgids.join(",");
						} else {
							this.formData.imageIds = "";
						}
					});
					let params = {
						failureImageIds: this.formData.imageIds,
						equipId: this.formData.id,
						nextUser: '',
						failureDesc: this.formData.failureDesc,
					}
					taskHttp.equipRepairConvertRepair(params).then((res) => {
						if (res.data.code == "200") {
							uni.showToast({
								title: "填报成功",
								icon: "success",
							});
							this.goBack()
						} else {
							uni.showToast({
								title: "填报失败",
								icon: "error",
							});
						}
					});

				}).catch(err => {})
			},

			deleteUrl(uploadFile, index) {
				this.fileList.forEach((m, n) => {
					if (uploadFile.id == m.id) {
						this.fileList.splice(n, 1);
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

	.uni-select {
		background: #f6f6f6;
		border: none !important;
	}
</style>