import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon, Toast, Keyboard, Modal, Input  } from 'zarm';
import cx from 'classnames'
import dayjs from 'dayjs'; 
import CustomIcon from '../CustomIcon'
import PopupDate from '../PopupDate'
import { get, typeMap, post } from '@/utils'

import s from './style.module.less';

const SELECT_TYPE = {
  dir : 1,
  trade: 2,
  strategy: 3,
}

const NUMBER_TYPE = {
  dir : 1,
  trade: 2,
  strategy: 3,
}

const PopupAddBill = forwardRef(({ detail = {}, onReload }, ref) => {
  const dateRef = useRef()
  const id = detail && detail.id // 外部传进来的账单详情 id
  const [show, setShow] = useState(false);

  const [payType, setPayType] = useState('expense'); // 支出或收入类型
  const [expense, setExpense] = useState([]); // 支出类型数组
  // const [income, setIncome] = useState([]); // 收入类型数组
  const [currentType, setCurrentType] = useState({});
  const [amount, setAmount] = useState(''); // 账单价格
  const [remark, setRemark] = useState(''); // 备注
  const [showRemark, setShowRemark] = useState(false); // 备注输入框
  const [date, setDate] = useState(new Date()); // 日期

  const [selectType, setSelectType] = useState(); // 选择类型

  const [dirSelect, setDirSelect] = useState([{id: 'more', name:'多'}, {id: 'less', name: '空'}]) // 方向类型数组: 多、空、所有
  const [tradeTypeSelect, setTradeTypeSelect] = useState([{id:'long', name:'长'}, {id:'middle', name:'中'}, {id:'short', name:'短'}, {id:'ponit', name:'极'},]) // 交易类型数组：长、中、多、极
  const [strategyTypeSelect, setStrategyTypeSelect] = useState([{id:'SMC', name: "聪明钱"}]) // 策略类型数组：SMC

  const [startTime, setStartTime] = useState(new Date()); // 开始时间
  const [endTime, setEndTime] = useState(); // 结束时间
  const [num, setNum] = useState(0); // 仓位
  const [dir, setDir] = useState({id: 'more', name:'多'}) // 方向类型数组: 多、空、所有
  const [tradeType, setTradeType] = useState({id:'short', name:'短'}) // 交易类型数组：长、中、多、极
  const [strategyType, setStrategyType] = useState({id:'SMC', name: "聪明钱"}) // 策略类型数组：SMC
  const [income, setIncome] = useState() // 收入
  const [toRate, setToRate] = useState(0) // 盈亏比
  const [startPrice, setStartPrice] = useState(0) // 开仓均价
  const [promiseMoney, setPromiseMoney] = useState(0) // 止盈
  const [stopLoss, setStopLoss] = useState(0) // 止损
  const [finishPrice, setFinishPrice] = useState() // 平仓均价
  const [forcePrice, setForcePrice] = useState(0) // 强平价格
  const [startReason, setStartReason] = useState() // 开仓理由
  const [exitReason, setExitReason] = useState() // 平仓理由
  const [summarize, setSummarize] = useState() // 总结
 
  useEffect(() => {
    if (detail.id) {
      setPayType(detail.pay_type == 1 ? 'expense' : 'income')
      setCurrentType({
        id: detail.type_id,
        name: detail.type_name
      })
      setRemark(detail.remark)
      setAmount(detail.amount)
      setDate(dayjs(Number(detail.date)).$d)
    }
  }, [detail])

  if (ref) {
    ref.current = {
      show: () => {
        setShow(true);
      },
      close: () => {
        setShow(false);
      }
    }
  };

  useEffect(() => {
    getList()
  }, []);

  const getList = async () => {
    // const { data } = await get('/api/tradelog/types')
    // setDir(dir)
    // setTradeType(data.trade_type)
    // if (!id) {
    //   // setCurrentType(_expense[0]);
    // };
    // console.log("getList", data)
  }

  // 切换收入还是支出
  const changeType = (type) => {
    setPayType(type);
    // 切换之后，默认给相应类型的第一个值
    if (type == 'expense') {
      setCurrentType(expense[0]);
    } else {
      setCurrentType(income[0]);
    }
  };

  // 日期弹窗
  const handleDatePop = () => {
    dateRef.current && dateRef.current.show()
  }

  // 日期选择回调
  const selectDate = (val) => {
    setDate(val)
  }

  // 选择账单类型
  const choseType = (item, select_type) => {
    console.log(item, select_type)
    setSelectType(select_type)
    setCurrentType(item)
    if (select_type == SELECT_TYPE.dir)
      setDir(item)
    else if (select_type == SELECT_TYPE.trade)
      setTradeType(item)
    else if (select_type == SELECT_TYPE.strategy)
      setStrategyType(item)
    else
      console.log("choseType error", select_type)
    console.log("currentType", currentType, select_type)
  }

  // 监听输入框改变值
  const handleMoney = (value) => {
    value = String(value)
    if (value == 'close') return 
    // 点击是删除按钮时
    if (value == 'delete') {
      let _amount = amount.slice(0, amount.length - 1)
      setAmount(_amount)
      return
    }
    // 点击确认按钮时
    if (value == 'ok') {
      addBill()
      return
    }
    // amount = 2.9
    // // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
    // if (value == '.' && amount.includes('.')) return
    // // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
    // if (value != '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return
    // // amount += value
    // setAmount(amount + value)
  }
  // 添加账单
  const addBill = async () => {
    // if (!amount) {
    //   Toast.show('请输入具体金额')
    //   return
    // }
    // const params = {
    //   amount: Number(amount).toFixed(2),
    //   type_id: currentType.id,
    //   type_name: currentType.name,
    //   date: dayjs(date).unix() * 1000,
    //   pay_type: payType == 'expense' ? 1 : 2,
    //   remark: remark || ''
    // }
    const params = {
      start_time: dayjs(startTime).unix(),
      end_time: endTime ? dayjs(endTime).unix() : null,
      num: num,
      dir: dir.name,
      trade_type: tradeType.name,
      strategy: strategyType,
      income: income ? Number(income).toFixed(2) : null,
      to_rate: Number(toRate).toFixed(2),
      start_price: Number(startPrice).toFixed(2),
      promise_money: Number(promiseMoney).toFixed(2),
      stop_loss: Number(stopLoss).toFixed(2),
      finish_price: finishPrice ? Number(finishPrice).toFixed(2) : null,
      force_price: Number(forcePrice).toFixed(2),
      start_reason: null,
      exit_reason: null,
      summarize: null,
    }
    if (id) {
      params.id = id;
      // 如果有 id 需要调用详情更新接口
      const result = await post('/api/tradelog/update', params);
      Toast.show('修改成功');
    } else {
      const result = await post('/api/tradelog/add', params);
      // setAmount('');
      // setPayType('expense');
      // setCurrentType(expense[0]);
      // setDate(new Date());
      // setRemark('');
      Toast.show('添加成功');
    }
    setShow(false);
    if (onReload) onReload();
  }

  return <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={false}
    mountContainer={() => document.body}
  >
    <div className={s.addWrap}>
      <header className={s.header}>
        <span className={s.close} onClick={() => setShow(false)}><Icon type="wrong" /></span>
      </header>
      <div className={s.filter}>
        <div className={s.type}>
          <span onClick={() => changeType('expense')} className={cx({ [s.expense]: true, [s.active]: payType == 'expense' })}>支出</span>
          <span onClick={() => changeType('income')} className={cx({ [s.income]: true, [s.active]: payType == 'income' })}>收入</span>
          {/* <span onClick={() => changeType('income')} className={cx({ [s.income]: true, [s.active]: payType == 'income' })}>收入</span> */}
        </div>
        <div className={s.time} onClick={handleDatePop}>{dayjs(date).format('MM-DD')} <Icon className={s.arrow} type="arrow-bottom" /></div>
      </div>
      <div className={s.money}>
        <span className={s.sufix}>¥</span>
        <span className={cx(s.amount, s.animation)}>{amount}</span>
      </div>
      <div className={s.typeWarp}>
        <div className={s.typeBody}>
          {
            dirSelect.map(item => <div onClick={() => choseType(item, SELECT_TYPE.dir)} key={item.id} className={s.typeItem}>
              <span className={cx({[s.iconfontWrap]: true, [s.expense]: true, [s.active]: dir.id == item.id})}>
              </span>
              <span>{item.name}</span>
            </div>)
          }
        </div>
      </div>

      <div className={s.typeWarp}>        
        <div className={s.typeBody}>
          {
            tradeTypeSelect.map(item => <div onClick={() => choseType(item, SELECT_TYPE.trade)} key={item.id} className={s.typeItem}>
              <span className={cx({[s.iconfontWrap]: true, [s.income]: true, [s.active]: tradeType.id == item.id})}>
              </span>
              <span>{item.name}</span>
            </div>)
          }
        </div>
      </div>

      <div className={s.typeWarp}>        
        <div className={s.typeBody}>
          {
            strategyTypeSelect.map(item => <div onClick={() => choseType(item, SELECT_TYPE.strategy)} key={item.id} className={s.typeItem}>
              <span className={cx({[s.iconfontWrap]: true, [s.expense]: true, [s.active]: strategyType.id == item.id})}>
              </span>
              <span>{item.name}</span>
            </div>)
          }
        </div>
      </div>

      <div className={s.remark}>
        {
          showRemark ? <Input
            autoHeight
            showLength
            maxLength={50}
            type="text"
            rows={3}
            value={remark}
            placeholder="请输入备注信息"
            onChange={(val) => setRemark(val)}
            onBlur={() => setShowRemark(false)}
          /> : <span onClick={() => setShowRemark(true)}>{remark || '添加备注'}</span>
        }
      </div>
      <Keyboard type="price" onKeyClick={(value) => handleMoney(value)} />
      <PopupDate ref={dateRef} onSelect={selectDate} />
    </div>
  </Popup>
});

PopupAddBill.propTypes = {
  detail: PropTypes.object,
  onReload: PropTypes.func
}

export default PopupAddBill;