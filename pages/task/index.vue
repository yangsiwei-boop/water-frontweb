<template>
	<view class="content">

		<uni-section title="" style="height: 100%;">

			<view class="reportDetail">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						{{title}}
					</view>
				</view>
			</view>
			<!-- <view class="tab_out" style="padding-top: 10px;">
				<view class="tabs" :class="{tabClick:currentIndex==0}" @click="changepage(0)">
					巡检
				</view>
				<view class="tabs" :class="{tabClick:currentIndex==1}" @click="changepage(1)">
					保养
				</view>
				<view class="tabs" :class="{tabClick:currentIndex==2}" @click="changepage(2)">
					维修
				</view>
				<view class="tabs" :class="{tabClick:currentIndex==3}" @click="changepage(3)">
					审批
				</view>
				<view class="tabs" :class="{tabClick:currentIndex==4}" @click="changepage(4)">
					验收
				</view>
			</view> -->

			<view class="uni-margin-wrap">
				<swiper class="swiper" :style="{height: swiperWidth - 10 + 'px'}" @change="swiperTab" circular
					:current='currentIndex' disable-touch>
					<swiper-item>
						<inspectionVue :height="swiperWidth2 - 240"></inspectionVue>
					</swiper-item>
					<swiper-item>
						<upKeepVue :height="swiperWidth2 - 220"></upKeepVue>
					</swiper-item>
					<swiper-item>
						<repairVue :height="swiperWidth2 - 140"></repairVue>
					</swiper-item>
					<swiper-item>
						<approveVue :height="swiperWidth2"></approveVue>
					</swiper-item>
					<swiper-item>
						<acceptVue :height="swiperWidth2 - 140"></acceptVue>
					</swiper-item>
				</swiper>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import inspectionVue from './components/inspection/index.vue';
	import upKeepVue from './components/upKeep/index.vue';
	import repairVue from './components/repair/index.vue';
	import approveVue from './components/approve/index.vue';
	import acceptVue from './components/accept/index.vue';
	export default {
		components: {
			inspectionVue,
			upKeepVue,
			repairVue,
			approveVue,
			acceptVue,
		},
		data() {
			return {
				value: 1,
				array: ['星沙厂', '城西厂', '城北厂', '城南厂', '城东厂'],
				index: 0,
				currentIndex: 0,
				pageHeight: 0,
				swiperWidth: 0,
				swiperWidth2: 0,
				depId: uni.getStorageSync('depId'),
				title: ''
			}
		},
		onBackPress() {
			console.log('2222222')
			this.initDate()
		},
		onLoad(options) {
				console.log(options.type)
				if(options.type == 'xunjian') {
					this.currentIndex = 0
					this.title = '巡检'
				} else if(options.type == 'baoyang') {
					this.currentIndex = 1
					this.title = '保养'
				}else if(options.type == 'weixiu') {
					this.currentIndex = 2
					this.title = '维修'
				}else if(options.type == 'shenpi') {
					this.currentIndex = 3
					this.title = '数据审核'
				}
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			this.swiperWidth = this.pageHeight - 36
			if (this.depId == '1') {
				this.swiperWidth2 = this.pageHeight + 96
			} else {
				this.swiperWidth2 = this.pageHeight + 136
			}
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
			changepage(item) {
				console.log(666);
				this.currentIndex = item
				console.log("当前选中", item)
			},
			swiperTab(e) {
				this.currentIndex = e.detail.current; //获取索引
				console.log("this.currentIndex", this.currentIndex)
			},


		}
	}
</script>

<style>
	@import '../../static/css/index.css';
	
		.reportDetail {
			display: flex;
			flex-direction: column;
			padding-top: 10px;
		}
	
		.header {
			display: flex;
			flex-direction: row;
			align-items: center;
			color: #ff575c;
			font-size: 18px;
			padding: 0px 0px 5px 10px
		}
</style>