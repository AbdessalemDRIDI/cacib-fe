/**
 * Remove elements from DOM by class name
 * @param className The class name of the elements to remove
 */
export function removeElementFromDom(classNames: string | string[]) {
  const classNamesArray = Array.isArray(classNames) ? classNames : [classNames];
  classNamesArray.forEach((className) => {
    const elements = Array.from(document.getElementsByClassName(className));
    elements.forEach((element) => element.remove());
  });
}
