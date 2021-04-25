import React from 'react'
import aboutSVG from '../aboutSVG.svg';
function AboutBoringCoder() {
    return (
		<div style={{display:"flex",justifyContent:"center",maxWidth:"100%",height:"auto" }}>
			<img
				src={aboutSVG}
				alt="abt"
				style={{ width: "70%", height: "100%" }}
			/>
		</div>
	);
}

export default AboutBoringCoder
