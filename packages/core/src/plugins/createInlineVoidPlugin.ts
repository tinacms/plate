import castArray from 'lodash/castArray';
import { PlatePlugin } from '../types/PlatePlugin/PlatePlugin';
import { WithOverride } from '../types/PlatePlugin/WithOverride';
import { TElement } from '../types/TElement';
import { getPlatePluginWithOverrides } from '../utils/getPlatePluginWithOverrides';

export interface WithInlineVoidOptions {
  plugins?: PlatePlugin[];
  inlineTypes?: string[];
  voidTypes?: string[];
}

/**
 * Merge and register all the inline types and void types from the plugins and options,
 * using `editor.isInline` and `editor.isVoid`
 */
export const withInlineVoid = ({
  plugins = [],
  inlineTypes = [],
  voidTypes = [],
}: WithInlineVoidOptions): WithOverride => (editor) => {
  const { isInline } = editor;
  const { isVoid } = editor;

  let allInlineTypes = [...inlineTypes];
  let allVoidTypes = [...voidTypes];

  plugins.forEach((plugin) => {
    if (plugin.inlineTypes) {
      allInlineTypes = allInlineTypes.concat(
        castArray(plugin.inlineTypes(editor))
      );
    }

    if (plugin.voidTypes) {
      allVoidTypes = allVoidTypes.concat(castArray(plugin.voidTypes(editor)));
    }
  });

  editor.isInline = (element) => {
    return allInlineTypes.includes((element as TElement).type)
      ? true
      : isInline(element);
  };

  editor.isVoid = (element) =>
    allVoidTypes.includes((element as TElement).type) ? true : isVoid(element);

  return editor;
};

/**
 * @see {@link withInlineVoid}
 */
export const createInlineVoidPlugin = getPlatePluginWithOverrides(
  withInlineVoid
);
