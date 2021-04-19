import React from "react";
import "./timer.css";
import Timer from "react-compound-timer";

export default function Timer1({ testID,setEndTest }) {
	const [time, setTime] = React.useState(0);
	React.useEffect(() => {
		const fetchTime = async () => {
			const R = await fetch(`/api/${testID}/time`);
			const data = await R.json();
			setTime(data  * 60 *1000);
		};
		fetchTime();
	}, []);
	return (
		<div>
			{time ? (
				<p className="fixed-server-timer">
					<b>Time Left</b> <br />
					<Timer
						initialTime={time}
						direction="backward"
						onStop={() => setEndTest(true)}
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
