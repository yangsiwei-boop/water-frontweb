import http from '../util/http.js'

const url = {
	// 查询指定年月日历,时间范围
	workcalendarGetWorkCalendarByTime: "workcalendar/getWorkCalendarByTime",
	// 查询巡检任务
	inspTaskQueryTask: "inspTask/queryTask",
	// 查询设备保养任务
	upkeepTaskQueryTask: "upkeepTask/queryTask",
	// 查询维修任务/台账
	equipRepairQueryRepair: "equipRepair/queryRepair",
	// 查询任务填报项目
	inspTaskQueryItems: "inspTask/queryItems",
	// 查看图片
	fileInfoGetByIds: "fileInfo/getByIds/",
	// 填报任务
	inspTaskReportTask: "inspTask/reportTask",
	// 保存任务
	inspTaskSaveTask: "inspTask/saveTask",
	// 填报任务
	upkeepTaskReportTask: "upkeepTask/reportTask",
	// 批量验收
	upkeepTaskBatchAcceptance: "upkeepTask/batchAcceptance",
	// 设备维修填报
	equipRepairReportRepair: "equipRepair/reportRepair",
	// 批量验收维修
	equipRepairBatchAcceptance: "equipRepair/batchAcceptance",
	// 查询审批数据
	queryAudit: "audit/queryAudit",
	// 根据审核ID查询水量数据详情-生产数据
	queryWaterDetail: "audit/queryWaterDetail/",
	// 根据审核ID查询水量数据详情-化验数据
	queryAssayDetail: "audit/queryAssayDetail/",
	//  未审核数量
	queryCraftDetail: "audit/queryCraftDetail/",
	// 转维修
	equipRepairConvertRepair: "equipRepair/convertRepair",
	// 查询班组
	workteamsQueryWorkTeams: "workteams/queryWorkTeams",
	// 审批数据
	auditData: "audit/auditData",
	// 审批数据
	appQueryTask: "upkeepTask/appQueryTask",
	// 审批数据
	queryCraftExcel: "audit/queryCraftExcel/",
	//  删除审核数据
	auditRemove: "/audit/remove/",
	// 查询用户列表
	userQueryUserList: "/user/queryUserList",
	// 处理
	equipRepairProcessing: "/equipRepair/processing",


	/****************** 日常任务接口 *********************/
	// 列表查询
	dailyTaskQueryTask: "/dailyTask/queryTask",
	// 获取详情
	dailyTaskGetById: "/dailyTask/getById/",
	// 编辑任务
	dailyTaskEditTask: "/dailyTask/editTask",
	// 发布任务
	dailyTaskPublish: "/dailyTask/publish",
	// 任务填报
	dailyTaskReportDailyTask: "/dailyTask/reportDailyTask",
	// 任务填报详情
	dailyTaskReportDailyTaskDetail: "/dailyTask/reportDailyTaskList/",
	// 任务填报详情
	dailyTaskRemoveTask: "/dailyTask/removeTask/",

    // 查询班次
    workClassQueryWorkClass: "/workClass/queryWorkClass",
	    // 查询用户列表
	    userQueryUserList: "/user/queryUserList",
    // 查询班组
    workteamsQueryWorkTeams: "/workteams/queryWorkTeams",
	
	
	    /****************** 交接班接口 *********************/
	    // 交接班记录
	    // 列表查询
	    handoverRecordRecordList: "/handoverRecord/recordList",
	    // 获取详情
	    handoverRecordGetById: "/handoverRecord/getById/",
	    // 保存
	    handoverRecordSaveRecord: "/handoverRecord/saveRecord",
	    // 交班
	    handoverRecordSubmitRecord: "/handoverRecord/submitRecord",
	    // 接班
	    handoverRecordToConfirm: "/handoverRecord/toConfirm/",
	    // 交班
	    handoverTaskSubmitRecord: "/handoverRecord/submitRecord",
	    // 保存
	    handoverTaskSaveRecord: "​/handoverRecord​/saveRecord",
	    // 接班
	    handoverTaskToConfirm: "/handoverRecord/toConfirm/",
	
	    // 交接班任务
	    // 调整
	    handoverTaskAdjustTask: "/handoverTask/adjustTask",
	    // 列表查询
	    handoverTaskQueryTaskList: "/handoverTask/queryTaskList",
	    // 填报
	    handoverTaskReportTask: "/handoverTask/reportTask",
}

