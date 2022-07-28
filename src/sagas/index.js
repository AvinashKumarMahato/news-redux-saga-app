import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchNews() {

  const json = yield fetch('https://newsapi.org/v1/articles?source=cnn&apiKey=4085c7ed33a743a19e75849f0db379c9')
    .then(response => response.json());

  yield put({ type: "NEWS_RECEIVED", json: json.articles || [{ error: json.message }] });
}

function* actionWatcher() {
  yield takeLatest('GET_NEWS', fetchNews)
}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
