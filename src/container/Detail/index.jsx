import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Toast, Collapse, Panel, Button, Cell} from 'zarm';
import qs from 'query-string';
import cx from 'classnames';
import dayjs from 'dayjs';
import Header from '@/components/Header';
import CustomIcon from '@/components/CustomIcon';
import PopupAddBill from '@/components/PopupAddBill'
import { get, post, typeMap } from '@/utils';
import moment from 'moment';

import s from './style.module.less'

const Detail = () => {
  try {
  const addRef = useRef();
  const [activeKey, setActiveKey] = useState(0); // 汇总
  const location = useLocation();
  const navigateTo = useNavigate();
  const { id } = qs.parse(location.search);
  const [detail, setDetail] = useState({});
  const [durationTime, setDurationTime] = useState();

  const [items, setItems] = useState([
    {id: '1', title: 'item1', content: 'content1xdasfdf'},
    {id: '2', title: 'item2', content: 'content2'},
  ])
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const [enterReasonItems, setEnterReasonItems] = useState([
    {id: '1', title: '突破', content: '颈线突破'},
    {id: '2', title: '回车', content: '回撤302'},
  ])
  const [enterReasonEditId, setEnterReasonEditId] = useState(null);
  const [enterReasonEditTitle, setEnterReasonEditTitle] = useState('');

  const [exitReasonItems, setExitReasonItems] = useState([
    {id: '1', title: '反常', content: '趋势破坏sadfasdfasdfasdfasdfasdfasdfasdf'},
    {id: '2', title: '异常', content: '突破支撑位asdfsajdfklasjdfklasjldfkjasdklfjaslkdfjsakldfjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'},
  ]);
  const [exitReasonEditId, setExitReasonEditId] = useState(null);
  const [exitReasonEditTitle, setExitReasonEditTitle] = useState('');
  
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
      onOk: async () => {
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

  function addItem() {
    setItems([...items, {id: Date.now().toString(), title: 'NewItem'}]);
  }

  function deleteItem(index) {
    let newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  function onEdit(item) {
    setEditId(item.id);
    setEditTitle(item.title);
  };

  function saveEdit(id) {
    setItems(items.map((item) => item.id === id ? { ...item, content: editTitle } : item));
    setEditId(null);
  }

  function addEnterReasonItem() {
    setEnterReasonItems([...enterReasonItems, {id: Date.now().toString(), title: 'NewItem'}]);
  }

  function deleteEnterReasonItem(index) {
    let newItems = [...enterReasonItems];
    newItems.splice(index, 1);
    setEnterReasonItems(newItems);
  }

  function onEnterReasonEdit(item) {
    setEnterReasonEditId(item.id);
    setEnterReasonEditTitle(item.title);
  };

  function saveEnterReasonEdit(id) {
    setEnterReasonItems(enterReasonItems.map((item) => item.id === id ? { ...item, content: enterReasonEditTitle } : item));
    setEnterReasonEditId(null);
  }

  function addExitReasonItem() {
    setExitReasonItems([...exitReasonItems, {id: Date.now().toString(), title: 'NewItem'}]);
  }

  function deleteExitReasonItem(index) {
    let newItems = [...exitReasonItems];
    newItems.splice(index, 1);
    setExitReasonItems(newItems);
  }

  function onExitReasonEdit(item) {
    setExitReasonEditId(item.id);
    setExitReasonEditTitle(item.title);
  };

  function saveExitReasonEdit(id) {
    setExitReasonItems(exitReasonItems.map((item) => item.id === id ? { ...item, content: exitReasonEditTitle } : item));
    setExitReasonEditId(null);
  }

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
          <span>盈利</span>
          <span>{detail.income}</span>
        </div>
        <div className={s.time}>
          <span>持仓价格</span>
          <span>{detail.start_price}</span>
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
        </div>
        <div className={s.time}>
          <span>成交价格</span>
          <span>{detail.finish_price}</span>
        </div>
        <div>       
          <div className={s.time}>
            <span>进场理由</span>
            <span>{detail.summarize}</span>
          </div>
          {enterReasonItems.map((item, index) => 
            <Panel 
              key={index}
              title={item.content}
              more={
                <div>
                  <Button onClick={() => deleteEnterReasonItem(index)}>删除</Button>
                  <Button onClick={() => onEnterReasonEdit(item)}>编辑</Button>
                </div>
              }
            >
              {enterReasonEditId === item.id ? (
                <div>
                  <input type="text" value={enterReasonEditTitle} onChange={(e) => setEnterReasonEditTitle(e.target.value)} />
                  <button onClick={() => saveEnterReasonEdit(item.id)}>Save</button>
                  <button onClick={() => setEnterReasonEditId(null)}>Cancel</button>
                </div>
              ) : (
                ""
              )}
            </Panel>
          )}
          <Button onClick={addEnterReasonItem}>+</Button>
        </div>

        <div>       
          <div className={s.time}>
            <span>出场理由</span>
            <span>{detail.exit_reason}</span>
          </div>
          {exitReasonItems.map((item, index) => 
            <Panel 
              key={index}
              title={item.content}
              more={
                <div>
                  <Button onClick={() => deleteExitReasonItem(index)}>删除</Button>
                  <Button onClick={() => onExitReasonEdit(item)}>编辑</Button>
                </div>
              }
            >
              {exitReasonEditId === item.id ? (
                <div>
                  <input type="text" value={exitReasonEditTitle} onChange={(e) => setExitReasonEditTitle(e.target.value)} />
                  <button onClick={() => saveExitReasonEdit(item.id)}>Save</button>
                  <button onClick={() => setExitReasonEditId(null)}>Cancel</button>
                </div>
              ) : (
                ""
              )}
            </Panel>
          )}
          <Button onClick={addExitReasonItem}>+</Button>
        </div>

        <div>       
          <div className={s.time}>
            <span>总结</span>
            <span>{detail.summarize}</span>
          </div>
          {items.map((item, index) => 
            <Panel 
              key={index}
              title={item.content}
              more={
                <div>
                  <Button onClick={() => deleteItem(index)}>删除</Button>
                  <Button onClick={() => onEdit(item)}>编辑</Button>
                </div>
              }
            >
              {editId === item.id ? (
                <div>
                  <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <button onClick={() => saveEdit(item.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              ) : (
                ""
              )}
            </Panel>
          )}
          <Button onClick={addItem}>+</Button>
        </div>
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