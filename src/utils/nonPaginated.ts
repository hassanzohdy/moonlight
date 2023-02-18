import { RestfulEndpoint } from "@mongez/http";

export const nonPaginated = (service: RestfulEndpoint) =>
  service.list({
    paginate: false,
  });

export const nonPaginatedRequest = (service: RestfulEndpoint) => {
  return () => nonPaginated(service);
};
