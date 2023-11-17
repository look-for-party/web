export type Filter = {
	skills: string[];
	commitments: { name: string; checked: boolean }[];
	interests: string[];
};
export type Party = {
	name: string;
	description: string;
	commitment: string;
	leader: string;
};
