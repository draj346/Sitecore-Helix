import { EditButtonTypes } from '@sitecore-jss/sitecore-jss/editing';

export const DefaultEditFrameButtons: EditButtonTypes[] = [
  {
    header: 'WebEditButton',
    icon: '/~/icon/Office/16x16/navigate_plus.png',
    click: 'sxawebedit:new',
    tooltip: 'Add sub-item',
    parameters: { navigate: '0', child: '0' },
  },
  {
    header: 'WebEditButton',
    icon: '/~/icon/Office/16x16/delete.png',
    click: 'webedit:delete',
    tooltip: 'Delete sub-item',
  },
];

export const GetEditFrameButtons = (editFields: string[]): EditButtonTypes[] => {
  const editFrameButtons: EditButtonTypes[] = [
    {
      header: 'FieldEditButton',
      icon: '/~/icon/Office/16x16/pencil.png',
      fields: editFields,
      tooltip: 'Edit the item',
    },
  ];

  return [...DefaultEditFrameButtons, ...editFrameButtons];
};

export const GetEditFrameProps = (dataSource: string, buttons: EditButtonTypes[]) => {
  return {
    dataSource: dataSource
      ? {
          itemId: dataSource,
        }
      : undefined,
    buttons: buttons,
    title: 'Edit component',
    tooltip: 'Edit component',
    cssClass: '',
  };
};
