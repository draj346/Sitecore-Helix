import Link from 'next/link';
import React, { useState } from 'react';

interface NavigationValue {
  value: string;
}

interface Url {
  path: string;
}

interface BreadcrumbItem {
  navigationTitle: NavigationValue;
  navigationFilter: NavigationValue;
  url: Url;
}

interface BreadcrumbsData extends BreadcrumbItem {
  ancestors: BreadcrumbItem[];
}

type BreadcrumbProps = {
  fields: {
    data: {
      breadcrumbsdata: BreadcrumbsData;
    };
  };
};

export const Default = ({ fields }: BreadcrumbProps): JSX.Element => {
  const [hideFilterId] = useState<string>('{5C0D0560-4EC4-405A-A9D2-8004DBA7ACE6}');

  if (
    fields?.data?.breadcrumbsdata &&
    fields.data.breadcrumbsdata.navigationFilter.value !== hideFilterId
  ) {
    return (
      <div className="component breadcrumb navigation-title col-12 container triangle-separator">
        <div className="component-content">
          <nav>
            <ol>
              {fields.data.breadcrumbsdata.ancestors
                .toReversed()
                .map((ancestor: BreadcrumbItem, index: number) => (
                  <li className="breadcrumb-item" key={index}>
                    <div className="navigation-title field-navigationtitle">
                      <Link href={ancestor.url.path}>{ancestor.navigationTitle.value}</Link>
                    </div>
                    <span className="separator"></span>
                  </li>
                ))}
              <li className="breadcrumb-item last">
                <div className="navigation-title field-navigationtitle">
                  <span>{fields.data.breadcrumbsdata.navigationTitle.value}</span>
                </div>
                <span className="separator"></span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    );
  }

  return <></>;
};
