import type { Commitment } from '$src/lib/partyRequirements/commitments';
import type { Interest } from '$src/lib/partyRequirements/interests';
import type { Skill } from '$src/lib/partyRequirements/skills';

export type Filter = {
	skills: Skill[];
	commitments: Commitment[];
	interests: Interest[];
};
