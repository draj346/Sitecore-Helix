import React from 'react';
import FaqJumplinkItem from './faqJumplinkItem';
import { FaqJumplinkItemTypes } from 'lib/component-props/faq';

const FaqJumplinkColumn = ({ faq, limit, offset, allTab, onClick }: FaqJumplinkItemTypes) => {
  const getKey = () => (allTab ? `all-${faq?.Key?.value}` : faq?.Key?.value);

  return (
    faq && (
      <>
        <div className="col" data-target={getKey()}>
          {allTab && <p className="semibold">{faq.Name?.value}</p>}
          <ul>
            <FaqJumplinkItem
              faq={faq}
              limit={limit}
              offset={offset}
              allTab={allTab}
              onClick={onClick}
            ></FaqJumplinkItem>
          </ul>
        </div>
      </>
    )
  );
};

export default FaqJumplinkColumn;