export default {
	url: url,
	// 查询指定年月日历,时间范围
	workcalendarGetWorkCalendarByTime(params) {
		return http.post(url.workcalendarGetWorkCalendarByTime +
			`?startTime=${params.startTime}&endTime=${params.endTime}`)
	},
	// 查询巡检任务
	inspTaskQueryTask(params) {
		return http.post(url.inspTaskQueryTask, params)
	},
	// 查询设备保养任务
	upkeepTaskQueryTask(params) {
		return http.post(url.upkeepTaskQueryTask, params)
	},
	// 查询维修任务/台账
	equipRepairQueryRepair(params) {
		return http.post(url.equipRepairQueryRepair, params)
	},
	// 查询任务填报项目
	inspTaskQueryItems(params) {
		return http.post(url.inspTaskQueryItems, params)
	},
	// 查看图片
	fileInfoGetByIds(imageIds) {
		return http.post(url.fileInfoGetByIds + imageIds)
	},
	// 填报任务
	inspTaskReportTask(params) {
		return http.post(url.inspTaskReportTask, params)
	},
	// 保存任务
	inspTaskSaveTask(params) {
		return http.post(url.inspTaskSaveTask, params)
	},
	// 填报任务保养
	upkeepTaskReportTask(params) {
		return http.post(url.upkeepTaskReportTask, params)
	},
	// 批量验收保养
	upkeepTaskBatchAcceptance(params) {
		return http.post(url.upkeepTaskBatchAcceptance, params)
	},
	// 设备维修填报
	equipRepairReportRepair(params) {
		return http.post(url.equipRepairReportRepair, params)
	},
	// 验收维修
	equipRepairBatchAcceptance(params) {
		return http.post(url.equipRepairBatchAcceptance, params)
	},
	// 查询审批数据
	queryAudit(params) {
		return http.post(url.queryAudit, params)
	},
	// 根据审核ID查询水量数据详情-生产数据
	queryWaterDetail(params) {
		return http.post(url.queryWaterDetail + params)
	},
	// 根据审核ID查询水量数据详情-化验数据
	queryAssayDetail(params) {
		return http.post(url.queryAssayDetail + params)
	},
	queryCraftDetail(params) {
		return http.post(url.queryCraftDetail + params)
	},
	// 转维修
	equipRepairConvertRepair(params) {
		return http.post(url.equipRepairConvertRepair, params)
	},
	// 查询班组
	workteamsQueryWorkTeams(params) {
		return http.post(url.workteamsQueryWorkTeams, params)
	},
	// 审批数据
	auditData(params) {
		return http.post(url.auditData, params)
	},
	// 审批数据
	appQueryTask(params) {
		return http.post(url.appQueryTask, params)
	},
	// 审批数据
	queryCraftExcel(params) {
		return http.post(url.queryCraftExcel + params)
	},
	// 审批数据
	auditRemove(params) {
		return http.post(url.auditRemove + params.id)
	},
	// 查询用户列表
	userQueryUserList(params) {
		return http.post(url.userQueryUserList, params)
	},
	// 查询用户列表
	equipRepairProcessing(params) {
		return http.post(url.equipRepairProcessing, params)
	},

	/****************** 日常任务接口 *********************/
	// 列表查询
	dailyTaskQueryTask(params) {
		return http.post(url.dailyTaskQueryTask, params)
	},
	// 列表查询
	dailyTaskGetById(params) {
		return http.post(url.dailyTaskGetById + params.id)
	},
	// 编辑任务
	dailyTaskEditTask(params) {
		return http.post(url.dailyTaskEditTask, params)
	},
	// 发布任务
	dailyTaskPublish(params) {
		return http.post(url.dailyTaskPublish, params)
	},
	// 任务填报
	dailyTaskReportDailyTask(params) {
		return http.post(url.dailyTaskReportDailyTask, params)
	},
	// 任务填报
	dailyTaskReportDailyTaskDetail(params) {
		return http.post(url.dailyTaskReportDailyTaskDetail + params.id)
	},
	// 删除任务
	dailyTaskRemoveTask(params) {
		return http.post(url.dailyTaskRemoveTask + params.id)
	},
    // 查询班次
    workClassQueryWorkClass(params) {
        return http.post(url.workClassQueryWorkClass, params)
    },
    // 查询班组
    workteamsQueryWorkTeams(params) {
        return http.post(url.workteamsQueryWorkTeams, params)
    },
    // 查询用户列表
    userQueryUserList(params) {
        return http.post(url.userQueryUserList, params)
    },
	
	    /****************** 交接班接口 *********************/
	    // 交接班记录
	    // 列表查询
	    handoverRecordRecordList(params) {
	        return http.post(url.handoverRecordRecordList, params)
	    },
	    // 获取详情
	    handoverRecordGetById(params) {
	        return http.post(url.handoverRecordGetById + params.id)
	    },
	    // 保存
	    handoverRecordSaveRecord(params) {
	        return http.post(url.handoverRecordSaveRecord, params)
	    },
	    // 交班
	    handoverRecordSubmitRecord(params) {
	        return http.post(url.handoverRecordSubmitRecord, params)
	    },
	    // 接班
	    handoverRecordToConfirm(params) {
	        return http.post(url.handoverRecordToConfirm + params.id)
	    },
	
	    // 交接班任务
	    // 调整
	    handoverTaskAdjustTask(params) {
	        return http.post(url.handoverTaskAdjustTask, params)
	    },
	    // 列表查询
	    handoverTaskQueryTaskList(params) {
	        return http.post(url.handoverTaskQueryTaskList, params)
	    },
	    // 填报
	    handoverTaskReportTask(params) {
	        return http.post(url.handoverTaskReportTask, params)
	    },
	    // 交班
	    handoverTaskSubmitRecord(params) {
	        return http.post(url.handoverTaskSubmitRecord, params)
	    },
	    // 保存
	    handoverTaskSaveRecord(params) {
	        return http.post(url.handoverTaskSaveRecord, params)
	    },
	    // 接班
	    handoverTaskToConfirm(params) {
	        return http.post(url.handoverTaskToConfirm + params.id)
	    },
}