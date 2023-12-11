export function attempt<T = void>(promise: Promise<T>): Promise<T> {
  // @ts-expect-error
  return promise.catch((e) => {
    console.error(e);
  });
}
