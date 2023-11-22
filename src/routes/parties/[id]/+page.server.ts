import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;
    console.log(id)

    return {
        id
    }
};
