import { Item, Field, FileField } from '@sitecore-jss/sitecore-jss-nextjs';

export interface States extends Item {
  fields: {
    Key: Field<string>;
    Value: Field<string>;
  } & Item['fields'];
}

export interface FormProps extends Item {
  fields: {
    File: FileField;
    States: States[];
  } & Item['fields'];
}
