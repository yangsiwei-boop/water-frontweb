<template>
	<view class="" style="padding-top: 20px;">
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				webviewStyles: {

				},
				url: 'http://47.106.144.138//#/home?type=app'
				// url: 'http://47.106.231.125/#/home?type=app'
			}
		},
		onReady() {
			// #ifdef APP-PLUS
				plus.screen.lockOrientation('landscape');
			var currentWebview = this.$scope.$getAppWebview() //获取当前页面的webview对象
			// console.log("currentWebview",currentWebview)
			setTimeout(function() {
				const wv = currentWebview.children()[0] //取出当前webview实例
				wv.setStyle({
					scalable: true //添加样式，启动缩放
				})
				wv.evalJS(`
					var metaEl = document.createElement('meta')
					metaEl.setAttribute('name','viewport')
					metaEl.setAttribute('content', 'width=device-width, initial-scale=1,user-scalable=yes')
					document.head.appendChild(metaEl)
				`);
			}, 200); //如果是页面初始化调用时，需要延时一下
			// #endif
		},
		methods:{
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
		},
		onUnload() {
			// #ifdef APP-PLUS
		    plus.screen.unlockOrientation(); // 解锁屏幕方向
			// #endif
		}
	}
</script>