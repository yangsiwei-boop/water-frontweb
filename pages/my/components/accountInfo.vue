<template>
	<view class="content">
		<uni-section title="">
			<view class="reportDetail">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						账号信息
					</view>
				</view>
			</view>
		</uni-section>
		<view class="content">
			<scroll-view scroll-y="true" :show-scrollbar='false' :style="{height: swiperWidth + 'px'}">
				<view class="">
					<view class="uni-input-wrapper">
						<view class="icon">
							<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
								src="../../../static/images/account2.png"></image>
						</view>
						<input disabled v-model="username" class="uni-input" placeholder="请输入账号" />
					</view>
				</view>
				<view class="">
					<view class="uni-input-wrapper">
						<view class="icon">
							<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
								src="../../../static/images/mine1.png"></image>
						</view>
						<input disabled v-model="realName" class="uni-input" placeholder="请输入姓名" />
					</view>
				</view>
				<view class="">
					<view class="uni-input-wrapper">
						<view class="icon">
							<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
								src="../../../static/images/mob.png"></image>
						</view>
						<input disabled v-model="phone" class="uni-input" placeholder="请输入手机号码" />
					</view>
				</view>
				<view class="">
					<view class="uni-input-wrapper">
						<view class="icon">
							<image style="width: 28px; height: 28px;" :mode="'aspectFit'"
								src="../../../static/images/role.png"></image>
						</view>

							<input v-model="roleNames" disabled class="uni-input" placeholder="请选择角色" />
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import myHttp from "../../../api/my.js";
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
				confirmNewPassword: '',
				index: 0,
				array: []
			}
		},
		onLoad(options) {},
		mounted() {

			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
			this.swiperWidth = this.pageHeight - 258
		},
		methods: {
			bindPickerChange() {},
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
			submitChangePassword() {
				if (this.newPassword == '') {
					uni.showToast({
						title: "请输入新密码",
						icon: "none",
					});
					return
				}
				if (this.confirmNewPassword == '') {
					uni.showToast({
						title: "请确认新密码",
						icon: "none",
					});
					return
				}
				if (this.confirmNewPassword !== this.newPassword) {
					uni.showToast({
						title: "两次输入密码不一致",
						icon: "none",
					});
					return
				}
				let params = {
					id: uni.getStorageSync('userId'),
					password: this.newPassword
				}
				myHttp.userUpdateUser(params).then((res) => {
					if (res.data.code == 200) {
						uni.showToast({
							title: "修改成功",
							icon: "success",
						});
						this.goBack()
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

	.uni-input-wrapper {
		position: relative;
		margin-bottom: 20px;

		.icon {
			position: absolute;
			left: 10px;
			top: 13px;
			height: 28px;
			z-index: 999;
		}
	}

	.uni-input {
		background: #fafafa;
		padding: 16px 10px 16px 46px;
		border-radius: 12px;
	}
</style>