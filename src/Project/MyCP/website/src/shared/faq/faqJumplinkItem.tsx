import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { FaqJumplinkItemTypes, Question } from 'lib/component-props/faq';
import Link from 'next/link';

const FaqJumplinkItem = ({ faq, limit, offset, allTab, onClick }: FaqJumplinkItemTypes) => {
  const getCollapseId = (question: Question) =>
    allTab ? `all-collapse-${question?.id}` : `collapse-${question?.id}`;

  return (
    <>
      {faq &&
        faq.Questions?.length > 0 &&
        faq.Questions.slice(offset, limit).map((question: Question, index: number) => (
          <li key={index}>
            <Link
              className="btn-mini"
              data-bs-target={`#${getCollapseId(question)}`}
              href="/"
              onClick={onClick}
            >
              <Text field={question.Heading}></Text>
            </Link>
          </li>
        ))}
    </>
  );
};

export default FaqJumplinkItem;
