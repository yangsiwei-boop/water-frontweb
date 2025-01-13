<template>
	<view class="content">
		<uni-section title="">
			<view class="reportDetail">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						用户协议与隐私政策
					</view>
				</view>
			</view>
		</uni-section>
		<view class="content">
			<scroll-view scroll-y="true" :show-scrollbar='false' :style="{height: swiperWidth + 'px'}">
				<view class="">
					一、特别提示
				</view>

				在此特别提醒您(用户)在注册成为《XXX》APP(以下部分简称APP”)用户之前，请认真阅读本《XXXAPP用户服务协议》(以下简称
				协议”)，确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您同意并点击确认本协议条款且完成注册程序后，才能成为《XXX》APP的正式注册用户，并享受《XXX》APP
				的各类服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。若您不同意本协议，或对本协议中的条款存在任何疑问，请您立即停止《XXX》APP用户注册程序，并可以选择不使用本网站服务。

				本协议约定《XXX》APP与用户之间关于“《XXX》APP”服务(以下简称 服务”)的权利义务。
				用户”是指注册、登录、使用本服务的个人、单位。本协议可由《XXX》APP随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本APP
				中查阅最新版协议条款。在修改协议条款后如果用户不接受修改后的条款，请立即停止使用《XXX》APP 提供的服务，用户继续使用《XXX 》APP 提供的服务将被视为接受修改后的协议。
				<view class="">
					二、账号注册
				</view>

				用户在使用本服务前需要注册一个《XXX》APP账号。APP账号应当使用手机号码绑定注册，请用户使用尚未与《XXX》APP账号绑定的手机号码，以及未被《XXX》APP根据本协议封禁的手机号码注册APP
				账号。《XXX》APP可以根据用户需求或产品需要对账号注册和绑定的方式进行变更而无须重新通知。

			</scroll-view>
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
			this.swiperWidth = this.pageHeight - 128
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
</style>