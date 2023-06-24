import { readMoreChars, readMoreWords } from "@mongez/reinforcements";
import { Tooltip } from "../../Tooltip";
import Column from "../Column";

export class TextColumn extends Column {
  /**
   * Max chars to show
   */
  public _maxChars?: number;

  /**
   * Max words to show
   */
  public _maxWords?: number;

  /**
   * Set max chars to show
   */
  public maxChars(maxChars: number) {
    this._maxChars = maxChars;

    return this;
  }

  /**
   * Set max words to show
   */
  public maxWords(maxWords: number) {
    this._maxWords = maxWords;

    return this;
  }
}

export function textColumn(key = "name", heading: string = key) {
  return new TextColumn(key, heading).formatter(({ value, column }) => {
    if (!value) return "";

    if (column._maxChars && value.length > column._maxChars) {
      return (
        <>
          <Tooltip multiline label={<div>{value}</div>}>
            <div>{readMoreChars(value, column._maxChars)}</div>
          </Tooltip>
        </>
      );
    }

    if (column._maxWords) {
      return (
        <>
          <Tooltip multiline label={<div>{value}</div>}>
            <div>{readMoreWords(value, column._maxWords)}</div>
          </Tooltip>
        </>
      );
    }

    return value;
  });
}
