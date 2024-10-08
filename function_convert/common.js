import { expect} from "@playwright/test";
//require('../selectors/commonselectors.json');

/* String format.
* @param str String, needs to be formatted.
* @param args Arguments, needs to be placed properly in the string.
*/
export const stringFormat = (str, ...args) =>
   str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");
