import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Toast, Collapse, Panel, Button, List} from 'zarm';
import qs from 'query-string';
import cx from 'classnames';
import dayjs from 'dayjs';
import Header from '@/components/Header';
import CustomIcon from '@/components/CustomIcon';
import PopupAddBill from '@/components/PopupAddBill'
import { get, post, typeMap } from '@/utils';
import moment from 'moment';

import s from './style.module.less'

const INPUT_TYPE = {
  start_reason: 1,
  exit_reason: 2,
  summarize: 3,
}

const Detail = () => {
  try {
  const addRef = useRef();
  const [activeKey, setActiveKey] = useState(0); // 汇总
  const location = useLocation();
  const navigateTo = useNavigate();
  const { id } = qs.parse(location.search);
  const [detail, setDetail] = useState({});
  const [durationTime, setDurationTime] = useState();

  const [showStartReason, setShowStartReason] = useState();
  const [showExitReason, setShowExitReason] = useState();
  const [showSummarize, setShowSummarize] = useState();
    
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const { data } = await get(`/api/tradelog/detail?id=${id}`);
    if (data && data.start_time && data.end_time) {
      const diff = Number(data.end_time) - Number(data.start_time)
      const du = moment.duration(18834, 'seconds')
      setDurationTime(du)
      data["durationTime"] = du
      console.log("getDetail", du.humanize(), du.months(), du.days(), du.hours(), du.minutes(), du.seconds())
    }
    setDetail(data);
    console.log("getDetail", data)
  }

  // 删除方法
  const deleteDetail = () => {
    Modal.confirm({
      title: '删除',
      content: '确认删除账单？',
      onConfirm: async () => {
        const { data } = await post('/api/tradelog/delete', { id })
        Toast.show('删除成功')
        navigateTo(-1)
      },
    });
  }

  // 打开编辑弹窗方法
  const openModal = () => {
    addRef.current && addRef.current.show()
  }

  const toggleVisibility = (type) => {
    if (type == INPUT_TYPE.start_reason)
      setShowStartReason(!showStartReason)
    else if (type == INPUT_TYPE.exit_reason)
      setShowExitReason(!showExitReason)
    else if (type == INPUT_TYPE.summarize)
      setShowSummarize(!showSummarize)
    else
      console.log("toggleVisibility error", type)
    console.log("toggleVisibility", type, showStartReason, showExitReason, showSummarize)
  };

  return <div className={s.detail}>
    <Header title='交易详情' />
    <div className={s.card}>
      <div className={s.type}>
        <span className={cx({ [s.expense]: detail.pay_type == 1, [s.income]: detail.pay_type == 2 })}>
          <CustomIcon className={s.iconfont} type={detail.type_id ? typeMap[detail.type_id].icon : 1} />
        </span>
        <span>{ detail.type_name || '' }</span>
      </div>
      {
        detail.pay_type == 1
          ? <div className={cx(s.amount, s.expense)}>-{ detail.amount }</div>
          : <div className={cx(s.amount, s.incom)}>+{ detail.amount }</div>
      }
      <div className={s.info}>
        <div className={s.time}>
          <span>开始时间</span>
          <span>{dayjs(Number(detail.start_time * 1000)).format('YYYY-MM-DD HH:mm')}</span>
        </div>
        {
          detail.end_time && (
            <div className={s.time}>
              <span>结束时间</span>
              <span>{dayjs(Number(detail.end_time * 1000)).format('YYYY-MM-DD HH:mm')}</span>
            </div>
          )
        }
        {
          durationTime && (
            <div className={s.time}>
              <span>持续时间</span>
              <span> {durationTime.months() > 0 ? Number(durationTime.months()) + 'mt:' : ''} {durationTime.days() > 0 ? durationTime.days() + 'd:' : ''} {durationTime.hours() > 0 ? durationTime.hours() + 'h:' : ''} {durationTime.minutes() > 0 ? durationTime.minutes() + 'm:' : ''} {durationTime.seconds() > 0 ? durationTime.seconds() + 's' : ''} </span>
            </div>
          )
        }
        <div className={s.time}>
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
          <span>{detail.promise_money}</span>
        </div>
        <div className={s.time}>
          <span>止损</span>
          <span>{detail.stop_loss}</span>
        </div>
        <div className={s.time}>
          <span>强平</span>
          <span>{detail.force_price}</span>
        </div>
        {
          detail.start_reason && (
            <div>
              <span>{'开仓理由:'}</span>
              <button onClick={() => toggleVisibility(INPUT_TYPE.start_reason)}>{(showStartReason && detail.start_reason ? '隐藏' : '显示')} </button>
              {showStartReason && <p style={{whiteSpace: "pre-line"}}>{detail.start_reason}</p>}
            </div>
          )
        }

        {
          detail.exit_reason && (
            <div>
              <span>{'平仓理由:'}</span>
              <button onClick={() => toggleVisibility(INPUT_TYPE.exit_reason)}>{(showExitReason && detail.exit_reason ? '隐藏' : '显示')} </button>
              {showExitReason && <p style={{whiteSpace: "pre-line"}}>{detail.exit_reason}</p>}
            </div>
          )
        }

        {
          detail.summarize && (
            <div>
              <span>{'总结:'}</span>
              <button onClick={() => toggleVisibility(INPUT_TYPE.summarize)}>{(showSummarize && detail.summarize ? '隐藏' : '显示')} </button>
              {showSummarize && <p style={{whiteSpace: "pre-line"}}>{detail.summarize}</p>}
            </div>
          )
        }

      </div>
      <div className={s.operation}>
        <span onClick={deleteDetail}><CustomIcon type='shanchu' />删除</span>
        <span onClick={openModal}><CustomIcon type='tianjia' />编辑</span>
      </div>
    </div>
    <PopupAddBill ref={addRef} detail={detail} onReload={getDetail} />
  </div>
  } catch (error) {
    console.log(error)
  }
};

export default Detail;