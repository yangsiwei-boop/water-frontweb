import http from '../util/http.js'

const url = {
    // 更新用户
    userUpdateUser: "/user/updateUser",
    // 查询排班记录
    workPlanQueryUserWorkPlanPage: "/workPlan/queryUserWorkPlanPage",
    // 查询班次
    workClassQueryWorkClass: "/workClass/queryWorkClass",
}

export default {
    url: url,
    // 更新用户
    userUpdateUser(params) {
        return http.post(url.userUpdateUser, params)
    },
    // 查询排班记录
    workPlanQueryUserWorkPlanPage(params) {
        return http.post(url.workPlanQueryUserWorkPlanPage, params)
    },
    // 查询班次
    workClassQueryWorkClass(params) {
        return http.post(url.workClassQueryWorkClass, params)
    },
}