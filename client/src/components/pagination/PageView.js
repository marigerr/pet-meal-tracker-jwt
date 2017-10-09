'use strict';

import React from 'react';

const PageView = (props) => {
  // had to change linkClassName from const to let
  let cssClassName = props.pageClassName;
  let linkClassName = props.pageLinkClassName;
  const onClick = props.onClick;
  const href = props.href;
  let ariaLabel = 'Page ' + props.page +
    (props.extraAriaContext ? ' ' + props.extraAriaContext : '');
  let ariaCurrent = null;

  // adapted react-paginate to change linkClassName on a tag instead of li.   Originally changed cssClassName on li tag with activeClassName
  if (props.selected) {
    ariaCurrent = 'page';
    ariaLabel = 'Page ' + props.page + ' is your current page';
    if (typeof(linkClassName) !== 'undefined') {
      linkClassName = linkClassName + ' ' + props.activeClassName;
    } else {
      linkClassName = props.activeClassName;
    }
  }

  return (
      <li className={cssClassName}>
          <a onClick={onClick}
             className={linkClassName}
             href={href}
             tabIndex="0"
             aria-label={ariaLabel}
             aria-current={ariaCurrent}
             onKeyPress={onClick}>
            {props.page}
          </a>
      </li>
  )
}

export default PageView;
