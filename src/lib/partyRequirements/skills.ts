export const skills = [
	'JavaScript',
	'HTML',
	'CSS',
	'React',
	'Firebase',
	'Frontend Development',
	'UI/UX Design',
	'Node.js',
	'React Native',
	'Backend Development',
	'Python',
	'Natural Language Processing',
	'Unity',
	'C#',
	'Graphic Design',
	'VR Development'
] as const;
export type Skill = (typeof skills)[number];
