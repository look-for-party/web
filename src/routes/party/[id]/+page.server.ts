import { Role } from './types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    return {
        id: params.id,
        role: Role.Owner,
        md: "# Hello World"
    }
};
