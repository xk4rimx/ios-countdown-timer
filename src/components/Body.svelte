<script lang="ts">
    import TimerSetup from "./TimerSetup/TimerSetup.svelte";
    import TimerProgress from "./TimerProgress/TimerProgress.svelte";

    import { onMount } from "svelte";
    import { blur } from "svelte/transition";

    let currPage: "setup" | "progress";
    let values: {
        hours: number;
        min: number;
        sec: number;
    } = {
        hours: 0,
        min: 0,
        sec: 0,
    };

    onMount(() => {
        currPage = "setup";
    });
</script>

<body
    class="overflow-y-hidden bg-black font-sf-pro-display tracking-wider text-white"
>
    {#if currPage === "setup"}
        <div
            in:blur={{ delay: 300, duration: 300 }}
            out:blur={{ duration: 300 }}
        >
            <TimerSetup
                bind:values
                onStart={() => (currPage = "progress")}
            />
        </div>
    {:else if currPage === "progress"}
        <div
            in:blur={{ delay: 300, duration: 300 }}
            out:blur={{ duration: 300 }}
        >
            <TimerProgress
                onEnd={() => {
                    values = { hours: 0, min: 0, sec: 0 };
                    currPage = "setup";
                }}
                {values}
            />
        </div>
    {/if}
</body>
