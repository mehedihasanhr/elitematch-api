interface RequestedFields {
  baseFields: string[];
  relations: Record<string, RequestedFields>;
}

/**
 * Recursively builds a Prisma `select` object with type inference.
 * @param requestedFields user-defined structure describing which fields and relations to select
 * @returns a type-safe Prisma select object
 */
export function buildSelectRelations<T>(requestedFields: RequestedFields): T {
  const select: Record<string, any> = {};

  for (const field of requestedFields.baseFields) {
    select[field] = true;
  }

  for (const [relation, subRequested] of Object.entries(
    requestedFields.relations,
  )) {
    select[relation] = { select: buildSelectRelations(subRequested) };
  }

  return select as T;
}
