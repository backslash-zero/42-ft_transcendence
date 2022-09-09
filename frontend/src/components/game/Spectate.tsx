// Components

// Hooks
import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'

//
import Canvas from './Canvas';

const Spectate = () => {
	const global = useSelector((state: any) => state.global)
	const [game, setGame] = useState(null)
	const [width, setWidth] = useState(100);
	const [height, setHeight] = useState(100);
	var eventSource:EventSource;

	useEffect(() => {
		// eslint-disable-next-line
		eventSource = new EventSource(`http://${process.env.REACT_APP_ip}:5000/game/` + global.gameID);
		window.addEventListener("beforeunload", function (event) {
			eventSource.close();
		})
		eventSource.onmessage = async ({ data }) => {
			const json = await JSON.parse(data)
			setGame(json.game)
		}
		return () => {
			window.removeEventListener("beforeunload", function (event) {
				eventSource.close();
			})
			eventSource.close()
		};
	}, []);

	const overlayEl = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const resizeObserver = new ResizeObserver((event) => {
			if (overlayEl.current != null) {
					let width = overlayEl.current.clientHeight * 1.9 > (window.innerWidth - 400) ? window.innerWidth - 400 : overlayEl.current.clientHeight * 1.9;
					let height = overlayEl.current.clientHeight * 1.9 > (window.innerWidth - 400) ? (window.innerWidth - 400)/ 1.9 : overlayEl.current.clientHeight;
					setWidth(width);
					setHeight(height);
				}
		});
		resizeObserver.observe(document.getElementById("GameDiv")!);
	})
	return (
		<div ref={overlayEl} className="relative flex-1 h-full justify-center" id="GameDiv">
			{game != null && <Canvas width={width} height={height} game={game} username={global.username} ratio={width / 1900}/>}
		</div>
	)
}

export default Spectate