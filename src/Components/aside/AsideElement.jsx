import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const AsideMenuItem = (props) => {
  return (
    <>
        <div className='menu-item my-2 px-5'>
        <div className={clsx('menu-link without-sub','text-light-gray')}>
          <span className='menu-icon'>
            <FontAwesomeIcon icon={props.icon} className='svg-icon-2 ' />
          </span>
        <span className='menu-title'>{props.title}</span>
      </div>
    </div>     
    </>
  )
}

export {AsideMenuItem}
