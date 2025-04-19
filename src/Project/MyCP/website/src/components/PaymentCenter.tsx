import React from 'react';
import { Field, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { PaymentOption, PaymentOptionLink } from 'lib/component-props/payment';

type PaymentCenterProps = {
  fields: {
    Disclaimer: Field<string>;
    Children: PaymentOption[];
  };
};
export const Default = ({ fields }: PaymentCenterProps): JSX.Element => (
  <div className="component content col-12">
    <div className="component-content">
      <div className="row">
        <div className="component-make-payment">
          <div className="container remove-tablet-default-padding">
            {fields.Children.map((paymentOption: PaymentOption, index: number) => (
              <div key={index} className="item">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="header">
                      <Text
                        tag="h4"
                        className="bold title-with-border"
                        field={paymentOption.Heading}
                      ></Text>
                      <Text tag="h6" className="regular" field={paymentOption.Description}></Text>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="desc">
                      {paymentOption.Children.map((link: PaymentOptionLink, index: number) => (
                        <RichText tag="div" key={index} field={link.Description}></RichText>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="disclaimer">
              <div className="row">
                <RichText tag="div" className="col-lg-9" field={fields.Disclaimer}></RichText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
