export const interests = [
	'Beginner Friendly',
	'Web',
	'Databases',
	'Machine Learning',
	'Cybersecurity',
	'Mobile Development',
	'Game Development',
	'Cooking',
	'UI/UX',
	'Fitness',
	'Mobile',
	'Health',
	'Art',
	'Design'
] as const;
export type Interest = (typeof interests)[number];
