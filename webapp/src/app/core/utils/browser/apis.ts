/**
 * Get the informations about the user agent such as:  Mobile or Desktop device
 * @return {object}
 */
export function getDeviceInfo() {
  return {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
    mobileOs: getMobileOs(),
  };
}
/**
 * Get the Mobile OS name
 * @return {string}
 */
function getMobileOs() {
  return (
    getDeviceOs('Android') ||
    getDeviceOs('webOS') ||
    getDeviceOs('iPhone') ||
    getDeviceOs('iPad') ||
    getDeviceOs('iPod') ||
    getDeviceOs('BlackBerry') ||
    getDeviceOs('IEMobile') ||
    getDeviceOs('Opera Mini')
  );
}
/**
 * Check the Mobile OS name
 * @param name
 * @return {string}
 */
function getDeviceOs(name) {
  return navigator.userAgent.search(name) !== -1 ? name : '';
}
