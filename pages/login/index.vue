<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view>
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item uni-column">
                    <text class="iconfont icon-zhanghao" size="24"></text>
                    <input
                        class="uni-input"
                        v-model="username"
                        focus
                        placeholder="账号/手机号"
                    />
                </view>
                <view class="uni-form-item uni-column">
                    <text class="iconfont icon-mima" size="24"></text>
                    <input
                        class="uni-input"
                        password
                        type="safe-password"
                        v-model="password"
                        placeholder="密码"
                    />
                </view>
            </form>
        </view>
        <button class="loginbtn" @click="login">登录</button>
    </view>
</template>

<script>
import loginApi from "../../api/login.js";
export default {
    data() {
        return {
            username: "",
            password: "",
			localStorageUserName: uni.getStorageSync("username"),
			localStoragePassword: uni.getStorageSync("password"),
        };
    },
    onLoad() {
		if(this.localStorageUserName) {
			this.username = this.localStorageUserName
		}
		if(this.localStoragePassword) {
			this.password = this.localStoragePassword
		}
	},
    methods: {
        formSubmit() {},
        formReset() {},
        async login() {
					let self = this
            uni.showLoading({
                title: "正在登录",
            });
            loginApi
                .login({
                    username: this.username,
                    password: this.password,
                })
                .then((res) => {
                    uni.hideLoading();
                    if (res.data.code == 200) {
                        uni.showToast({
                            title: "登录成功",
                        });
                        uni.setStorageSync(
                            "tokenValue",
                            res.data.data.tokenInfo.tokenValue
                        );
                        uni.setStorageSync(
                            "tokenName",
                            res.data.data.tokenInfo.tokenName
                        );
                        uni.setStorageSync(
                            "loginId",
                            res.data.data.tokenInfo.loginId
                        );
                        uni.setStorageSync("depId", res.data.data.depId);
                        uni.setStorageSync("userId", res.data.data.id);
                        uni.setStorageSync("username", res.data.data.username);
                        uni.setStorageSync("realName", res.data.data.realName);
                        uni.setStorageSync("phone", res.data.data.phone);
                        uni.setStorageSync("roleIds", res.data.data.roleIds);
                        uni.setStorageSync("roleNames", res.data.data.roleNames);
                        uni.setStorageSync("password", self.password);
                        uni.switchTab({
                            url: "/pages/index/index",
                        });
                    } else {
                        uni.showToast({
                            title: "账号密码错误",
                            icon: "error",
                        });
                    }
                })
                .catch((e) => {
                    uni.hideLoading();
                });
        },
    },
};
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

.uni-form-item {
    padding: 20rpx 10px;
    border-radius: 12px;
    width: 334px;
    height: 54px;
    background-color: #f6f6f6;
    margin-top: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.uni-form-item input {
    height: 34px;
    flex: 1;
    padding: 0 10px;
}

.loginbtn {
    width: 334px;
    height: 54px;
    background-color: #ff575c;
    border-radius: 27px;
    line-height: 54px;
    color: #fff;
    box-shadow: 0 8px 32px #fde6e2;
    margin-top: 50px;
}
</style>