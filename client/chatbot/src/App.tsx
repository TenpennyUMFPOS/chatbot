import { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';

function userMessage({ message }: { message: string }) {
	return <p className='user-message'> {message}</p>;
}

function App() {
	const [discussionArray, setDiscussionArray] = useState<string[]>([]);

	const [response, setResponse] = useState('');

	const [inputText, setInputText] = useState<string>('');

	useEffect(() => {
		console.log(response);
	}, [response]);

	useEffect(() => {
		console.log(discussionArray);
	}, [discussionArray]);

	return (
		<div className='App'>
			<div className='chat-block'>
				<div className='chat-block-top'>
					<p>Welcome to our Chat</p>
				</div>

				<div className='chat-block-middle'>
					{discussionArray.map((element: string, index: number) => {
						if (index % 2 == 0) {
							return (
								<div className='question-text' key={Math.random() * (50000 - 1) + 1}>
									<p>{element}</p>
								</div>
							);
						} else {
							return (
								<div className='response-text' key={Math.random() * (50000 - 1) + 1}>
									<p>{element}</p>
								</div>
							);
						}
					})}
				</div>

				<div className='chat-block-bottom'>
					<input
						type='text'
						value={inputText}
						onChange={(e) => {
							setInputText(e.target.value);
						}}
					/>
					<button
						onClick={() => {
							setDiscussionArray((discussionArray) => [...discussionArray, inputText]);

							setTimeout(function () {
								(async function addGasFill() {
									axios
										.post('http://127.0.0.1:5000/predict', { message: inputText })
										.then((res) => {
											setResponse(res.data.answer);
											setDiscussionArray((discussionArray) => [
												...discussionArray,
												res.data.answer,
											]);
										});
								})();
							}, 500);
						}}>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
