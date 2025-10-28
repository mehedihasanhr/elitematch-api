interface RequestedFields {
  baseFields: string[];
  relations: Record<string, RequestedFields>;
}

export function parseRequestedFields(
  fieldsParam: string | string[] | undefined,
): RequestedFields {
  const defaultFields: RequestedFields = { baseFields: [], relations: {} };
  if (!fieldsParam) return defaultFields;

  const fieldsString = Array.isArray(fieldsParam)
    ? fieldsParam.join(',')
    : fieldsParam;

  return parseNestedFields(fieldsString);
}

/**
 * Recursive parser for nested fields, e.g.:
 */
export function parseNestedFields(input: string): RequestedFields {
  const result: RequestedFields = { baseFields: [], relations: {} };
  let buffer = '';
  let depth = 0;
  let key = '';

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '(') {
      if (depth === 0) {
        key = buffer.trim();
        buffer = '';
      } else {
        buffer += char;
      }
      depth++;
    } else if (char === ')') {
      depth--;
      if (depth === 0) {
        result.relations[key] = parseNestedFields(buffer.trim());
        buffer = '';
        key = '';
      } else {
        buffer += char;
      }
    } else if (char === ',' && depth === 0) {
      const field = buffer.trim();
      if (field) result.baseFields.push(field);
      buffer = '';
    } else {
      buffer += char;
    }
  }

  if (buffer.trim()) result.baseFields.push(buffer.trim());

  return result;
}
