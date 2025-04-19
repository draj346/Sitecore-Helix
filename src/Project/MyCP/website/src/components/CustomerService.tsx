import React from 'react';
import { ComponentProps } from 'lib/component-props';
import { ContactsProps } from 'lib/component-props/contact';
import { EditFrame, Link, NextImage, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  GetEditFrameProps,
  GetEditFrameButtons,
  DefaultEditFrameButtons,
} from 'src/utils/EditFrameConstant';

type CustomerServiceProps = ComponentProps & {
  fields: {
    Contacts: ContactsProps[];
  };
};

export const Default = ({ fields }: CustomerServiceProps): JSX.Element => (
  <div className=" remove-container-fluid-spacing container-fluid">
    <div className="row">
      <div className="row">
        <div className="component content col-12 p-0">
          <div className="component-content">
            <div className="component-customer-service-guest">
              <div className="container remove-tablet-default-padding">
                <div className="three-column-container">
                  {fields.Contacts.map((contact, index) => (
                    <EditFrame
                      key={index}
                      {...GetEditFrameProps(
                        contact.id,
                        GetEditFrameButtons(['Heading', 'Phone', 'Hour'])
                      )}
                    >
                      <div key={index} className="row-cs">
                        <div className="col-lg-4 col-xl-3">
                          <Text tag="h4" className="bold" field={contact.Heading} />
                        </div>
                        <div className="phone-hours no-typography col">
                          <div className="col-lg-4">
                            <EditFrame
                              {...GetEditFrameProps(
                                contact?.Phone?.id || '',
                                DefaultEditFrameButtons
                              )}
                            >
                              <Text
                                tag="h6"
                                className="phone semibold h5"
                                field={contact.Phone?.fields.Heading}
                              />
                              <p className="icon-number">
                                <span>
                                  <NextImage
                                    field={contact.Phone?.fields.Icon}
                                    className="logo"
                                    alt="Colonial Penn"
                                    height={31}
                                    width={31}
                                  />
                                </span>

                                <span>
                                  <Link
                                    className="a-medium"
                                    title="phone number"
                                    field={contact.Phone?.fields.Link}
                                  />
                                </span>
                              </p>
                            </EditFrame>
                          </div>
                          <EditFrame
                            {...GetEditFrameProps(contact.Hour?.id || '', DefaultEditFrameButtons)}
                          >
                            <div className="hours-section">
                              <Text
                                tag="h6"
                                className="semibold h5"
                                field={contact.Hour?.fields.Title}
                              ></Text>
                              <Text
                                tag="p"
                                className="semibold"
                                field={contact.Hour?.fields.Day}
                              ></Text>
                              <Text tag="p" field={contact.Hour?.fields.Time}></Text>
                            </div>
                          </EditFrame>
                        </div>
                      </div>
                    </EditFrame>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
