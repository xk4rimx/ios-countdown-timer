<script lang="ts">
    export let values: {
        hours: number;
        min: number;
        sec: number;
    };
    export let onStart: () => void;

    import TimeWheels from "./TimeWheels/TimeWheels.svelte";
    import Delayed from "./Delayed/Delayed.svelte";

    import { blur } from "svelte/transition";

    let delayDisabledButton = false;
</script>

<div
    class="flex h-svh flex-col items-center justify-center gap-5"
>
    <h1 class="z-10 text-4xl font-extralight">
        Set up a timer
    </h1>
    <div>
        <TimeWheels bind:values />
    </div>
    <div>
        {#if values.hours === 0 && values.min === 0 && values.sec === 0 && delayDisabledButton}
            <Delayed delay={400}>
                <button
                    disabled
                    class="cursor-normal z-10 aspect-square w-[4.5rem] rounded-full border-2 border-[#0B2911] bg-[#0B2911] text-sm text-[#4ECB67] opacity-0 shadow-[inset_0px_0px_0px_0.15rem_#000]"
                >
                    Start
                </button>
            </Delayed>
        {:else if values.hours === 0 && values.min === 0 && values.sec === 0}
            <button
                disabled
                class="cursor-normal z-10 aspect-square w-[4.5rem] rounded-full border-2 border-[#0B2911] bg-[#0B2911] text-sm text-[#4ECB67] opacity-0 shadow-[inset_0px_0px_0px_0.15rem_#000]"
            >
                Start
            </button>
        {:else}
            <button
                transition:blur
                on:introstart={() =>
                    (delayDisabledButton = true)}
                on:click={onStart}
                class="z-10 aspect-square w-[4.5rem] cursor-pointer rounded-full border-2 border-[#0B2911] bg-[#0B2911] text-sm text-[#4ECB67] shadow-[inset_0px_0px_0px_0.15rem_#000]"
            >
                Start
            </button>
        {/if}
    </div>
</div>
