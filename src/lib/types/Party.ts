import type { Requirement } from '../partyRequirements';
import type { Person } from './Person';

export type Party = {
	id: number;
	name: string;
	description: string;
	requirements: Requirement;
	leader: Person;
	upvotes: number;
};
