function useCookie() {
  const getCookie = (name:string) => {
    const arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    if (arr != null)　　return decodeURI(arr[2]);
    return null;
  };

  return {
    getCookie
  };
}

export {
  useCookie
};
