export function sortElement(
  elementOne: any,
  elementTwo: any,
  propertyName: string,
  descending: boolean = false
): number {
  let r = 0;
  if (
    !elementOne.hasOwnProperty(propertyName) ||
    !elementTwo.hasOwnProperty(propertyName)
  ) {
  } else if (elementOne[propertyName] < elementTwo[propertyName]) {
    r = 1;
  } else if (elementOne[propertyName] > elementTwo[propertyName]) {
    r = -1;
  } else {
    r = 0;
  }
  return descending ? r * -1 : r;
}

export function sortArrayByProperty(
  arrayOfElements: any[],
  propertyName: string,
  descending: boolean = false
) {
  return arrayOfElements.sort((a, b) => {
    return sortElement(a, b, propertyName, descending);
  });
}
