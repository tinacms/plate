import { insertNodes, someNode } from '@udecode/plate-common';
import { getPlatePluginType, PlateEditor, TElement } from '@udecode/plate-core';
import { ELEMENT_TABLE } from '../defaults';
import { TablePluginOptions } from '../types';
import { getEmptyTableNode } from '../utils/getEmptyTableNode';

export const insertTable = (
  editor: PlateEditor,
  { header }: TablePluginOptions
) => {
  if (
    !someNode(editor, {
      match: { type: getPlatePluginType(editor, ELEMENT_TABLE) },
    })
  ) {
    insertNodes<TElement>(editor, getEmptyTableNode(editor, { header }));
  }
};
