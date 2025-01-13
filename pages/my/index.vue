<template>
	<view class="content">
		<view class="avatarBox">
			<view class="border">
				<view class="name">
					{{realName}}, 你好
				</view>
				<view class="avatar">
					<image style="width: 60px; height: 60px;padding: 6px;" :mode="'aspectFit'"
						src="../../static/images/mine.png"></image>
				</view>
			</view>
		</view>

		<uni-card class="myCard" @click="toAccountInfo">
			<view class="myCardContent" @click="">
				<view class="icon" style="background: #ff575c;">
					<image style="width: 24px; height: 24px;" :mode="'aspectFit'"
						src="../../static/images/Account1.png"></image>
				</view>
				<view class="name">
					账号信息
				</view>
			</view>
		</uni-card>
		<uni-card class="myCard" @click="toChangePassword">
			<view class="myCardContent" @click="">
				<view class="icon" style="background: #FBB03B;">
					<image style="width: 24px; height: 24px;" :mode="'aspectFit'"
						src="../../static/images/Change_password.png"></image>
				</view>
				<view class="name">
					修改密码
				</view>
			</view>
		</uni-card>
		<uni-card class="myCard" @click="toSchedule">
			<view class="myCardContent" @click="">
				<view class="icon" style="background: #00D2BA;">
					<image style="width: 24px; height: 24px;" :mode="'aspectFit'"
						src="../../static/images/schedule.png"></image>
				</view>
				<view class="name">
					我的排班
				</view>
			</view>
		</uni-card>
		<uni-card class="myCard" @click="toUserAgreementPrivacyPolicy">
			<view class="myCardContent" @click="">
				<view class="icon" style="background: #4B8CFF;">
					<image style="width: 24px; height: 24px;" :mode="'aspectFit'"
						src="../../static/images/Agreement.png"></image>
				</view>
				<view class="name">
					用户协议与隐私政策
				</view>
			</view>
		</uni-card>
		<uni-card class="myCard" @click="toUpdate">
			<view class="myCardContent" @click="">
				<view class="icon" style="background: #3AC952;">
					<image style="width: 24px; height: 24px;" :mode="'aspectFit'"
						src="../../static/images/update.png"></image>
				</view>
				<view class="name">
					<view class="versionUpdate">
						版本更新
							<image class="updateIcon" style="width: 24px; height: 24px;" :mode="'aspectFit'"
								src="../../static/images/new.png"></image>
					</view>
				</view>
			</view>
		</uni-card>
		<view class="btn" @click="logOut">
			退出登录
		</view>
	</view>
</template>

<script>
import loginApi from "../../api/login.js";
	export default {
		data() {
			return {
				realName: uni.getStorageSync("realName")
			}
		},
		onLoad() {},
		methods: {
			toUserAgreementPrivacyPolicy(){
				uni.navigateTo({
					url: `/pages/my/components/userAgreementPrivacyPolicy`,
				})
			},
			toUpdate(){
				uni.navigateTo({
					url: `/pages/my/components/update`,
				})
			},
			toChangePassword(){
				uni.navigateTo({
					url: `/pages/my/components/changePassword`,
				})
			},
			toSchedule(){
				uni.navigateTo({
					url: `/pages/my/components/schedule`,
				})
			},
			toAccountInfo(){
				uni.navigateTo({
					url: `/pages/my/components/accountInfo`,
				})
			},
			logOut(){
				loginApi.logOut().then((res) => {
					if(res.data.code == 200) {
					uni.clearStorage();
					uni.showToast({
					    title: "退出成功",
					    icon: "success",
					});
					uni.reLaunch({
						url: `/pages/login/index`,
					})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import '../../static/css/index.css';

	.avatarBox {
		padding: 100px 20px 30px;

		.border {
			border: 2px solid #ff575c;
			border-radius: 10px;
			height: 120px;
			box-sizing: border-box;
			position: relative;
			padding-top: 40px;

			.avatar {
				width: 72px;
				height: 72px;
				border-radius: 50%;
				background: #fff;
				border: 2px solid #ff575c;
				position: absolute;
				top: -36px;
				left: 50%;
				transform: translate(-50%);
			}

			.name {
				line-height: 80px;
				text-align: center;
				font-size: 16px;
				font-weight: bold;
			}
		}


	}

	.myCard {
		margin: 0 20px 15px !important;
		border-radius: 10px !important;

		.myCardContent {

			width: 100%;
			height: 66px;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 16px;

			.icon {
				width: 40px;
				height: 40px;
				border-radius: 20px;
				text-align: center;
				padding-top: 7px;
				box-sizing: border-box;
				margin: 0 20px 0 10px;
			}
			.name{
				font-weight: bold;
			}
			.versionUpdate{
				position: relative;
				.updateIcon{
					position: absolute;
					right: -26px;
					top: -10px;
				}
			}
		}
	}
	.btn{
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