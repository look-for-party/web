<script lang="ts">
	import type { PageData } from "./$types";
    import { Avatar } from "@skeletonlabs/skeleton";
    import MD from "$lib/components/md/MD.svelte";

    let data: PageData
    enum Role {
        Owner,
        Applicant,
        Member
    }
    let role = Role.Owner

    const mdcontent = `
# This is a test
### This is a test
`
</script>

<main>
    <section class="flex">
        <Avatar initials="DN"/>
        {#if role === Role.Owner}
           <button class="btn">Edit</button> 
        {/if}
        <div class="flex flex-col">
            <span>69 reps</span>
            {#if role !== Role.Owner}
                <div class="flex">
                    <button>+1</button>
                    <button>-1</button>
                </div>
            {/if}
        </div>
        {#if role === Role.Owner}
            <button class="btn">Applicants</button>
            <button class="btn">Recruits</button>
        {:else if role === Role.Applicant}
            <button class="btn">One-click Apply</button>
        {:else if role === Role.Member}
            <button class="btn">Leave party</button>
        {/if}
    </section>
    <section>
        <MD src={mdcontent}></MD>
        <div>
            <div>
                <span>Skills</span>
            </div>
            <div>
                <span>Commitments</span>
            </div>
            <div>
                <span>Interests</span>
            </div>
        </div>
    </section>
    <section id="comments">

    </section>
</main>
