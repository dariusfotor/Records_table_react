export const actionType = {
  FETCH_SUCCES: "FETCH_SUCCES",
  FETCH_BEGIN: "FETCH_BEGIN",
  FETCH_ERROR: "FETCH_ERROR"
};

export const fetchProductsBegin = () => ({
  type: actionType.FETCH_BEGIN
});
export const fetchProductsSuccess = payload => ({
  type: actionType.FETCH_SUCCES,
  payload
});

export const fetchProductsFailure = payload => ({
  type: actionType.FETCH_ERROR,
  payload
});
