export const commitments = [
	'Less than 10 hours/week',
	'5 to 10 hours/week',
	'10 to 15 hours/week',
	'15 to 20 hours/week',
	'More than 20 hours/week',
	'Flexible'
] as const;
export type Commitment = (typeof commitments)[number];
