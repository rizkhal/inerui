export const wait = (timeout: number) => {
  return new Promise((resolve: any) => setTimeout(resolve, timeout));
};
