import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createStore} from 'redux'
import App from "./App";

//* начальное состояние
const initialState = {value: 0};

//* reducer
// чистая функция зависит от state и action,
// сохраняется принцип иммутабешьности как при работе со стейтом в компоненте
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case  'increment':
			return {...state, value: state.value + 1};
		case  'decrement':
			return {...state, value: state.value - 1};
		case 'random':
			return {...state, value: action.payload};
		default:
			return state;
	}
}
//* создание хранилища
let store = createStore(reducer);

//* функция обработки результата в элементе
const update = () => {
													//* получение стейта из хранилища
	document.getElementById('counter').textContent = store.getState().value;
}
// * action-creators - удобнее использовать чем прописывание объектов вручную
const inc = () => ({type: 'increment'});
const dec = () => ({type: 'decrement'});
const rnd = (value) => ({type: 'random', payload: value});
store.subscribe(update);

document.getElementById('inc').addEventListener('click', () => {
	store.dispatch(inc()); //* вызов dispatch в который передается action;
})                        //* action - объект с обязательным полем type;

document.getElementById('dec').addEventListener('click', () => {
	store.dispatch(dec()); //* вызов dispatch в который передается action;
})

document.getElementById('rnd').addEventListener('click', () => {
	const value = Math.floor(Math.random() * 10)
	store.dispatch(rnd(value)); //* вызов dispatch в который передается action;
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);

