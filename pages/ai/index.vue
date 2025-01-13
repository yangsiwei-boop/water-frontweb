<template>
	<view class="content">

		<uni-section title="" style="height: 100%;">

			<view class="reportDetail">
			</view>
			<view class="tab_out" style="padding-top: 10px;">
				<view class="tabs" :class="{tabClick:currentIndex==0}" @click="changepage(0)">
					智能曝气
				</view>
				<view class="tabs" :class="{tabClick:currentIndex==1}" @click="changepage(1)">
					智能加药
				</view>
			</view>

			<view class="uni-margin-wrap">
				<swiper class="swiper" :style="{height: swiperWidth - 10 + 'px'}" @change="swiperTab" circular
					:current='currentIndex' disable-touch>
					<swiper-item>
						<intelligentExplosion :height="swiperWidth - 220"></intelligentExplosion>
					</swiper-item>
					<swiper-item>
						<intelligentDosing :height="swiperWidth - 110"></intelligentDosing>
					</swiper-item>
				</swiper>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import intelligentExplosion from './components/intelligentExplosion.vue';
	import intelligentDosing from './components/intelligentDosing.vue';
	export default {
		components: {
			intelligentExplosion,
			intelligentDosing,
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
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			this.swiperWidth = this.pageHeight - 96
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