import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHistory(action) {
  try {
    let item = action.payload;
    // passes the exercise object from the payload to the server
    const response = yield axios.get(`/api/history/${item.id}`);
    yield put({ type: 'SET_HISTORY', payload: response.data });
  } catch (error) {
    console.log('Error with history saga', error);
  }
}

function* historySaga() {
  yield takeEvery('FETCH_HISTORY', fetchHistory);
}

export default historySaga;
