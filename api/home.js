import http from '../util/http.js'

const url = {
    // 全年完成情况，坐上，中上
    queryAchievedOfYear: "/waterAchievedOfYear/queryAchievedOfYear",
    // 公司全年处理水量，中中
    queryDisposeWater: "/waterAchievedOfYear/queryDisposeWater",
    // 1-8月目标完成率 左中
    queryWaterCompleteRate: "/waterCompleteRate/queryWaterCompleteRate",
    // 四厂日均水量对比 中下左
    queryDailyWaterAvg: "/dailyWaterAvg/queryDailyWaterAvg",
    // 四厂能耗对比 中下右
    queryPower: "/power/queryPower",
    // 四厂用水处理成本 右下
    queryTotalTonWaterCost: "/totalTonWaterCost/queryTotalTonWaterCost",
    // 财务收支情况、资产保值率 右上2
    queryFinancialData: "/financialData/queryFinancialData",
    // 生产成本、处理成本  右中
    queryProductionCost: "/productionCost/queryProductionCost",
    // 水量目标完成情况 左下
    querywaterTargetCompletion: "/waterTargetCompletion/querywaterTargetCompletion",
    // 水量目标完成情况 左下
    queryTotal: "/waterTargetCompletion/queryTotal",
    // 生产成本、处理成本  右中
    queryTonWaterCost: "/tonWaterCost/queryTonWaterCost",
    // 生产成本、处理成本  右中
    queryTonWaterCostAVG: "/tonWaterCost/queryTonWaterCostAVG",
}

export default {
    url: url,
    // 全年完成情况，坐上，中上
    queryAchievedOfYear(params) {
        return http.post(url.queryAchievedOfYear, params)
    },
    // 公司全年处理水量，中中
    queryDisposeWater(params) {
        return http.post(url.queryDisposeWater, params)
    },
    // 1-8月目标完成率 左中
    queryWaterCompleteRate(params) {
        return http.post(url.queryWaterCompleteRate, params)
    },
    // 四厂日均水量对比 中下左
    queryDailyWaterAvg(params) {
        return http.post(url.queryDailyWaterAvg, params)
    },
    // 四厂日均水量对比 中下右
    queryPower(params) {
        return http.post(url.queryPower, params)
    },
    // 四厂用水处理成本 右下
    queryTotalTonWaterCost(params) {
        return http.post(url.queryTotalTonWaterCost, params)
    },
    // 财务收支情况、资产保值率  右上2
    queryFinancialData(params) {
        return http.post(url.queryFinancialData, params)
    },
    // 生产成本、处理成本 右中
    queryProductionCost(params) {
        return http.post(url.queryProductionCost, params)
    },
    // 水量目标完成情况 左下
    querywaterTargetCompletion(params) {
        return http.post(url.querywaterTargetCompletion, params)
    },
    // 水量目标完成情况总数 左下
    queryTotal(params) {
        return http.post(url.queryTotal, params)
    },
    // 生产成本、处理成本 右中
    queryTonWaterCost(params) {
        return http.post(url.queryTonWaterCost, params)
    },
    // 生产成本、处理成本 右中
    queryTonWaterCostAVG(params) {
        return http.post(url.queryTonWaterCostAVG, params)
    },
}