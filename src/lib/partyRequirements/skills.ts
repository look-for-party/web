export const skills = [
	'JavaScript',
	'HTML',
	'CSS',
	'React',
	'Firebase',
	'Frontend Development',
	'UI/UX Design'
] as const;
export type Skill = (typeof skills)[number];
