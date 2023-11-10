import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Popup, Icon } from 'zarm'
import cx from 'classnames'
import { get } from '@/utils'

import s from './style.module.less'

const PopupStrategyType = forwardRef(({ onSelect }, ref) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('all');
  const [strategyType, setStrategyType] = useState([
    {id:'SMC', name: "SMC"},
    {id:'pinbar', name: "pinbar"},
  ])

  useEffect(() => {

  }, [])

  if (ref) {
    ref.current = {
      show: () => {
        setShow(true)
      },
      close: () => {
        setShow(false)
      }
    }
  };

  const choseType = (item) => {
    setActive(item.id)
    setShow(false)
    onSelect(item)
  };

  return <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={false}
    mountContainer={() => document.body}
  >
    <div className={s.popupType}>
      <div className={s.header}>
        请选择类型
        <Icon type="wrong" className={s.cross} onClick={() => setShow(false)} />
      </div>
      <div className={s.content}>
        <div onClick={() => choseType({ id: 'all' })} className={cx({ [s.all]: true, [s.active]: active == 'all' })}>全部类型</div>
        <div className={s.title}>类型</div>
        <div className={s.incomeWrap}>
          {
            strategyType.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active == item.id})} >{ item.name }</p>)
          }
        </div>
      </div>
    </div>
  </Popup>
});

PopupStrategyType.propTypes = {
  onSelect: PropTypes.func
}

export default PopupStrategyType;