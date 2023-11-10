import React, { useEffect, useRef, useState } from 'react';
import { Icon, Progress } from 'zarm';
import cx from 'classnames';
import dayjs from 'dayjs';
import { get, typeMap } from '@/utils'
import CustomIcon from '@/components/CustomIcon'
import PopupDate from '@/components/PopupDate'
import PopupDir from '@/components/PopupDir'
import PopupType from '@/components/PopupType'
import PopupDateType from '@/components/PopupDateType'
import PopupStrategyType from '@/components/PopupStrategyType'
import s from './style.module.less';

let proportionChart = null

const  Data = () => {
  const dirRef = useRef(); // 方向 ref
  const typeRef = useRef(); // 类型 ref
  const dateTypeRef = useRef();
  const strategyRef = useRef();
  const [datePickMode, setDatePickMode] = useState("month");
  const dateRef = useRef(); // 月份筛选 ref
  const endDateRef = useRef(); // 时间段筛选 ref
  const monthRef = useRef();

  const [currentDir, setcurrentDir] = useState(); // 当前筛选方向类型
  const [currentSelect, setCurrentSelect] = useState(); // 当前筛选类型
  const [dateType, setDateType] = useState({name: '月', id: 'month'}); // 当前筛选类型 period
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
  const [endDate, setEndDate] = useState(); // 当前筛选时间
  const [currentStrategy, setCurrentStrategy] = useState(); // 当前筛选策略类型

  const [showData, setShowData] = useState({});

  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  const [pieType, setPieType] = useState('expense');

  useEffect(() => {
    getData()
    return () => {
      if (proportionChart)
        proportionChart.dispose(); // 每次组件卸载的时候，需要释放图表实例。clear 只是将其清空不会释放。
    }
  }, [currentDir, currentSelect, currentTime, endDate, currentStrategy]);
  
  const getData = async () => {
    let dirParam = currentDir
    if (!currentDir)
      dirParam = {id: 'all', name: '总'}

    let typeParam = currentSelect
    if (!currentSelect)
      typeParam = {id:'all', name:"所有"}

    let data;
    if (dateType.id == 'period')
    {
      if (!endDate) {
        console.log("getData", "参数不完整")
        return
      }
      if (dayjs(currentTime).isAfter(dayjs(endDate))) {
        console.log("getData", "开始时间不能大于结束时间")
        return
      }
      data = await get(`/api/tradelog/data?begin_date=${currentTime}&end_date=${endDate}&dir=${dirParam.id}&trade_type=${typeParam.id}&strategy=${currentStrategy && currentStrategy.id || 'all'}`);
    }
    else {
      data = await get(`/api/tradelog/data?date=${currentTime}&dir=${dirParam.id}&trade_type=${typeParam.id}&strategy=${currentStrategy && currentStrategy.id || 'all'}`);
      // data = await get(`/api/tradelog/data?date=2023-10&dir=${dirParam.id}&trade_type=${typeParam.id}`);
    }

    console.log(data)
    if (data && data.data)
      setShowData(data.data)
    // setPieChart(pieType == 'expense' ? expense_data : income_data);
  };
  
  // 切换收支构成类型
  const changeTotalType = (type) => {
    setTotalType(type)
  }

  // 切换饼图收支类型
  const changePieType = (type) => {
    setPieType(type);
    // 重绘饼图
    setPieChart(type == 'expense' ? expenseData : incomeData);
  }

  // 绘制饼图方法
  const setPieChart = (data) => {
    if (window.echarts) {
      proportionChart = echarts.init(document.getElementById('proportion'));
      proportionChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          // 图例
          legend: {
              data: data.map(item => item.type_name)
          },
          series: [
            {
              name: '支出',
              type: 'pie',
              radius: '55%',
              data: data.map(item => {
                return {
                  value: item.number,
                  name: item.type_name
                }
              }),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
      })
    }
  }

  // 添加方向弹窗
  const dirToggle = () => {
    dirRef.current && dirRef.current.show()
  };

  const dateTypeToggle = () => {
    dateTypeRef.current && dateTypeRef.current.show()
  };

  const strategyToggle = () => {
    strategyRef.current && strategyRef.current.show()
  };

  // 选择月份弹窗
  const monthToggle = () => {
    monthRef.current && monthRef.current.show()
  };

  const endDateToggle = () => {
    endDateRef.current && endDateRef.current.show()
  };

  const toggle = () => {
    typeRef.current && typeRef.current.show()
  };

  // 筛选方向类型
  const selectDir = (item) => {
    console.log(item)
    setcurrentDir(item)
  }

  // 筛选做单类型
  const select = (item) => {
    console.log(item)
    setCurrentSelect(item)
  }

  const selectStrategy = (item) => {
    console.log(item)
    setCurrentStrategy(item)
  }

  // 筛选日期类型
  const selectDateType = (item) => {
    setDateType(item)
    console.log(item)
    if (item.id != "period") {
      setDatePickMode(item.id)
    } else {
      setDatePickMode("date")
    }
    console.log(datePickMode)
  }

  // 筛选月份
  const selectMonth = (item) => {
    console.log(item)
    setCurrentTime(item)
  }

  // 筛选结束时间
  const selectEndDate = (item) => {
    console.log(item)
    setEndDate(item)
  }

  return <div className={s.data}>
    <div className={s.total}>
      <div className={s.typeWrap}>
        <div className={s.left} onClick={dirToggle}>
          <span className={s.title}>{ currentDir && currentDir.name || '方向' } <Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
        <div className={s.left} onClick={toggle}>
          <span className={s.title}>{ currentSelect && currentSelect.name || '类型' } <Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
        <div className={s.left} onClick={strategyToggle}>
          <span className={s.title}>{ currentStrategy && currentStrategy.name || '策略' } <Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
        <div className={s.left}>
          <span className={s.title} onClick={dateTypeToggle}>{ dateType && dateType.name || "日期类型" } <Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
        <div className={s.right}>
          <span className={s.title} onClick={monthToggle}>{ currentTime }<Icon className={s.arrow} type="arrow-bottom" /></span>
        </div>
        {
          (dateType && dateType.id == "period") && (
              <div className={s.right} style={{ display: dateType.id=="period" ? "block" : "none" }}>
              <span className={s.title} onClick={endDateToggle}>{ endDate || "结束时间"} <Icon className={s.arrow} type="arrow-bottom" /></span>
            </div>
          )
        }
      </div>
    </div>
    <div className={s.itemlist} style={{backgroundColor:'#39b54a'}}>
      <div className={s.item}>
        <span className={s.sufix}>总投入:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ showData.total_investment || 0 }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>总获益$:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.total_profit ? Number(showData.total_profit).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>总亏损$:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.total_loss_num ? Number(showData.total_loss_num).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>总次数:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ showData.total_num || 0 }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>交易天数:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.trade_days && Number(showData.total_num) > 0 ? showData.trade_days : 0)}</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>开始时间:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.trade_start_day && Number(showData.total_num) > 0 ? showData.trade_start_day : 0)}</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>结束时间:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.trade_end_day && Number(showData.total_num) > 0 ? showData.trade_end_day : 0)}</span>
        </div>
      </div>
    </div>
    
    <div className={s.coreshow} style={{backgroundColor:'#8799a3'}}>
      <div className={s.item}>
        <span className={s.sufix}>累计收益率:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.total_profit_rate ? Number(showData.total_profit_rate).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>平均收益率</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.average_profit_rate ? Number(showData.average_profit_rate).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>胜率:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.win_rate ? Number(showData.win_rate).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>平均盈亏比率:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.average_profit_loss_ratio ? Number(showData.average_profit_loss_ratio).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>月盈利率:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.monthly_profit_rate ? Number(showData.monthly_profit_rate).toFixed(2) : 0) }</span>
        </div>
      </div>
    </div>


    <div className={s.coreshow} style={{backgroundColor:'#f37b1d'}}>
      <div className={s.item}>
        <span className={s.sufix}>盈利次数:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.total_win_times ? Number(showData.total_win_times) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>单笔最大盈利:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.max_profit_per_trade ? Number(showData.max_profit_per_trade).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>单日最大盈利:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.max_profit_per_day ? Number(showData.max_profit_per_day).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>盈利单平均盈利:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.average_profit_per_win_trade ? Number(showData.average_profit_per_win_trade).toFixed(2) : 0) }</span>
        </div>
      </div>
      <div className={s.item}>
        <span className={s.sufix}>盈利单平均盈利率:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.average_profit_rate_per_win_trade ? Number(showData.average_profit_rate_per_win_trade).toFixed(2) : 0) }</span>
        </div>
      </div>
      <div className={s.item}>
        <span className={s.sufix}>最大连续盈利日数:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.max_consecutive_win_days ? Number(showData.max_consecutive_win_days).toFixed(2) : 0) }</span>
        </div>
      </div>
    </div>

    <div className={s.coreshow} style={{backgroundColor:'#e54d42'}}>
      <div className={s.item}>
        <span className={s.sufix}>亏损次数:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.total_loss_times ? Number(showData.total_loss_times) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>单笔最大亏损:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.max_loss_per_trade ? Number(showData.max_loss_per_trade).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>单日最大亏损:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.max_loss_per_day ? Number(showData.max_loss_per_day).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>亏损单平均亏损$:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.average_loss_per_loss_trade ? Number(showData.average_loss_per_loss_trade).toFixed(2) : 0) }</span>
        </div>
      </div>

      <div className={s.item}>
        <span className={s.sufix}>平均盈亏比率:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.average_loss_rate_per_loss_trade ? Number(showData.average_loss_rate_per_loss_trade).toFixed(2) : 0) }</span>
        </div>
      </div>
      
      <div className={s.item}>
        <span className={s.sufix}>最大连续亏损日数:</span>
        <div className={s.pinput}>
          <span className={s.title}>{ (showData.max_consecutive_loss_days ? Number(showData.max_consecutive_loss_days) : 0) }</span>
        </div>
      </div>
    </div>

    <div className={s.structure}>
      {/* <div className={s.head}>
        <span className={s.title}>收支构成</span>
        <div className={s.tab}>
          <span onClick={() => changeTotalType('expense')} className={cx({ [s.expense]: true, [s.active]: totalType == 'expense' })}>支出</span>
          <span onClick={() => changeTotalType('income')} className={cx({ [s.income]: true, [s.active]: totalType == 'income' })}>收入</span>
        </div>
      </div> */}
      {/* <div className={s.content}>
        {
          (totalType == 'expense' ? expenseData : incomeData).map(item => <div key={item.type_id} className={s.item}>
            <div className={s.left}>
              <div className={s.type}>
                <span className={cx({ [s.expense]: totalType == 'expense', [s.income]: totalType == 'income' })}>
                  <CustomIcon
                    type={item.type_id ? typeMap[item.type_id].icon : 1}
                  />
                </span>
                <span className={s.name}>{ item.type_name }</span>
              </div>
              <div className={s.progress}>¥{ Number(item.number).toFixed(2) || 0 }</div>
            </div>
            <div className={s.right}>
              <div className={s.percent}>
                <Progress
                  shape="line"
                  percent={Number((item.number / Number(totalType == 'expense' ? totalExpense : totalIncome)) * 100).toFixed(2)}
                  theme='primary'
                />
              </div>
            </div>
          </div>)
        }
      </div> */}
      <div className={s.proportion}>
        {/* <div className={s.head}>
          <span className={s.title}>收支构成</span>
          <div className={s.tab}>
            <span onClick={() => changePieType('expense')} className={cx({ [s.expense]: true, [s.active]: pieType == 'expense'  })}>支出</span>
            <span onClick={() => changePieType('income')} className={cx({ [s.income]: true, [s.active]: pieType == 'income'  })}>收入</span>
          </div>
        </div> */}
        {/* <div id="proportion"></div> */}
        {/* <div className={s.time}>
          <span>策略</span>
          <span>{detail.strategy}</span>
        </div>
        <div className={s.time}>
          <span>方向</span>
          <span>{detail.dir}</span>
        </div>
        <div className={s.time}>
          <span>类型</span>
          <span>{detail.trade_type}</span>
        </div>
        <div className={s.time}>
          <span>仓位</span>
          <span>{detail.num}</span>
        </div>
        <div className={s.time}>
          <span>收益</span>
          <span>{detail.income}</span>
        </div>
        <div className={s.time}>
          <span>开仓均价</span>
          <span>{detail.start_price}</span>
        </div>
        <div className={s.time}>
          <span>平仓均价</span>
          <span>{detail.finish_price}</span>
        </div>
        <div className={s.time}>
          <span>止盈</span>
          <span>{detail.stop_win}</span>
        </div>
        <div className={s.time}>
          <span>止损</span>
          <span>{detail.stop_loss}</span>
        </div>
        <div className={s.time}>
          <span>强平</span>
          <span>{detail.force_price}</span>
        </div> */}
      </div>
    </div>
    <PopupDir ref={dirRef} onSelect={selectDir} />
    <PopupType ref={typeRef} onSelect={select} />
    <PopupStrategyType ref={strategyRef} onSelect={selectStrategy} />
    <PopupDateType ref={dateTypeRef} onSelect={selectDateType} />
    <PopupDate ref={monthRef} mode={datePickMode} onSelect={selectMonth} />
    <PopupDate ref={endDateRef} mode={datePickMode} onSelect={selectEndDate} />

  </div>
}

export default Data;