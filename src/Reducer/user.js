const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_qID":
			return {
				...state,
				qID: action.payload,
			};
		case "ADD_NAME":
			return {
				...state,
				name: action.payload,
			};
		case "ADD_joinID":
			return {
				...state,
				joinID: action.payload,
			};
		case "ADD_createdOn":
			return {
				...state,
				createdOn: action.payload,
			};
		case "ADD_INFO":
			return {
				...state,
				qID: action.payload.qID,
				createdOn: action.payload.createdOn,
				joinID: action.payload.joinID,
			};
		case "FOUND_INFO":
			return {
				...state,
				qID: action.payload.qID,
				createdOn: action.payload.createdOn,
				joinID: action.payload.joinID,
				ok: true,
			};
		case "ADD_POINTS":
			return {
				...state,
				points: action.payload,
			};

		case "ADD_WON":
			return {
				...state,
				won: action.payload,
			};
		default:
			return state;
	}
};

export { reducer };
