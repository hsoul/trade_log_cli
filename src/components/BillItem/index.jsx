import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { List } from 'zarm';
import { useNavigate } from 'react-router-dom'
import CustomIcon from '../CustomIcon';
import { typeMap } from '@/utils';

import s from './style.module.less';

const BillItem = ({ bill }) => {
  const [win_num, setWin] = useState(0) // 胜利
  const [loss_num, setLoss] = useState(0) // 失败
  const [total_win_num, setTotalWin] = useState(0) // 总胜利

  const navigateTo = useNavigate()

  // 当添加账单是，bill.bills 长度变化，触发当日收支总和计算。
  useEffect(() => {
    const win_num = bill.list.filter(i => i.income > 0).reduce((curr, item) => {
      curr += Number(item.income)
      return curr
    }, 0)
    setWin(win_num)
    const loss_num = bill.list.filter(i => i.income < 0).reduce((curr, item) => {
      curr += Number(item.income)
      return curr
    }, 0)
    setLoss(loss_num)
    setTotalWin(win_num + loss_num)
  }, [bill.bills]);

  const goToDetail = (item) => {
    console.log("goToDetail", item)
    // navigateTo(`/trade/detail?id=${item.id}`)
    navigateTo(`/detail?id=${item.id}`)
  };

  return <div className={s.item}>
    <div className={s.headerDate}>
      <div className={s.date}>{bill.date}</div>
      <div className={s.money}>
        <span className={s.item}>
          <span className={s.name}>亏$:{' '}</span>
          <span className={s.number} style={{ color: '#661313' }}>{ loss_num.toFixed(2).replace(/\.?0+$/, '') }</span>
        </span>
        <span className={s.item}>
          <span className={s.name}>盈$: </span>
          <span className={s.number} style={{ color: '#1ad026' }}>{ win_num.toFixed(2).replace(/\.?0+$/, '') }</span>
        </span>
        <span className={s.item}>
          <span className={s.name}>合计$: </span>
          <span className={s.number} style={{ color: total_win_num < 0 ? '#661313' : '#1ad026' }}>{ total_win_num.toFixed(2).replace(/\.?0+$/, '') }</span>
        </span>
      </div>
    </div>
    {
      bill && bill.list.map(item => <List.Item
        className={s.bill}
        key={item.id}
        onClick={() => goToDetail(item)}
        title={
          <div className={s.itemlist}>
            <span className={s.dir}>{ item.dir }</span>
            <span className={s.strategy}>{ item.strategy }</span>
            <span className={s.trade_type}>{item.trade_type}</span>
            <span className={s.number} style={{ color: (Number(item.income) > 0) ? '#2ECC71' : '#D35400' }}>{`${item.income < 0 ? '' : '+'}${item.income}`}</span>
          </div>
        }
        description={
          <div>
            <div>
              {dayjs(Number(item.start_time * 1000)).format('HH:mm')} {item.end_time ? "-" + dayjs(Number(item.end_time * 1000)).format('HH:mm') : '    '} 
            </div>
          </div>
        }
      >
      </List.Item>)
    }
  </div>
};

BillItem.propTypes = {
  bill: PropTypes.object
};

export default BillItem;

