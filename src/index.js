import React from 'react';    // react 라이브러리는 UI 라이브러리다.
import ReactDOM from 'react-dom';  // reactDOM은 웹사이트에 rendering하는 라이브러리다. 모바일은 react-native
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root')); // index.html의 id=root에 app 컴포넌트를 렌더링하고 있다는 뜻
registerServiceWorker();
