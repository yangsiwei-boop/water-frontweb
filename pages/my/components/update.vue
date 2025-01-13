<template>
	<view class="content">
		<uni-section title="">
			<view class="reportDetail">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						版本更新
					</view>
				</view>
			</view>
		</uni-section>
		<view class="content">
			<scroll-view scroll-y="true" :show-scrollbar='false' :style="{height: swiperWidth + 'px'}">
				<view class="">
					当前版本V1.1
				</view>
				<view class="">
					已有新版本V2.0
				</view>
				
				<view class="" style="margin-top: 20px;">
					V2.0主要更新
				</view>
				<view class="">
					<view class="">
						1.修复了一些已知问题
					</view>
					<view class="">
						1.增加了一些新功能
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="btn">
			立即更新
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageHeight: 0,
				swiperWidth: 0
			}
		},
		onLoad(options) {},
		mounted() {

			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 258
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

	.content {
		padding: 10px 10px 0;
		font-size: 16px;
		line-height: 2;
	}

	.btn {
		margin: 72px 20px 0;
		height: 48px;
		background: #ff575c;
		border-radius: 24px;
		color: #fff;
		text-align: center;
		line-height: 48px;
		font-size: 16px;
		font-weight: bold;
	}
</style>