type Meta = {
  total: number;
  page: number;
  limit: number;
};

export const paginate = <T>(items: T[], meta: Meta) => {
  const totalPage = Math.ceil(meta.total / meta.limit);
  const hasNextPage = meta.page < totalPage;
  const hasPreviousPage = meta.page > 1;

  return {
    data: items,
    meta: {
      ...meta,
      totalPage,
      hasNextPage,
      hasPreviousPage,
    },
  };
};
