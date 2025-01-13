<template>
	<view class="content">

		<uni-section title="" style="height: 100%;">

			<view class="reportDetail">
				<view class="header" @click="goBack">
					<uni-icons type="left" size="22" color="#ff575c"></uni-icons>
					<view class="" style="color: #333;">
						工艺数据
					</view>
				</view>
			</view>

			<view class="timeSection" style="padding:5px;z-index: 1002;" v-if="depId == '1'">
				<view class="year yearDataSelect" style="width: 25%;margin: 10px 0 0 10px;">
					<!-- <picker style="width: 100%;text-align: center" @change="bindPickerChange"
						:value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker> -->
					<uni-data-select class="yearDataSelect" v-model="currentFactory" :localdata="range"
						@change="changeFactory" title='title'></uni-data-select>
				</view>
			</view>

			<scroll-view scroll-y="true" :style="{height : swiperWidth2 + 'px'}">
				<view class="tableList" v-if="currentFactory == '2'">
					<uni-table style="width: 100%;min-width: 0;" ref="table" :loading="loading" border
						emptyText="暂无更多数据">
						<uni-tr>
							<uni-th width="110" style="width: 32px!important;border-right: none!important;" align="center">日期</uni-th>
							<uni-th style="border-left: none!important;" align="center"></uni-th>
							<uni-th align="center">{{beforeYesterday}}</uni-th>
							<uni-th align="center">{{yesterday}}</uni-th>
							<uni-th align="center">今日</uni-th>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="7" style="width: 32px!important;border-bottom: none!important;">
								<view class="">DO</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">氧化沟东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do1 || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">氧化沟西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">cass</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">A2/O东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">A2/O西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do5 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期南沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do6 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do6 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do6 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期北沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do7 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do7 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do7 || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="7" style="border-bottom: none!important;">
								<view class="">MLSS</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">氧化沟东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss1 || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">氧化沟西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">cass</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">A2/O东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">A2/O西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss5 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期南沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss6 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss6 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss6 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期北沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss7 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss7 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss7 || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="7" style="border-bottom: none!important;">
								<view class="">SV30</view>
								<view class="">(%)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">氧化沟东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv1 || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">氧化沟西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">cass</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">A2/O东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">A2/O西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv5 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期南沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv6 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv6 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv6 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期北沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv7 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv7 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv7 || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td rowspan="7" style="border-bottom: none!important;">
								<view class="">SVI</view>
								<view class="">(mL/g)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">氧化沟东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi1 || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">氧化沟西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">cass</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">A2/O东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">A2/O西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi5 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期南沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi6 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi6 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi6 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期北沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi7 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi7 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi7 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td rowspan="7"  style="border-bottom: none!important;">
								<view class="">MLVSS</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">氧化沟东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss1 || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">氧化沟西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">cass</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">A2/O东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">A2/O西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss5 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期南沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss6 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss6 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss6 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期北沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss7 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss7 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss7 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td rowspan="7" style="border-bottom: none!important;">
								<view class="">污泥含</view>
								<view class="">水率</view>
								<view class="">(%)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">北厂区污</view>
								<view class="name" style="width: 62px!important;">泥脱水间</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.containWater1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.containWater1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.containWater1 || '-'}}</view>
							</uni-td>
						</uni-tr>

						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">南厂区污</view>
								<view class="name">泥脱水间</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.containWater2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.containWater2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.containWater2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">四期脱水间</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.containWater3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.containWater3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.containWater3 || '-'}}</view>
							</uni-td>
						</uni-tr>

					</uni-table>
				</view>
				<view class="tableList" v-if="currentFactory == '6'">
					<uni-table style="width: 100%;min-width: 0;" ref="table" :loading="loading" border
						emptyText="暂无更多数据">
						<uni-tr>
							<uni-th width="120" style="border-right: none!important;" align="center">日期</uni-th>
							<uni-th style="border-left: none!important;" align="center"></uni-th>
							<uni-th align="center">{{beforeYesterday}}</uni-th>
							<uni-th align="center">{{yesterday}}</uni-th>
							<uni-th align="center">今日</uni-th>
						</uni-tr>
				
						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">DO(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name">东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">MLSS(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name">东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">SV30(%)</view>
							</uni-td>
							<uni-td>
								<view class="name">东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">SVI(mL/g)</view>
							</uni-td>
							<uni-td>
								<view class="name">东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">MLVSS(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name">东</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">西</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td style="border-right: none!important;">
								<view class="">污泥含水率(%)</view>
							</uni-td>
							<uni-td style="border-left: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.containWater1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.containWater1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.containWater1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
					</uni-table>
				</view>
				<view class="tableList" v-if="currentFactory == '3'">
					<uni-table style="width: 100%;min-width: 0;" ref="table" :loading="loading" border
						emptyText="暂无更多数据">
						<uni-tr>
							<uni-th width="120" colspan="2" style="border-right: none!important;" align="center">日期</uni-th>
							<uni-th style="border-left: none!important;" align="center"></uni-th>
							<uni-th align="center">{{beforeYesterday}}</uni-th>
							<uni-th align="center">{{yesterday}}</uni-th>
							<uni-th align="center">今日</uni-th>
						</uni-tr>
				
						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">DO(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name">南</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">北</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">MLSS(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name">南</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">北</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">SV30(%)</view>
							</uni-td>
							<uni-td>
								<view class="name">南</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">北</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">SVI(mL/g)</view>
							</uni-td>
							<uni-td>
								<view class="name">南</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">北</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="2" style="border-bottom: none!important;">
								<view class="">MLVSS(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name">南</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">北</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td colspan="2" style="border-right: none!important;">
								<view class="">污泥含水率(%)</view>
							</uni-td>
							<uni-td style="border-left: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.containWater1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.containWater1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.containWater1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
					</uni-table>
				</view>
				<view class="tableList" v-if="currentFactory == '4'">
					<uni-table style="width: 100%;min-width: 0;" ref="table" :loading="loading" border
						emptyText="暂无更多数据">
						<uni-tr>
							<uni-th width="110" style="width: 32px!important;border-right: none!important;" align="center">日期</uni-th>
							<uni-th style="border-left: none!important;" align="center"></uni-th>
							<uni-th align="center">{{beforeYesterday}}</uni-th>
							<uni-th align="center">{{yesterday}}</uni-th>
							<uni-th align="center">今日</uni-th>
						</uni-tr>
				
						<uni-tr>
							<uni-td rowspan="5" style="width: 32px!important;border-bottom: none!important;">
								<view class="">DO</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">1#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">2#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">3#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">4#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">5#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do5 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td rowspan="5" style="border-bottom: none!important;">
								<view class="">MLSS</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">1#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">2#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">3#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">4#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">5#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss5 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="5" style="border-bottom: none!important;">
								<view class="">SV30</view>
								<view class="">(%)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">1#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">2#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">3#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">4#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">5#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv5 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="5" style="border-bottom: none!important;">
								<view class="">SVI</view>
								<view class="">(mL/g)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">1#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">2#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">3#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">4#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">5#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi5 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="5" style="border-bottom: none!important;">
								<view class="">MLVSS</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">1#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">2#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">3#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">4#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">5#氧化沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss5 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss5 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="1">
								<view class="">污泥含</view>
								<view class="">水率</view>
								<view class="">(%)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">二期板框</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.containWater1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.containWater1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.containWater1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
					</uni-table>
				</view>
				<view class="tableList" v-if="currentFactory == '5'">
					<uni-table style="width: 100%;min-width: 0;" ref="table" :loading="loading" border
						emptyText="暂无更多数据">
						<uni-tr>
							<uni-th width="110" style="width: 32px!important;border-right: none!important;" align="center">日期</uni-th>
							<uni-th style="border-left: none!important;" align="center"></uni-th>
							<uni-th align="center">{{beforeYesterday}}</uni-th>
							<uni-th align="center">{{yesterday}}</uni-th>
							<uni-th align="center">今日</uni-th>
						</uni-tr>
				
						<uni-tr>
							<uni-td rowspan="7" style="width: 32px!important;border-bottom: none!important;">
								<view class="">DO</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">1#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">2#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">3#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">4#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.do4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.do4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.do4 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td rowspan="4" style="border-bottom: none!important;">
								<view class="">MLSS</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">1#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">2#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">3#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">4#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlss4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="4" style="width: 32px!important;border-bottom: none!important;">
								<view class="">SV30</view>
								<view class="">(%)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">1#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">2#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">3#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">4#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.sv4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.sv4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.sv4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="4" style="width: 32px!important;border-bottom: none!important;">
								<view class="">SVI</view>
								<view class="">(mL/g)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">1#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">2#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">3#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">4#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.svi4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.svi4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.svi4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="4" style="width: 32px!important;border-bottom: none!important;">
								<view class="">MLVSS</view>
								<view class="">(mg/L)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">1#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">2#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss2 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss2 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;border-bottom: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">3#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss3 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss3 || '-'}}</view>
							</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td style="border-top: none!important;">
							</uni-td>
							<uni-td>
								<view class="name">4#沟</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.mlvss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.mlvss4 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.mlvss4 || '-'}}</view>
							</uni-td>
						</uni-tr>
						
						<uni-tr>
							<uni-td rowspan="1">
								<view class="">污泥含</view>
								<view class="">水率</view>
								<view class="">(%)</view>
							</uni-td>
							<uni-td>
								<view class="name" style="width: 62px!important;">板框压滤</view>
							</uni-td>
							<uni-td>
								<view class="name">{{beforeYesterdayData.containWater1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{yesterdayData.containWater1 || '-'}}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{todayData.containWater1 || '-'}}</view>
							</uni-td>
						</uni-tr>
				
					</uni-table>
				</view>
			</scroll-view>
		</uni-section>
	</view>
</template>

<script>
	import moment from 'moment'

	import dataHttp from '../../../api/data.js'
	export default {
		components: {
			// inspectionVue,
			// upKeepVue,
			// repairVue,
			// approveVue,
			// acceptVue,
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
				depId: uni.getStorageSync('depId') + '',
				title: '',
				currentDateIndex: 0,
				currentFactory: uni.getStorageSync('depId') == '1' ? '2' : uni.getStorageSync('depId'),
				range: [{
					value: '2',
					text: '星沙厂'
				}, {
					value: '3',
					text: '城西厂'
				}, {
					value: '4',
					text: '城北厂'
				}, {
					value: '5',
					text: '城南厂'
				}, {
					value: '6',
					text: '城东厂'
				}, ],
				today: moment().format('MM-DD'),
				yesterday: moment().add(-1, 'day').format('MM-DD'),
				beforeYesterday: moment().add(-2, 'day').format('MM-DD'),
				loading: false,
				todayData: {},
				yesterdayData: {},
				beforeYesterdayData: {},
			}
		},
		onBackPress() {
			console.log('2222222')
			this.initDate()
		},
		onLoad(options) {
			console.log(options.type)
			if (options.type == 'xunjian') {
				this.currentIndex = 0
				this.title = '巡检'
			} else if (options.type == 'baoyang') {
				this.currentIndex = 1
				this.title = '保养'
			} else if (options.type == 'weixiu') {
				this.currentIndex = 2
				this.title = '维修'
			} else if (options.type == 'shenpi') {
				this.currentIndex = 3
				this.title = '数据审批'
			}
			// 获取当前窗口高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			this.swiperWidth = this.pageHeight - 96
			if (this.depId == '1') {
				this.currentFactory = '2'
				this.swiperWidth2 = this.pageHeight - 106
			} else {
				this.swiperWidth2 = this.pageHeight - 70
			}
			this.getWaterDateList()
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
			changeFactory(e) {
				this.getWaterDateList()
			},
			getWaterDateList() {
				this.loading = true
				this.todayData = {}
				this.yesterdayData = {}
				this.beforeYesterdayData = {}
				let params = {
					depId: this.currentFactory,
					// "depId": 4,
					startTime: moment().add(-2, 'day').format("YYYY-MM-DD 00:00:00"),
					endTime: moment().format("YYYY-MM-DD 23:59:59"),
					auditStatus: "1",
				};
				dataHttp.queryCraft(params).then((res) => {
					if (res.data.code == '200') {
						let keys = Object.keys(res.data.data);
						console.log(keys)
						keys.forEach(item => {
							if (item == this.today) {
								this.todayData = res.data.data[item]
							}
							if (item == this.yesterday) {
								this.yesterdayData = res.data.data[item]
							}
							if (item == this.beforeYesterday) {
								this.beforeYesterdayData = res.data.data[item]
							}
						})
						console.log(this.yesterdayData, 'yesterdayData')
						this.loading = false
					}
				});
			}

		}
	}
</script>

<style>
	@import '../../../static/css/index.css';

	.reportDetail {
		display: flex;
		flex-direction: column;
		padding-top: 10px;
		border-bottom: 1px solid #ffeeee;
	}

	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #ff575c;
		font-size: 18px;
		padding: 0px 0px 5px 10px
	}

	.tableList {
		width: 100%;
		box-sizing: border-box;
		padding: 10px 20px;
	}

	/deep/ .uni-table {
		min-width: 0 !important;
	}


	/deep/ .uni-table-th {
		width: 20% !important;
	}

	/deep/ .uni-table-td {
		min-width: 20px !important
	}
</style>