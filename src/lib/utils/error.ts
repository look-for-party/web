export const emojis: Record<number, string> = {
	400: '🤔', // Bad Request
	401: '🔒', // Unauthorized
	403: '🚫', // Forbidden
	404: '👻', // Not Found
	408: '⏱️', // Request Timeout
	500: '💥', // Internal Server Error
	502: '🔧', // Bad Gateway
	503: '🚧', // Service Unavailable
	504: '⏲️' // Gateway Timeout
};

export const details: Record<number, string> = {
	400: "Hmm, the server didn't quite get that. Maybe it's having a 'case of the Mondays'?",
	401: "The server is asking if you have a pass. It's like a club, but less fun.",
	403: "The server is saying 'You shall not pass!'",
	404: "The server looked but couldn't find anything. It's like losing your keys, but for the internet.",
	408: "The server got tired of waiting. It's not very patient, is it?",
	500: 'The server is having a meltdown. Maybe it needs a vacation?',
	502: "The server is playing 'broken telephone'. It got something it didn't understand.",
	503: 'The server is on a coffee break. Try again later.',
	504: "The server tried to get a response, but it's like shouting into the void."
};
