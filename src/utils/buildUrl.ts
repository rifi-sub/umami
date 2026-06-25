export type Social = {
  label: string;
  handle: string;
  h: string;
  d: string;
  tld: string;
  path: string;
};

export const buildUrl = ({ h, d, tld, path }: Social) => {
  const proto = h + "://";
  const domain = [d, tld].join(".");
  return `${proto}${domain}/${path}`;
};
