import React,{useState,useEffect} from 'react'
import {Grid,Card,CardActions,CardContent,Button,Typography} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function PublicTest() {
    const [testDetail,setTestDetail]=useState();
    const [load,setLoad]=useState(false);
    const [error, setError] = useState();

    let history=useHistory();

    useEffect(() => {
        const getPublicTest=async()=>{
            setLoad(true);
            const res=await fetch('/api/public/test');
            const data=await res.json()
            setLoad(false)

            if(data.message){
                setError()
                setTestDetail(data.message)
            }
            else{
                setError(data.error)
            }
        }
        getPublicTest();
    }, [])

    const handleClick=(test)=>{
        history.push(`/test/${test.joiningID}`)
    }
    return (
		<>
			{error ? <Alert severity="error">{error}</Alert> : <></>}
			{load ? (
				<></>
			) : testDetail ? (
				<>
					<Grid
						container
						spacing={2}
						alignItems="center"
						justify="center"
					>
						{testDetail.map((test, index) => {
							return (
								<>
									<Grid item xs={12} md={3}>
										<Card variant="outlined">
											<CardContent>
												<Typography
													color="textSecondary"
													gutterBottom
												>
													TEST NUMBER {index + 1}
												</Typography>
												<Typography
													variant="h5"
													component="h2"
												>
													<b>{test.testname}</b>
												</Typography>
												<Typography color="textSecondary">
													<i>joinID</i>
												</Typography>
												<Typography
													variant="body2"
													component="p"
												>
													{test.joiningID}
												</Typography>
											</CardContent>
											<CardActions>
												<Button
													color="primary"
													variant="outlined"
													size="small"
													onClick={() => {
														handleClick(test);
													}}
												>
													Attempt
												</Button>
											</CardActions>
										</Card>
									</Grid>
								</>
							);
						})}
					</Grid>
				</>
			) : (
				<></>
			)}
			<br />
		</>
	);
}

export default PublicTest
