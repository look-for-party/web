import type { Interest } from './interests';
import type { Commitment } from './commitments';
import type { Skill } from './skills';

export type Requirement = {
	interests: Interest[];
	commitment: Commitment;
	skills: Skill[];
};
