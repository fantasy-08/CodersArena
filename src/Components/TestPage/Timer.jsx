import React from "react";
import "./timer.css";
import Timer from "react-compound-timer";

export default function Timer1({ testID, handleExit }) {
	const [time, setTime] = React.useState(0);
	React.useEffect(() => {
		const fetchTime = async () => {
			const R = await fetch(`/api/${testID}/time`);
			const data = await R.json();
			setTime(data * 60 * 1000);
		};
		fetchTime();
	}, []);
	
	const stop=()=>{
		handleExit();
	}
	return (
		<div>
			{time ? (
				<p className="fixed-server-timer">
					<b>Time Left</b> <br />
					<Timer
						initialTime={time}
						direction="backward"
						checkpoints={[
							{
								time: 0,
								callback: () => {stop()},
							},
						]}
					>
						{() => (
							<React.Fragment>
								<Timer.Hours />
								{` H : `}
								<Timer.Minutes />
								{` : M `}
								<Timer.Seconds />
								{` : S`}
							</React.Fragment>
						)}
					</Timer>
				</p>
			) : (
				<></>
			)}
		</div>
	);
}
