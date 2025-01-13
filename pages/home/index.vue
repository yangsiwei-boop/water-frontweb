<template>
	<view class="content">

		<uni-section title="">
			<uni-nav-bar class="navBar mtBoderd" leftWidth="0rpx" :border="false">
				<template #right>
					<view class="navBarIconMsg" slot="right">
						<!-- <image src="../../static/images/PC.png"></image> -->
						<image src="../../static/images/msg-read.png"></image>
						<!-- <image src="../../static/images/msg-unread.png"></image> -->
					</view>
				</template>
			</uni-nav-bar>

		</uni-section>

		<scroll-view scroll-y="true" :style="{height : swiperWidth + 'px'}">
			<div class="homeList">
				<div class="itemContent">
					<div class="itemContentTitle">生产运行</div>
					<div class="itemContentEntrance">
						<div class="entrance" @click="toPage('renwu')">
							<image :mode="'aspectFit'" src="../../static/images/renwu.png"></image>
							<div class="entranceName">任务</div>
						</div>
						<div class="entrance border_left_none" @click="toPage('')">
							<image :mode="'aspectFit'" src="../../static/images/luxian.png"></image>
							<div class="entranceName">巡检路线</div>
						</div>
						<div class="entrance border_left_none" @click="toPage('jiaojieban')">
							<image :mode="'aspectFit'" src="../../static/images/jiaoban.png"></image>
							<div class="entranceName">交接班</div>
						</div>
						<div class="entrance border_top_none" @click="toPage('paiban')">
							<image :mode="'aspectFit'" src="../../static/images/paiban.png"></image>
							<div class="entranceName">排班表</div>
						</div>
						<div class="entrance border_left_none" @click="toPage('')">
							<image :mode="'aspectFit'" src="../../static/images/wurenji.png"></image>
							<div class="entranceName">无人机巡检</div>
						</div>
					</div>
				</div>
				<div class="itemContent">
					<div class="itemContentTitle">化验检验</div>
					<div class="itemContentEntrance">
						<div class="entrance" @click="toPage('shuiliang')">
							<image :mode="'aspectFit'" src="../../static/images/shuiliang.png"></image>
							<div class="entranceName">水质数据</div>
						</div>
						<div class="entrance border_left_none" @click="toPage('gongyi')">
							<image :mode="'aspectFit'" src="../../static/images/gongyi.png"></image>
							<div class="entranceName">工艺数据</div>
						</div>
						<div class="entrance border_left_none" @click="toPage('shenpi')">
							<image :mode="'aspectFit'" src="../../static/images/shenpi.png"></image>
							<div class="entranceName">数据审核</div>
						</div>
					</div>
				</div>

				<div class="itemContent">
					<div class="itemContentTitle">设备管理</div>
					<div class="itemContentEntrance">
						<div class="entrance" @click="toPage('xunjian')">
							<image :mode="'aspectFit'" src="../../static/images/xunjian.png"></image>
							<div class="entranceName">巡检</div>
						</div>
						<div class="entrance border_left_none" @click="toPage('baoyang')">
							<image :mode="'aspectFit'" src="../../static/images/baoyang.png"></image>
							<div class="entranceName">保养</div>
						</div>
						<div class="entrance border_left_none" @click="toPage('weixiu')">
							<image :mode="'aspectFit'" src="../../static/images/weixiu.png"></image>
							<div class="entranceName">维修</div>
						</div>
						<div class="entrance border_top_none" @click="toPage('liebiao')">
							<image :mode="'aspectFit'" src="../../static/images/liebiao.png"></image>
							<div class="entranceName">列表</div>
						</div>
					</div>
				</div>
				<div class="itemContent">
					<div class="itemContentTitle">工具</div>
					<div class="itemContentEntrance">
						<div class="entrance" @click="toPage('')">
							<image :mode="'aspectFit'" src="../../static/images/saoma.png"></image>
							<div class="entranceName">查设备</div>
						</div>
						<div class="entrance border_left_none" @click="toPage('')">
							<image :mode="'aspectFit'" src="../../static/images/saoma1.png"></image>
							<div class="entranceName">故障上报</div>
						</div>
						<div class="entrance border_left_none" @click="toPage('jiankong')">
							<image :mode="'aspectFit'" src="../../static/images/jiankong.png"></image>
							<div class="entranceName">云控制</div>
						</div>
					</div>
				</div>
			</div>
		</scroll-view>
	</view>
</template>

<script>
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
			}
		},
		onLoad(options) {},
		mounted() {

			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 80
		},
		methods: {
			toPage(url) {
				if (url == 'liebiao') {
					uni.navigateTo({
						url: `/pages/equipment/index`,
					})
				} else if (url == 'paiban') {
					uni.navigateTo({
						url: `/pages/task/components/inspection/schedule`,
					})
				} else if (url == 'jiankong') {
					uni.navigateTo({
						url: `/pages/equipment/eqmonitor`,
					})
				} else if (url == 'xunjian' || url == 'weixiu' || url == 'baoyang' || url == 'shenpi') {
					uni.navigateTo({
						url: `/pages/task/index?type=${url}`,
					})
				} else if (url == 'shuiliang') {
					uni.navigateTo({
						url: `/pages/home/components/shuiliang`,
					})
				} else if (url == 'gongyi') {
					uni.navigateTo({
						url: `/pages/home/components/gongyi`,
					})
				} else if (url == 'renwu') {
					uni.navigateTo({
						url: `/pages/home/components/dailyTask`,
					})
				} else if (url == 'jiaojieban') {
					uni.navigateTo({
						url: `/pages/home/components/joinClass`,
					})
				} else {
					uni.showToast({
						title: "功能正在开发中",
						icon: "none",
					});
				}

			}
		}
	}
</script>

<style lang="less">
	@import '../../static/css/index.css';

	.mtBoderd {
		border-bottom: 1px solid #ffeeee;
		padding-top: 0 !important;
	}

	.homeList {
		padding: 20px;
	}

	.itemContentTitle {
		margin-bottom: 15px;
		color: #333;
		font-size: 14px;
	}

	.itemContentEntrance {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-bottom: 30px;

		.entrance {
			width: 33%;
			height: 116px;
			border: 1px solid #ffeeee;
			box-sizing: border-box;
			text-align: center;
			justify-content: center;
			display: flex;
			flex-direction: column;

			&.border_left_none {
				border-left: none;
			}

			&.border_top_none {
				border-top: none;
			}

			image {
				width: 48px;
				height: 48px;
				margin: 0 auto 5px;
				display: inline-block;
			}

			.entranceName {
				font-size: 14px;
				color: #333;
			}
		}
	}
</style>