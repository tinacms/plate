import { PlateEditor } from '../types/PlateEditor';
import { PlateOptions } from '../types/PlatePluginOptions/PlateOptions';
import { AnyObject } from '../types/utility/AnyObject';

/**
 * Get editor.options.
 */
export const getEditorOptions = <T = AnyObject, E = {}>(
  editor?: PlateEditor<E>
) => (editor?.options as PlateOptions<T>) ?? ({} as PlateOptions<T>);
