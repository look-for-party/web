import type { PartyRequirement } from './PartyRequirement';
import type { Person } from './Person';

export type Party = {
	id: number;
	name: string;
	description: string;
	requirement: PartyRequirement;
	leader: Person;
	upvotes: number;
	thumbnail?: string;
};
