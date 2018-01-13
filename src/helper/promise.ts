export interface ICustomPromiseResult {
  isError: boolean;
  data: any;
}
export function promise_all_custom(
  promises: Promise<any>[]
): Promise<ICustomPromiseResult[]> {
  return new Promise((resolve, reject) => {
    let messages: ICustomPromiseResult[] = [];
    if (!promises || promises.length === 0) {
      resolve(messages);
      return;
    }
    let count = 0;
    promises.forEach((promise, index) => {
      messages[index] = undefined;
      promise
        .then(data => {
          messages[index] = { isError: false, data: data };
          count++;
          if (count === promises.length) {
            resolve(messages);
            return;
          }
        })
        .catch(e => {
          messages[index] = { isError: true, data: e };
          count++;
          if (count === promises.length) {
            resolve(messages);
            return;
          }
        });
    });
  });
}
