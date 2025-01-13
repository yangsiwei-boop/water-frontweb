<template>
	<view class="content">
		<uni-section title="">
			<view class="reportDetail" :style="{height: swiperWidth + 'px'}">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						详情
					</view>
				</view>
				<view class="container">
					<view class="acceptItem">
						<text class="labelName">
							巡检级别：
						</text>
						<text class="text">
							{{itemLevelName}}
						</text>
					</view>
					<view class="acceptItem">
						<text class="labelName">
							巡检日期：
						</text>
						<text class="text">
							{{inspDateApp}}
						</text>
					</view>
					<view class="acceptItem">
						<text class="labelName">
							巡检人：
						</text>
						<text class="text">
							{{inspUser}}
						</text>
					</view>
					<view class="acceptDetail">
						<text class="labelName">
							巡检项目
						</text>
						<view class="detail">
							<view class="upKeepContentItem" v-for="(value, key) in itemLevelInfo" :key="key">
								<view class="itemTitle">
									{{key}}:
								</view>
								<view class="itemContent">
									{{value}}
								</view>
							</view>
							
							<view class="upKeepContentItem">
								<view class="itemTitle">
									图片: 
								</view>
								
								<view class="itemContent">
									<view class="photo">
										<view class="takePhoto" style="padding: 0;" v-for="(m, n) in fileList">
											<image style="width: 68px; height: 68px;" :mode="'aspectFit'" :src="m.url"
												@click="imgPreview(m.url)"></image>
										</view>
									</view>
								</view>
								
							</view>
						</view>
						
						<view class="inspectionContent" style="margin-top: 15px;">
							<textarea class="contentTextarea" placeholder-style="color:#aaa" placeholder="请填写巡检内容" />
						</view>
					</view>
					
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
				fileList: [],
				uploadImgCount: 0,

				itemLevelName: '',
				inspDateApp: '',
				imageIds: '',
				itemLevelInfo: '',
				inspUser: ''
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.itemLevelName = options.itemLevelName
			this.inspDateApp = options.inspDateApp
			this.inspUser = options.inspUser
			this.itemLevelInfo = JSON.parse(options.itemLevelInfo)
			this.imageIds = options.imageIds
			if (this.imageIds !== "" && this.imageIds !== null) {
				taskHttp.fileInfoGetByIds(
					this.imageIds
				).then(rsp => {
					this.fileList = rsp.data.data;
					console.log(this.fileList, "item.fileUrlList");
				})
			}
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
				        uni.$emit('update',{msg:'页面更新'})
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
			acceptApprove(type){
				let params = {
				        ids: this.formData.id,
				        result: type,
				        remark: this.mark,
				    };
				    taskHttp.upkeepTaskBatchAcceptance(params).then(res => {
						if (res.data.code == 200) {
						    console.log(res.data.data);
							uni.showToast({
								title: "验收成功",
								icon: "success",
							});
							this.goBack()
						} else {
							uni.showToast({
								title: res.data.data.msg,
								icon: "error",
							});
						}
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
		.detail{
			border: 1px solid #ffeeee;
			border-radius: 4px;
			padding: 10px;
			flex: 1;
			.upKeepContentItem{
				display: flex;
				flex-direction: row;
				.itemTitle{
					padding-right: 10px;
						line-height: 2;
						color: #999;
						white-space: nowrap;
				}
				.itemContent{
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
</style>