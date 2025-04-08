/**
 * Sets the focus to the provided native element
 * @param element
 * @param value
 */
export function setFocus(element, value) {
  (element?.nativeElement?.querySelector(value) as HTMLElement)?.setAttribute('tabindex', '0');
  (element?.nativeElement?.querySelector(value) as HTMLElement)?.focus();
}

declare global {
  interface Navigator {
    msSaveBlob;
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => boolean;
  }
}

/**
 * Download a file in an iframe
 * @param res
 * @param fileName
 */
export function downloadFileInFrame(res: any, fileName: string) {
  const file = isBase64(res.body)
    ? convertBase64ToBlobData(res.body, fileName)
    : createFile({ body: res.body }, fileName);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Converts a base64 String to Blob
 * @param base64Data
 * @param fileName
 * @param sliceSize
 * @returns {File}
 */
export function convertBase64ToBlobData(base64Data: string, fileName: string, sliceSize = 512) {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: 'text/octet-stream' });
  return createFile({ body: blob }, fileName);
}

/**
 * Checks whether a string is in base64 format or not
 * @param str
 * @returns
 */
export function isBase64(str) {
  if (typeof str !== 'string' || str === '' || str.trim() === '') {
    return false;
  }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}

/**
 * Create a file for the provided binary content
 * @param res
 * @param uploadFileName
 *
 */
export function createFile(res: any, uploadFileName: any): File {
  let file;
  if (!navigator.msSaveBlob) {
    // detect if not Edge
    file = new File(res ? [res.body] : [], uploadFileName, { type: 'text/octet-stream' });
  } else {
    file = blobToFile(
      new Blob(res ? [res.body] : [], { type: 'text/octet-stream' }),
      uploadFileName
    );
  }
  return file;
}

/**
 * Converts Blob object to File object
 * @param blob
 * @param fileName
 * @return {File}
 */
export function blobToFile(blob: Blob, fileName: string): File {
  let file: any = blob;
  file.lastModifiedDate = new Date();
  file.name = fileName;
  return file as File;
}

/**
 * Downloads a file with the given content and file name.
 *
 * This function handles the download process differently based on the browser:
 * - For Internet Explorer, it uses `msSaveBlob` to save the file.
 * - For other browsers, it creates a temporary anchor element to trigger the download.
 *
 * @param content - The content of the file to be downloaded. This can be a Blob, File, or any other data type supported by `URL.createObjectURL`.
 * @param fileName - The name of the file to be downloaded, including the file extension.
 */
export function downloadFile(content: any, fileName: string) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(content, fileName);
  } else {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(content);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
