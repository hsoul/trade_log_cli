import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Cell } from 'zarm';
import { useNavigate } from 'react-router-dom'
import CustomIcon from '../CustomIcon';
import { typeMap } from '@/utils';

import s from './style.module.less';

const BillItem = ({ bill }) => {
  const [win_num, setWin] = useState(0) // 胜利
  const [loss_num, setLoss] = useState(0) // 失败
  const [total_win_num, setTotalWin] = useState(0) // 总胜利

  // const [income, setIncome] = useState(0);
  // const [expense, setExpense] = useState(0);
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
    navigateTo(`/trade/detail?id=${item.id}`)
  };

  return <div className={s.item}>
    <div className={s.headerDate}>
      <div className={s.date}>{bill.date}</div>
      <div className={s.money}>
        <span>
          <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt='支' />
            <span>¥{ loss_num.toFixed(2) }</span>
        </span>
        <span>
          <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
          <span>¥{ win_num.toFixed(2) }</span>
        </span>
        <span>
          <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
          <span>¥{ total_win_num.toFixed(2) }</span>
        </span>
      </div>
    </div>
    {
      bill && bill.list.map(item => <Cell
        className={s.bill}
        key={item.id}
        onClick={() => goToDetail(item)}
        title={
          <>
            <CustomIcon
              className={s.itemIcon}
              type={item.id}
            />
            <span>{ item.dir }</span>
          </>
        }
        description={<span style={{ color: item.dir == '多' ? 'purple' : 'Blue' }}>{`${item.income < 0 ? '' : '+'}${item.income}`}</span>}
        help={<div>{dayjs(Number(item.start_time * 1000)).format('HH:mm')} {item.dir ? `| ${item.dir}` : ''} {item.start_time ? `| ${item.start_time}` : ''}</div>}

        // description={<span style={{ color: item.pay_type == 2 ? 'red' : '#39be77' }}>{`${item.pay_type == 1 ? '-' : '+'}${item.amount}`}</span>}
        // help={<div>{dayjs(Number(item.date)).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}</div>}
      >
      </Cell>)
    }
  </div>
};

BillItem.propTypes = {
  bill: PropTypes.object
};

export default BillItem;

