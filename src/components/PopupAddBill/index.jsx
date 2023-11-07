import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon, Toast, KeyboardPicker, Keyboard, Modal, Input, Cell, DatePicker, DateSelect, Button, Panel, Switch } from 'zarm';
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
  num : 1,
  income: 2,
  to_rate: 3,
  start_price: 4,
  promise_money: 5,
  stop_loss: 6,
  finish_price: 7,
  force_price: 8,
}

const DATE_TYPE = {
  start_time : 1,
  end_time: 2,
}

const INPUT_TYPE = {
  start_reason: 1,
  exit_reason: 2,
  summarize: 3,
}

const DIR_TYPE = {
  '多': "more",
  '空': "less",
}

const TRADE_TYPE = {
  '长': "long",
  '中': "middle",
  '短': "short",
  '极': "ponit",
}

const STRATEGY_TYPE = {
  'SMC': "聪明钱",
}

const PopupAddBill = forwardRef(({ detail = {}, onReload }, ref) => {
  try {
  const dateRef = useRef()
  const id = detail && detail.id // 外部传进来的账单详情 id
  const [show, setShow] = useState(false); // 控制此组件的显示和隐藏

  const [activeDate, setActiveDate] = useState(null); // 激活的日期类型
  const [activeInput, setActiveInput] = useState(null); // 激活的输入框类型
  const [amount, setAmount] = useState(''); // 数字输入框值
  const [showRemark, setShowRemark] = useState(false); // 文本输入框值

  const [showStartReason, setShowStartReason] = useState();
  const [showExitReason, setShowExitReason] = useState();
  const [showSummarize, setShowSummarize] = useState();

  const [dirSelect, setDirSelect] = useState([{id: 'more', name:'多'}, {id: 'less', name: '空'}]) // 方向类型数组: 多、空、所有
  const [tradeTypeSelect, setTradeTypeSelect] = useState([{id:'long', name:'长'}, {id:'middle', name:'中'}, {id:'short', name:'短'}, {id:'ponit', name:'极'},]) // 交易类型数组：长、中、多、极
  const [strategyTypeSelect, setStrategyTypeSelect] = useState([{id:'SMC', name: "聪明钱"}]) // 策略类型数组：SMC

  const [startTime, setStartTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss')); // 开始时间
  const [endTime, setEndTime] = useState(); // 结束时间
  const [num, setNum] = useState(); // 仓位
  const [dir, setDir] = useState({id: 'more', name:'多'}) // 方向类型数组: 多、空、所有
  const [tradeType, setTradeType] = useState({id:'short', name:'短'}) // 交易类型数组：长、中、多、极
  const [strategyType, setStrategyType] = useState({id:'SMC', name: "聪明钱"}) // 策略类型数组：SMC
  const [income, setIncome] = useState() // 收入
  const [toRate, setToRate] = useState() // 盈亏比
  const [startPrice, setStartPrice] = useState() // 开仓均价
  const [promiseMoney, setPromiseMoney] = useState() // 止盈
  const [stopLoss, setStopLoss] = useState() // 止损
  const [finishPrice, setFinishPrice] = useState() // 平仓均价
  const [forcePrice, setForcePrice] = useState() // 强平价格
  const [startReason, setStartReason] = useState('') // 开仓理由
  const [exitReason, setExitReason] = useState() // 平仓理由
  const [summarize, setSummarize] = useState() // 总结

  useEffect(() => {
    if (detail.id) {
      setStartTime(dayjs(Number(detail.start_time) * 1000).format('YYYY-MM-DD HH:mm:ss'))
      if (detail.end_time)
        setEndTime(dayjs(Number(detail.end_time) * 1000).format('YYYY-MM-DD HH:mm:ss'))
      setNum(detail.num)
      setDir({id: DIR_TYPE[detail.dir], name: detail.dir})
      setTradeType({id: TRADE_TYPE[detail.trade_type], name: detail.trade_type})
      setStrategyType({id: detail.strategy, name: STRATEGY_TYPE[detail.strategy]})
      setIncome(detail.income)
      setToRate(detail.to_rate)
      setStartPrice(detail.start_price)
      setPromiseMoney(detail.promise_money)
      setStopLoss(detail.stop_loss)
      setForcePrice(detail.force_price)
      setFinishPrice(detail.finish_price)
      setStartReason(detail.start_reason)
      setExitReason(detail.exit_reason)
      setSummarize(detail.summarize)
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

  

  // 日期弹窗
  const handleDatePop = (type) => {
    console.log("handleDatePop", type)
    dateRef.current && dateRef.current.show()
    setActiveDate(type)
  }

  // 日期选择回调
  const selectDate = (val) => {
    console.log("selectDate", val, activeDate)
    if (activeDate == DATE_TYPE.start_time)
      setStartTime(val)
    else if (activeDate == DATE_TYPE.end_time)
      setEndTime(val)
  }

  // 选择账单类型
  const choseType = (item, select_type) => {
    console.log(item, select_type)
    if (select_type == SELECT_TYPE.dir)
      setDir(item)
    else if (select_type == SELECT_TYPE.trade)
      setTradeType(item)
    else if (select_type == SELECT_TYPE.strategy)
      setStrategyType(item)
    else
      console.log("choseType error", select_type)
    console.log("currentType", select_type)
  }
  
  const addBill = async () => { // 添加账单
    const params = {
      start_time: dayjs(startTime).unix(),
      end_time: endTime ? dayjs(endTime).unix() : null,
      num: num,
      dir: dir.name,
      trade_type: tradeType.name,
      strategy: strategyType.id,
      income: income && income != ''? Number(income).toFixed(2) : undefined,
      to_rate: toRate && toRate != '' ? Number(toRate).toFixed(2) : undefined,
      start_price: startPrice && startPrice != '' ? Number(startPrice).toFixed(2) : undefined,
      promise_money: promiseMoney && promiseMoney != ''? Number(promiseMoney).toFixed(2) : undefined,
      stop_loss: stopLoss && stopLoss != '' ? Number(stopLoss).toFixed(2) : undefined,
      finish_price: finishPrice && finishPrice != '' ? Number(finishPrice).toFixed(2) : undefined,
      force_price: forcePrice && forcePrice != '' ? Number(forcePrice).toFixed(2) : undefined,
      start_reason: startReason,
      exit_reason: exitReason,
      summarize: summarize,
    }

    console.log("addBill", params)
    if (id) { // 如果有 id 需要调用详情更新接口
      params.id = id; 
      const result = await post('/api/tradelog/update', params);
      Toast.show('修改成功');
    } else {
      const result = await post('/api/tradelog/add', params);
      Toast.show('添加成功');
    }
    setShow(false);
    if (onReload) onReload();
  }

  const toggleVisibility = (type) => {
    console.log("toggleVisibility", type)
    if (type == INPUT_TYPE.start_reason)
      setShowStartReason(!showStartReason)
    else if (type == INPUT_TYPE.exit_reason)
      setShowExitReason(!showExitReason)
    else if (type == INPUT_TYPE.summarize)
      setShowSummarize(!showSummarize)
    else
      console.log("toggleVisibility error", type)
  };

  const handleFocus = (type, cur_num) => {
    console.log("handleFocus", type, cur_num)
    setActiveInput(type);
    if (cur_num)
      setAmount(cur_num)
    else
      setAmount('')
  }

  const handleBlur = (type) => {
    console.log("handleBlur", type)
  }

  function isNumber(str) {
    setTestStr(str)
    const num = Number(str);
    return !isNaN(num) && (num.toString() === str);
  }

  const handleInputChange = (event, type) => {
    console.log("handleInputChange", event.target.value, type)
    // const value = parseFloat(event.target.value);
    if (isNumber(event.target.value) || event.target.value == '') {
      setAmount(event.target.value)
      handleUpdateNum(event.target.value, false)
    }
  }

  const handleUpdateNum = (value, is_close) => {
    // console.log("handleUpdateNum", value, activeInput, is_close)
    if (NUMBER_TYPE.num == activeInput)
      setNum(value)
    else if (NUMBER_TYPE.income == activeInput)
      setIncome(value)
    else if (NUMBER_TYPE.to_rate == activeInput)
      setToRate(value)
    else if (NUMBER_TYPE.start_price == activeInput)
      setStartPrice(value)
    else if (NUMBER_TYPE.promise_money == activeInput)
      setPromiseMoney(value)
    else if (NUMBER_TYPE.stop_loss == activeInput)
      setStopLoss(value)
    else if (NUMBER_TYPE.finish_price == activeInput)
      setFinishPrice(value)
    else if (NUMBER_TYPE.force_price == activeInput)
      setForcePrice(value)
    else
      console.log("handleUpdateNum error", activeInput)
    if (is_close) {
      setActiveInput(null)
      setAmount('')
    }
  }

  const setShowTextInput = (type) => {
    console.log("setShowTextInput", type, showRemark)
    if (type == showRemark)
      setShowTextInput(null)
    else 
      setShowRemark(type)
  }

  const [testStr, setTestStr] = useState('')
  const testFunc = () => {
    Toast.show({content:testStr, duration: 1000});
  }

  const textInputOnFocus = (event) => {
    console.log("textInputOnFocus", event)
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
      <div className={s.itemlist}>
        <div className={s.item}>
          <span className={s.sufix}>开始时间:</span>
          <span className={s.time} onClick={() => handleDatePop(DATE_TYPE.start_time)}>{ startTime ? startTime : '' }</span>
        </div>

        <div className={s.item}>
          <span className={s.sufix}>结束时间:</span>
          <span className={s.time} onClick={() => handleDatePop(DATE_TYPE.end_time)}>{ endTime ? endTime : '' }</span>
        </div>

        <div className={s.item}>
          <span className={s.sufix}>仓位:</span>
          <input
              className={s.pinput}
              id="number-input"
              type="number"
              value={activeInput == NUMBER_TYPE.num ? (amount != '' ? amount : '') : (num ? num : '')}
              onInput={(event) => handleInputChange(event, NUMBER_TYPE.num)}
              onBlur={() => handleBlur(NUMBER_TYPE.num)}
              onFocus={() => handleFocus(NUMBER_TYPE.num, num)}
            />
        </div>

        <div className={s.item}>
          <span className={s.sufix}>收益:</span>
          <input
              className={s.pinput}
              id="number-input"
              type="number"
              value={activeInput == NUMBER_TYPE.income ? (amount != '' ? amount : '') : (income ? income : '')}
              onInput={(event) => handleInputChange(event, NUMBER_TYPE.income)}
              onBlur={() => handleBlur(NUMBER_TYPE.income)}
              onFocus={() => handleFocus(NUMBER_TYPE.income, income)}
            />
        </div>
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

      <div className={s.itemlist}>
        <div className={s.item}>
          <span className={s.sufix}>盈亏比:</span>
          <input
              className={s.pinput}
              id="number-input"
              type="number"
              value={activeInput == NUMBER_TYPE.to_rate ? (amount != '' ? amount : '') : (toRate ? toRate : '')}
              onInput={(event) => handleInputChange(event, NUMBER_TYPE.to_rate)}
              onBlur={() => handleBlur(NUMBER_TYPE.to_rate)}
              onFocus={() => handleFocus(NUMBER_TYPE.to_rate, toRate)}
            />
        </div>

        <div className={s.item}>
          <span className={s.sufix}>开仓均价:</span>
          <input
              className={s.pinput}
              id="number-input"
              type="number"
              value={activeInput == NUMBER_TYPE.start_price ? (amount != '' ? amount : '') : (startPrice ? startPrice : '')}
              onInput={(event) => handleInputChange(event, NUMBER_TYPE.start_price)}
              onBlur={() => handleBlur(NUMBER_TYPE.start_price)}
              onFocus={() => handleFocus(NUMBER_TYPE.start_price, startPrice)}
            />
        </div>
        
        <div className={s.item}>
          <span className={s.sufix}>止盈:</span>
          <input
              className={s.pinput}
              id="number-input"
              type="number"
              value={activeInput == NUMBER_TYPE.promise_money ? (amount != '' ? amount : '') : (promiseMoney ? promiseMoney : '')}
              onInput={(event) => handleInputChange(event, NUMBER_TYPE.promise_money)}
              onBlur={() => handleBlur(NUMBER_TYPE.promise_money)}
              onFocus={() => handleFocus(NUMBER_TYPE.promise_money, promiseMoney)}
            />
        </div>
        <div className={s.item}>
          <span className={s.sufix}>止损:</span>
          <input
              className={s.pinput}
              id="number-input"
              type="number"
              value={activeInput == NUMBER_TYPE.stop_loss ? (amount != '' ? amount : '') : (stopLoss ? stopLoss : '')}
              onInput={(event) => handleInputChange(event, NUMBER_TYPE.stop_loss)}
              onBlur={() => handleBlur(NUMBER_TYPE.stop_loss)}
              onFocus={() => handleFocus(NUMBER_TYPE.stop_loss, stopLoss)}
            />
        </div>
        <div className={s.item}>
          <span className={s.sufix}>平仓均价:</span>
          <input
              className={s.pinput}
              id="number-input"
              type="number"
              value={activeInput == NUMBER_TYPE.finish_price ? (amount != '' ? amount : '') : (finishPrice ? finishPrice : '')}
              onInput={(event) => handleInputChange(event, NUMBER_TYPE.finish_price)}
              onBlur={() => handleBlur(NUMBER_TYPE.finish_price)}
              onFocus={() => handleFocus(NUMBER_TYPE.finish_price, finishPrice)}
            />
        </div>
        <div className={s.item}>
          <span className={s.sufix}>强平价格:</span>
          <input
              className={s.pinput}
              id="number-input"
              type="number"
              value={activeInput == NUMBER_TYPE.force_price ? (amount != '' ? amount : '') : (forcePrice ? forcePrice : '')}
              onInput={(event) => handleInputChange(event, NUMBER_TYPE.force_price)}
              onBlur={() => handleBlur(NUMBER_TYPE.force_price)}
              onFocus={() => handleFocus(NUMBER_TYPE.force_price, forcePrice)}
            />
        </div>
      </div>

      <div className={s.remark}>
        {
          showRemark == INPUT_TYPE.start_reason ? (
            <div>
              <span onClick={() => setShowTextInput(INPUT_TYPE.start_reason)}>{'开仓理由:'}</span>
              <Input
                autoHeight
                showLength
                maxLength={640}
                type="text"
                rows={3}
                value={startReason}
                placeholder="请输开仓理由"
                onChange={(val) => setStartReason(val)}
                onBlur={() => setShowTextInput(null)}
                onFocus={textInputOnFocus}
              /> 
            </div>
          ): startReason ? (
            <div>
              <span onClick={() => setShowTextInput(INPUT_TYPE.start_reason)}>{'开仓理由:'}</span>
              <button onClick={() => toggleVisibility(INPUT_TYPE.start_reason)}>{(showStartReason && startReason ? '隐藏' : '显示')} </button>
              {showStartReason && <p style={{whiteSpace: "pre-line"}}>{startReason}</p>}
            </div>
          ) : <span onClick={() => setShowTextInput(INPUT_TYPE.start_reason)}>{'开仓理由:'}</span>
        }
      </div>
      
      <div className={s.remark}>
        {
          showRemark == INPUT_TYPE.exit_reason ? (
          <div>
            <span onClick={() => setShowTextInput(INPUT_TYPE.exit_reason)}>{'平仓理由:'}</span>
            <Input
              autoHeight
              showLength
              maxLength={640}
              type="text"
              rows={3}
              value={exitReason}
              placeholder="请输平仓理由"
              onChange={(val) => setExitReason(val)}
              onBlur={() => setShowTextInput(null)}
            />
          </div>
          ) : exitReason ? (
            <div>
              <span onClick={() => setShowTextInput(INPUT_TYPE.exit_reason)}>{'平仓理由:'}</span>
              <button onClick={() => toggleVisibility(INPUT_TYPE.exit_reason)}>{(showExitReason && exitReason ? '隐藏' : '显示')}  </button>
              {showExitReason && <p style={{whiteSpace: "pre-line"}}>{exitReason}</p>}
            </div>
          ) : <span onClick={() => setShowTextInput(INPUT_TYPE.exit_reason)}>{'平仓理由:'}</span> 
        }
      </div>

      <div className={s.remark}>
        {
          showRemark == INPUT_TYPE.summarize ? (
            <div>
              <span onClick={() => setShowTextInput(INPUT_TYPE.summarize)}>{'总结:'}</span>
              <Input
                autoHeight
                showLength
                maxLength={640}
                type="text"
                rows={3}
                value={summarize}
                placeholder="请输入总结"
                onChange={(val) => setSummarize(val)}
                onBlur={() => setShowTextInput(null)}
              />
            </div> 
          ) : summarize ? (
            <div>
              <span onClick={() => setShowTextInput(INPUT_TYPE.summarize)}>{'总结:'}</span>
              <button onClick={() => toggleVisibility(INPUT_TYPE.summarize)}>{(showSummarize && summarize ? '隐藏' : '显示')}  </button>
              {showSummarize && <p style={{whiteSpace: "pre-line"}}>{summarize}</p>}
            </div>
          ) : <span onClick={() => setShowTextInput(INPUT_TYPE.summarize)}>{'总结:'}</span>
        }
      </div>
      {/* <KeyboardPicker type="price" visible={activeInput != null && show} onKeyClick={(value) => handleMoney(value)} />  */}
      <PopupDate ref={dateRef} mode="datetime" onSelect={selectDate} />
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button theme="primary" onClick={addBill}>{id ? '更新':'新建'}</Button>
      </div>
      {/* <Button theme="primary" onClick={testFunc}>{'test'}</Button> */}
    </div>
  </Popup>    
  } catch (error) {
    console.log(error)
  }
});

PopupAddBill.propTypes = {
  detail: PropTypes.object,
  onReload: PropTypes.func
}

export default PopupAddBill;