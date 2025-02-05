import {
  getPlatePluginWithOverrides,
  PlatePlugin,
  WithOverride,
} from '@udecode/plate-core';
import {
  insertDeserializedFragment,
  isDeserializerEnabled,
} from '@udecode/plate-serializer';
import { deserializeCSV } from './utils';

export interface WithDeserializeCSVOptions {
  plugins?: PlatePlugin[];
  // Percentage in decimal form, from 0 to a very large number, 0 for no errors allowed,
  // Default is 0.25
  // Percentage based on number of errors compared to number of rows
  errorTolerance?: number;
}

export const csvDeserializerId = 'CSV Deserializer';

/**
 * Enables support for deserializing content
 * from CSV format to Slate format.
 */
export const withDeserializeCSV = ({
  plugins = [],
  errorTolerance = 0.25,
}: WithDeserializeCSVOptions = {}): WithOverride => (editor) => {
  const { insertData } = editor;

  editor.insertData = (data) => {
    const content = data.getData('text/plain');

    const isEnabled = isDeserializerEnabled(editor, plugins, csvDeserializerId);

    if (content && isEnabled) {
      const fragment = deserializeCSV(editor, content, true, errorTolerance);

      if (fragment?.length) {
        return insertDeserializedFragment(editor, { fragment, plugins });
      }
    }

    insertData(data);
  };

  return editor;
};

/**
 * @see {@link withDeserializeCSV}
 */
export const createDeserializeCSVPlugin = getPlatePluginWithOverrides(
  withDeserializeCSV
);
