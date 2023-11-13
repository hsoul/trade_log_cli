import React, { useEffect, useRef, useState } from 'react'
import { Icon, Pull } from 'zarm'
import dayjs from 'dayjs'
import PopupDir from '@/components/PopupDir'
import PopupType from '@/components/PopupType'
import PopupStrategyType from '@/components/PopupStrategyType'
import PopupDateType from '@/components/PopupDateType'
import PopupDate from '@/components/PopupDate'
import PopupAddBill from '@/components/PopupAddBill'
import BillItem from '@/components/BillItem'
import Empty from '@/components/Empty'
import CustomIcon from '@/components/CustomIcon'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils'

import s from './style.module.less'

const Home = () => {
  try {
    const dirRef = useRef() // 方向 ref
    const typeRef = useRef() // 类型 ref
    const strategyRef = useRef();
    const dateTypeRef = useRef()
    const monthRef = useRef() // 月份筛选 ref
    const endDateRef = useRef() // 添加账单 ref
    const addRef = useRef() // 添加账单 ref
    const [totalLoss, setTotalLoss] = useState(0) // 亏损
    const [totalIncome, setTotalIncome] = useState(0) // 盈利
    const [totalWin, setTotalWin] = useState(0) // 汇总
    const [currentDir, setcurrentDir] = useState({id: 'all', name: '总'}) // 当前筛选方向类型
    const [currentSelect, setCurrentSelect] = useState({id:'all', name:"所有"}) // 当前筛选类型
    const [currentStrategy, setCurrentStrategy] = useState(); // 当前筛选策略类型
    const [dateType, setDateType] = useState({id:"year", name: "年"}) // 当前筛选类型 period
    const [datePickMode, setDatePickMode] = useState("year")
    const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY')) // 当前筛选时间
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD')) // 当前筛选时间
    const [page, setPage] = useState(1) // 分页
    const [list, setList] = useState([]) // 账单列表
    const [totalPage, setTotalPage] = useState(0) // 分页总数
    const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal) // 下拉刷新状态
    const [loading, setLoading] = useState(LOAD_STATE.normal) // 上拉加载状态
    
    let isGettingList = false

    useEffect(() => {
      getBillList() // 初始化
    }, [page, currentSelect, currentTime, endDate, currentDir, currentStrategy])
  
    const getBillList = async () => {
      if (isGettingList) {
        setTimeout(() => {
          refreshData()
        }, 200)
        return
      }
      isGettingList = true
      const { data } = await get(`/api/tradelog/list?trade_type=${currentSelect.id}&filter_date=${currentTime}&end_date=${endDate}&time_filter_type=${dateType.id}&dir_filter_type=${currentDir.id}&page=${page}&strategy=${currentStrategy && currentStrategy.id || 'all'}`)
      isGettingList = false
      const sorted_list = data.list.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      }).map(item => {
        return {
          ...item,
          list: item.list.sort((a, b) => {
            return new Date(b.start_time) - new Date(a.start_time)
          })
        }
      })
  
      console.log("getBillList", sorted_list, page)
      
      if (page == 1) { // 下拉刷新，重制数据
        setList(data.list)
      } else {
        setList(list.concat(data.list))
      }
      setTotalLoss(String(data.total_out.toFixed(2)).padEnd(5, ' '))
      setTotalIncome(data.total_income.toFixed(2))
      setTotalWin((data.total_out + data.total_income).toFixed(2))
      setTotalPage(data.total_page)
      // 上滑加载状态
      setLoading(LOAD_STATE.success)
      setRefreshing(REFRESH_STATE.success)
    }
  
    // 请求列表数据
    const refreshData = () => {
      setRefreshing(REFRESH_STATE.loading)
      console.log("refreshData", page)
      if (page != 1) {
        setPage(1)
      } else {
        getBillList()
      }
    }
  
    const loadData = () => {
      console.log("loadData", page)
      if (page < totalPage) {
        setLoading(LOAD_STATE.loading)
        setPage(page + 1)
      }
    }

    // 添加方向弹窗
    const dirToggle = () => {
      dirRef.current && dirRef.current.show()
    }

    // 添加账单弹窗
    const toggle = () => {
      typeRef.current && typeRef.current.show()
    }

    const strategyToggle = () => {
      strategyRef.current && strategyRef.current.show()
    };

    const dateTypeToggle = () => {
      dateTypeRef.current && dateTypeRef.current.show()
    }

    // 选择月份弹窗
    const monthToggle = () => {
      monthRef.current && monthRef.current.show()
    }

    const endDateToggle = () => {
      endDateRef.current && endDateRef.current.show()
    }

    // 添加账单弹窗
    const addToggle = () => {
      addRef.current && addRef.current.show()
    }

    // 筛选方向类型
    const selectDir = (item) => {
      setRefreshing(REFRESH_STATE.loading)
      setPage(1)
      setcurrentDir(item)
    }
  
    // 筛选做单类型
    const select = (item) => {
      setRefreshing(REFRESH_STATE.loading)
      setPage(1)
      setCurrentSelect(item)
    }

    const selectStrategy = (item) => {
      console.log(item)
      setCurrentStrategy(item)
    }

    // 筛选日期类型
    const selectDateType = (item) => {
      // setPage(1)
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
      setRefreshing(REFRESH_STATE.loading)
      setPage(1)
      setCurrentTime(item)
    }

    // 筛选结束时间
    const selectEndDate = (item) => {
      setRefreshing(REFRESH_STATE.loading)
      setPage(1)
      setEndDate(item)
    }
  
    return <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span className={s.income}>总($):<b style={{ color: totalWin < 0 ? '#661313' : '#1ad026' }}>{Number(totalWin).toFixed(2).replace(/\.?0+$/, '')}</b></span>
          <span className={s.income}>盈($):<b style={{ color: '#1ad026' }}>{Number(totalIncome).toFixed(2).replace(/\.?0+$/, '')}</b></span>
          <span className={s.expense}>亏($):<b style={{ color: '#661313' }}>{Number(totalLoss).toFixed(2).replace(/\.?0+$/, '')}</b></span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left} onClick={dirToggle}>
            <span className={s.title}>{ currentDir.name || '方向' } <Icon className={s.arrow} type="arrow-bottom" /></span>
          </div>
          <div className={s.left} onClick={toggle}>
            <span className={s.title}>{ currentSelect.name || '类型' } <Icon className={s.arrow} type="arrow-bottom" /></span>
          </div>
          <div className={s.left} onClick={strategyToggle}>
            <span className={s.title}>{ currentStrategy && currentStrategy.name || '策略' } <Icon className={s.arrow} type="arrow-bottom"/></span>
          </div>
          <div className={s.right}>
            <span className={s.time} onClick={dateTypeToggle}>{ dateType.name || "日期类型" } <Icon className={s.arrow} type="arrow-bottom" /></span>
          </div>
          <div className={s.right}>
            <span className={s.time} onClick={monthToggle}>{ currentTime }<Icon className={s.arrow} type="arrow-bottom" /></span>
          </div>
          <div className={s.right} style={{ display: dateType.id=="period" ? "block" : "none" }}>
            <span className={s.time} onClick={endDateToggle}>{ endDate } <Icon className={s.arrow} type="arrow-bottom" /></span>
          </div>
        </div>
      </div>
      <div className={s.contentWrap}>
        {
          list.length ? <Pull
            animationDuration={200}
            stayTime={400}
            refresh={{
              state: refreshing,
              handler: refreshData
            }}
            load={{
              state: loading,
              distance: 200,
              handler: loadData
            }}
          >
            {
              list.map((item, index) => <BillItem
                bill={item}
                key={index}
              />)
            }
          </Pull> : <Empty />
        }
      </div>
      <div className={s.add} onClick={addToggle}><CustomIcon type='tianjia' /></div>
      <PopupDir ref={dirRef} onSelect={selectDir}/>
      <PopupType ref={typeRef} onSelect={select}/>
      <PopupStrategyType ref={strategyRef} onSelect={selectStrategy}/>
      <PopupDateType ref={dateTypeRef} onSelect={selectDateType}/>
      <PopupDate ref={monthRef} mode={datePickMode} onSelect={selectMonth}/>
      <PopupDate ref={endDateRef} mode={datePickMode} onSelect={selectEndDate}/>
      <PopupAddBill ref={addRef} onReload={refreshData}/>
    </div>
  } catch (error)
  {
    console.log(error)
  }
}

export default Home