import React, { isValidElement } from 'react';
import { Children } from 'react';
import Link from 'next/link';
import { TabTypes } from 'lib/component-props/faq';
import { EditFrame, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { GetEditFrameButtons, GetEditFrameProps } from 'src/utils/EditFrameConstant';

type TabListTypes = {
  tabList: TabTypes[];
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
};

const TabList = ({ tabList, children, onClick }: TabListTypes) => {
  const { sitecoreContext } = useSitecoreContext();

  return (
    <>
      <div className="tab-nav">
        <ul className="nav common-tablist" role="tablist">
          {tabList.length > 0 &&
            tabList.map((item, index) => (
              <EditFrame
                key={index}
                {...GetEditFrameProps(
                  item?.id,
                  GetEditFrameButtons(['Questions', 'Name', 'Key', 'Value'])
                )}
              >
                <li className="nav-item" role="presentation" key={index}>
                  <Link
                    className={`nav-link ${index === 0 ? 'active' : ''}`}
                    id={item.key}
                    key={item.key || index}
                    data-bs-target={`#${item.href}`}
                    data-bs-toggle="tab"
                    role="tab"
                    href="/"
                    aria-selected={index === 0 ? 'true' : 'false'}
                    tabIndex={0}
                    onClick={onClick}
                  >
                    {sitecoreContext.pageEditing ? item.value || '[No Title]' : item.value}
                  </Link>
                </li>
              </EditFrame>
            ))}
        </ul>
      </div>
      <div className="tab-content">
        {tabList.length > 0 &&
          tabList.map((item, index) => (
            <div
              className={`tab-pane ${index === 0 ? 'active show' : ''}`}
              id={item.href}
              role="tabpanel"
              aria-labelledby={item.key}
              key={index}
            >
              <div className="row">
                <div className="component content col-12">
                  <div className="component-content">
                    {Children.map(children, (child) => {
                      if (!isValidElement(child)) {
                        return null; // or handle non-element children
                      }
                      return <>{child.key === item.key ? child : ''}</>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default TabList;
