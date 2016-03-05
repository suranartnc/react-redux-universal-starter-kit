export default function(state = [], action) {
	switch(action.type) {
		case 'GET_ARTICLE_LATEST':
		case 'GET_SEARCH_RESULTS':
			return action.data || state;
		default:
			return state;
	}
}