'use client';

import React, { useCallback, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { FAQ, IndividualFaqType, Question } from 'lib/component-props/faq';
import { CollapseType, TabType } from 'lib/component-props';
import { EditFrame, RichText, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import FaqJumplink from './faqJumplink';
import { DefaultEditFrameButtons, GetEditFrameProps } from 'src/utils/EditFrameConstant';

const IndividualFaqTab = (props: IndividualFaqType) => {
  const {
    faq,
    count,
    showTitle,
    expandAccordion,
    collapseAccordion,
    allTab,
    showJumplink,
    allFaq,
    onClick,
    counter,
    collapse,
    expand,
  } = props;
  const anchorRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  const collapseRef = useRef<CollapseType | null>(null);
  const tabRef = useRef<TabType | null>(null);
  const { sitecoreContext } = useSitecoreContext();

  const getKey = () => (allTab ? `all-${faq?.Key?.value}` : faq?.Key?.value);

  const getQuestionId = (question: Question) => (allTab ? `all-${question.id}` : question.id);

  const getHeadingId = (question: Question) =>
    allTab ? `all-heading-${question.id}` : `heading-${question.id}`;

  const getCollapseId = (question: Question) =>
    allTab ? `all-collapse-${question.id}` : `collapse-${question.id}`;

  const getAccordionId = (faq: FAQ) =>
    allTab ? `all-accordion-${faq?.Key?.value}` : `accordion-${faq?.Key?.value}`;

  const redirectToFAQ = useCallback((e: MouseEvent, target: string) => {
    const accordionId = allTab ? `all-${target.substring(1)}` : target.substring(1);

    const accordion = document.getElementById(accordionId);
    const currentTabPane = (e.target as Element)?.closest('.tab-pane');

    if (!accordion || !currentTabPane) return;

    const accordionTabPane = accordion.closest('.tab-pane');
    if (!accordionTabPane) return;

    if (currentTabPane.id !== accordionTabPane.id) {
      const tabSelector = `[data-bs-target='#${accordionTabPane.id}']`;
      const tabElement = document.querySelector(tabSelector);

      if (tabElement) {
        new tabRef.current!(tabElement).show();
      }
    }

    if (!accordion.classList.contains('show')) {
      const bsCollapse = new collapseRef.current!(accordion as HTMLElement, {
        toggle: true,
      });
      bsCollapse.show();
    }

    const parentElement = accordion.parentElement;
    if (!parentElement) return;

    const accordionPosition = parentElement.getBoundingClientRect().top + window.scrollY - 100;

    window.scrollTo({
      top: accordionPosition,
      behavior: 'smooth',
    });
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const anchor = (e.target as Element).closest('a');
    if (anchor) {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        // if (!navigate.isReady) return;
        navigate.push(href);
      } else {
        const accordianId = anchor.getAttribute('data-bs-target');
        if (accordianId) {
          redirectToFAQ(e, accordianId);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap').then(({ Collapse, Tab }) => {
        collapseRef.current = Collapse;
        tabRef.current = Tab;
      });
    }
  }, []);

  useEffect(() => {
    if (anchorRef.current != null) {
      const container = anchorRef.current;
      container.addEventListener('click', handleClick);
      return () => container.removeEventListener('click', handleClick);
    }
  }, [redirectToFAQ]);

  return (
    <>
      {showJumplink && (
        <FaqJumplink
          faq={faq}
          allFaq={allFaq}
          totalLimit={count}
          allTab={allTab}
          onClick={onClick}
          counter={counter}
        ></FaqJumplink>
      )}
      <div className="accordion-container" key={getKey()} id={getKey()}>
        <div className="d-flex justify-content-start justify-content-md-end faq-exp-col-btn">
          {showTitle && <h2 className="h4">{faq?.Name.value}</h2>}
          <button
            className="btn btn-secondary btn-faq-mini btn-mini left with-bs-icon chevron-up-and-down expand-btn"
            type="button"
            onClick={expandAccordion}
          >
            <Text field={expand}></Text>
          </button>

          <button
            className="btn btn-secondary btn-faq-mini  btn-mini left with-bs-icon chevron-up-and-down-inverted collapse-btn"
            type="button"
            onClick={collapseAccordion}
          >
            <Text field={collapse}></Text>
          </button>
        </div>
        <div className="accordion accordion-flush" ref={anchorRef}>
          {faq &&
            faq.Questions.map(
              (question, index) =>
                (count > index || count === 0) && (
                  <EditFrame
                    key={index}
                    {...GetEditFrameProps(question?.id, DefaultEditFrameButtons)}
                  >
                    <div className="accordion-item" key={getQuestionId(question)}>
                      <h3 className="accordion-header semibold h5" id={getHeadingId(question)}>
                        {sitecoreContext.pageEditing ? (
                          <Text field={question.Heading}></Text>
                        ) : (
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${getCollapseId(question)}`}
                            aria-expanded="false"
                            aria-controls={getCollapseId(question)}
                          >
                            <Text field={question.Heading}></Text>
                          </button>
                        )}
                      </h3>
                      {sitecoreContext.pageEditing ? (
                        <RichText
                          tag="div"
                          className="accordion-body"
                          field={question.Description}
                        />
                      ) : (
                        <div
                          id={getCollapseId(question)}
                          className="accordion-collapse collapse"
                          aria-labelledby={getHeadingId(question)}
                          data-bs-parent={`#${getAccordionId(faq)}`}
                        >
                          <RichText
                            tag="div"
                            className="accordion-body"
                            field={question.Description}
                          />
                        </div>
                      )}
                    </div>
                  </EditFrame>
                )
            )}
        </div>
      </div>
    </>
  );
};

export default React.memo(IndividualFaqTab);
