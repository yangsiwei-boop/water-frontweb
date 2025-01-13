import http from '../util/http.js'

const url = {
    // 查询设备概况信息
    facilitySituation: "facility/facilitySituation/",
    // 查询设备的联网推送数据详情
    getFacilityDetail: "facility/getFacilityDetail",
    // 查询设备列表
    queryFacility: "/facility/queryFacility",
    // 查询设备详情
    facilityDetailId: "/facility/detail/",
    // 修改设备信息
    updateFacility: "/facility/updateFacility",
    // 查询维修任务
    equipRepairQueryRepairRecord: "/equipRepair/queryRepairRecord",
    // 查询维修任务/台账
    equipRepairQueryRepair: "/equipRepair/queryRepair",
	 // 查询巡检任务
	inspTaskQueryTask: "inspTask/queryTask",
    // 查询巡检记录
    inspTaskQueryInspRecord: "/inspTask/queryInspRecord",
    // 查询任务填报项目
    inspTaskQueryItems: "inspTask/queryItems/",
    // 查询设备保养任务
    upkeepTaskQueryTask: "/upkeepTask/queryTask",
}

export default {
    url: url,
    // 查询设备概况信息
    facilitySituation(params) {
        return http.post(url.facilitySituation + params)
    },
    // 查询设备的联网推送数据详情
    getFacilityDetail(params) {
        return http.post(url.getFacilityDetail, params)
    },
    // 查询设备列表
    queryFacility(params) {
        return http.post(url.queryFacility, params)
    },
    // 查询设备的联网推送数据详情
    facilityDetailId(params) {
        return http.post(url.facilityDetailId + params)
    },
    // 修改设备信息
    updateFacility(params) {
        return http.post(url.updateFacility, params)
    },
    // 查询维修任务记录
    equipRepairQueryRepairRecord(params) {
        return http.post(url.equipRepairQueryRepairRecord, params)
    },
    // 查询维修任务记录
    equipRepairQueryRepair(params) {
        return http.post(url.equipRepairQueryRepair, params)
    },
    // 查询巡检任务
    inspTaskQueryTask(params) {
        return http.post(url.inspTaskQueryTask, params)
    },
    // 查询巡检记录
    inspTaskQueryInspRecord(params) {
        return http.post(url.inspTaskQueryInspRecord, params)
    },
    // 查询任务填报项目
    inspTaskQueryItems(params) {
        return http.post(url.inspTaskQueryItems + params.id, 'formData')
    },
    // 查询保养任务列表
    upkeepTaskQueryTask(params) {
        return http.post(url.upkeepTaskQueryTask, params)
    },
}