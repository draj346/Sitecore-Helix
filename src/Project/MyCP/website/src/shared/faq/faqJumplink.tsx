'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import FaqJumplinkColumn from './faqJumplinkColumn';
import { FaqJumplinkTypes } from 'lib/component-props/faq';

type jumpLink = {
  jumplinkSize: number;
  offset: number;
};

const FaqJumplink = ({ faq, allFaq, totalLimit, allTab, onClick, counter }: FaqJumplinkTypes) => {
  const [offsetValues, setOffsetValues] = useState<jumpLink[]>([]);
  const [showContainer, setShowContainer] = useState<boolean>(true);
  const hide = 'hide';
  const contentHeight = 'content-height';
  const contentMarginRef = useRef<HTMLDivElement>(null);

  const handleViewAllChange = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.currentTarget;
    const grandParent = targetElement.parentNode?.parentNode as HTMLElement;
    const previousSection = grandParent?.previousSibling as HTMLElement;
    const previousSiblingElement = targetElement.parentNode?.previousSibling as HTMLElement;
    const nextSiblingElement = targetElement.nextSibling as HTMLElement;

    previousSection?.classList?.remove(contentHeight);
    previousSiblingElement?.classList?.add(hide);
    targetElement.classList.add(hide);
    nextSiblingElement?.classList?.remove(hide);
  }, []);

  const handleDismissChange = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.currentTarget;
    const previousSiblingElement = targetElement.parentNode?.previousSibling as HTMLElement;
    const grandParent = targetElement.parentNode?.parentNode as HTMLElement;
    const previousSection = grandParent?.previousSibling as HTMLElement;
    const previousSibling = targetElement.previousSibling as HTMLElement;

    targetElement.classList.add(hide);
    previousSiblingElement?.classList.remove(hide);
    previousSection?.classList.add(contentHeight);
    previousSibling?.classList.remove(hide);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let limitValue: number = totalLimit === 0 ? faq?.Questions?.length || 0 : totalLimit;
    const totalCount = limitValue;
    limitValue = Math.floor(limitValue / 3);
    let offset = 0;
    let jumplinkSize = 0;
    const jumpLinks: jumpLink[] = [];

    if (limitValue > 0) {
      if (allTab) {
        allFaq?.map((item) => jumpLinks.push({ jumplinkSize: item.Questions?.length, offset }));
      } else {
        Array.from({ length: 3 }, () => {
          jumplinkSize = limitValue <= 4 ? 4 : limitValue;
          jumplinkSize += offset;
          jumplinkSize = jumplinkSize > totalCount ? totalCount : jumplinkSize;

          if (jumplinkSize !== offset) {
            jumpLinks.push({ jumplinkSize, offset });
          }
          offset = jumplinkSize;
          return null;
        });
      }

      setOffsetValues(jumpLinks);
    }
  }, [faq, totalLimit, allFaq, allTab]);

  useEffect(() => {
    if (contentMarginRef.current) {
      const height = contentMarginRef.current.offsetHeight;
      setShowContainer(height >= 300);
    }
  }, [offsetValues, counter]);

  return (
    offsetValues.length > 0 && (
      <div className="faq-jumplink-container">
        <div className={`section ${showContainer && 'content-height'}`}>
          <div className="content-margin" ref={contentMarginRef}>
            <h6 className="h6-small bold">On this page</h6>
            <div className="links row row-cols-1 row-cols-md-2 row-cols-xl-3">
              {offsetValues.map((data, index) => {
                return (
                  <FaqJumplinkColumn
                    key={index}
                    faq={allTab ? allFaq?.find((_, i) => i === index) : faq}
                    limit={data.jumplinkSize}
                    offset={data.offset}
                    allTab={allTab}
                    onClick={onClick}
                  ></FaqJumplinkColumn>
                );
              })}
            </div>
          </div>
        </div>
        {showContainer && (
          <div className="btn-container">
            <div className="gradient"></div>
            <div className="toggle-btns">
              <div
                className="btn-view-all a with-icon chevron-down"
                onClick={(e) => handleViewAllChange(e)}
              >
                View All
              </div>
              <div
                className="btn-dismiss-all a with-icon chevron-up hide"
                onClick={(e) => handleDismissChange(e)}
              >
                Dismiss
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default FaqJumplink;
