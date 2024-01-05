<script lang="ts">
    export let values: {
        hours: number;
        min: number;
        sec: number;
    };

    import Wheel from "./Wheel/Wheel.svelte";

    const keys = Object.keys(
        values,
    ) as (keyof typeof values)[];

    const wheels: { [key: string]: number[] } = {
        hours: [...Array(100).keys()],
        min: [...Array(60).keys()],
        sec: [...Array(60).keys()],
    };
</script>

<div class="relative flex h-52 justify-center gap-[0.6rem]">
    <!-- Blur Top -->
    <div
        class="pointer-events-none absolute top-[24.9%] h-1/2 w-[17rem] -translate-y-1/2 rounded-lg bg-gradient-to-b from-black to-transparent"
    ></div>
    <!-- Blur Bottom -->
    <div
        class="pointer-events-none absolute top-[75.1%] h-1/2 w-[17rem] -translate-y-1/2 rounded-lg bg-gradient-to-t from-black to-transparent"
    ></div>
    <!-- Gray Bar -->
    <div
        class="pointer-events-none absolute top-1/2 h-8 w-[17rem] -translate-y-1/2 rounded-lg bg-white opacity-[0.08]"
    ></div>
    {#each keys as key}
        <Wheel
            values={wheels[key]}
            bind:currValue={values[key]}
        />
        <p
            id={key}
            class="mr-2 mt-0.5 select-none self-center font-semibold"
        >
            {key}
        </p>
    {/each}
</div>

<style>
    #sec {
        margin-right: 0;
    }
</style>
