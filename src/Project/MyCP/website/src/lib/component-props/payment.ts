import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export interface PaymentOption {
  Heading: Field<string>;
  Description: Field<string>;
  Children: PaymentOptionLink[];
}

export interface PaymentOptionLink {
  Description: Field<string>;
}
