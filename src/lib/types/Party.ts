import type { Requirement } from '../partyRequirements';
import type { Person } from './Person';

export type Party = {
	name: string;
	description: string;
	requirements: Requirement;
	leader: Person;
};
