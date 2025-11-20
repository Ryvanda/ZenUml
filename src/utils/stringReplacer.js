export const REBRAND_REPLACEMENTS = {
  'ZenUML': 'Ascend',
  'zenuml': 'ascend',
  'ZENUML': 'ASCEND',
  'Zen UML': 'Ascend',
  'zen-uml': 'ascend',
  'zen_uml': 'ascend'
};

export function replaceOldIdentifiers(text) {
  let result = text;
  Object.entries(REBRAND_REPLACEMENTS).forEach(([old, newVal]) => {
    const regex = new RegExp(old, 'g');
    result = result.replace(regex, newVal);
  });
  return result;
}

export function scanForOldIdentifiers(text) {
  const found = [];
  Object.keys(REBRAND_REPLACEMENTS).forEach(old => {
    const regex = new RegExp(old, 'g');
    let match;
    while ((match = regex.exec(text)) !== null) {
      found.push({
        old,
        position: match.index,
        context: text.substring(Math.max(0, match.index - 20), match.index + old.length + 20)
      });
    }
  });
  return found;
}
