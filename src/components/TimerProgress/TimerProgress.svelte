<script lang="ts">
    export let values: {
        hours: number;
        min: number;
        sec: number;
    };
    export let onEnd: () => void;

    import RadialProgress from "./RadialProgress/RadialProgress.svelte";
    import AlertDialog from "./AlertDialog/AlertDialog.svelte";

    import { onMount } from "svelte";
    import { get, writable } from "svelte/store";
    import { tweened } from "svelte/motion";

    const totalSecs =
        values.hours * 3600 + values.min * 60 + values.sec;

    const valuesString = writable(valuesToString());
    const progress = tweened(100, {
        duration: 100,
    });

    let audio: HTMLAudioElement;
    let modal: HTMLDialogElement;

    let isPaused = false;
    let interval = setInterval(() => {
        onTick();
        if (get(progress) === 0) {
            onProgressZero();
        }
    }, 1000);

    function handleTimerEnd() {
        clearInterval(interval);
        onEnd();
    }

    function onPause() {
        isPaused = true;
        clearInterval(interval);
    }

    function onResume() {
        isPaused = false;
        interval = setInterval(() => {
            onTick();
            if (get(progress) === 0) {
                onProgressZero();
            }
        }, 1000);
    }

    function onProgressZero() {
        clearInterval(interval);
        modal.showModal();
        audio.play();
    }

    function onTick() {
        if (values.sec === 0) {
            if (values.min === 0) {
                if (values.hours === 0) {
                    return;
                }
                values.hours--;
                values.min = 59;
            } else {
                values.min--;
                values.sec = 59;
            }
        } else {
            values.sec--;
        }
        valuesString.set(valuesToString());
        progress.set(
            ((values.hours * 3600 +
                values.min * 60 +
                values.sec) /
                totalSecs) *
                100,
        );
    }

    function valuesToString() {
        return `${values.hours
            .toString()
            .padStart(2, "0")}:${values.min
            .toString()
            .padStart(2, "0")}:${values.sec
            .toString()
            .padStart(2, "0")}`;
    }

    onMount(() => {
        audio = document.querySelector(
            "audio",
        ) as HTMLAudioElement;
        modal = document.querySelector(
            "dialog",
        ) as HTMLDialogElement;
    });
</script>

<audio
    src="/assets/audio/iphone-alarm.mp3"
    preload="auto"
/>

<div
    class="flex h-svh flex-col items-center justify-center gap-[3rem]"
>
    <div>
        <RadialProgress
            value={$valuesString}
            progress={$progress}
        />
    </div>
    <div
        class="flex items-center justify-center gap-[6.5rem]"
    >
        <button
            on:click={handleTimerEnd}
            class="z-10 aspect-square w-[4.5rem] cursor-pointer rounded-full border-2 border-[#333333] bg-[#333333] text-sm text-white shadow-[inset_0px_0px_0px_0.15rem_#000]"
        >
            Cancel
        </button>
        {#if !isPaused}
            <button
                on:click={onPause}
                class="z-10 aspect-square w-[4.5rem] cursor-pointer rounded-full border-2 border-[#342101] bg-[#342101] text-sm text-[#E9951E] shadow-[inset_0px_0px_0px_0.15rem_#000]"
            >
                Pause
            </button>
        {:else}
            <button
                on:click={onResume}
                class="z-10 aspect-square w-[4.5rem] cursor-pointer rounded-full border-2 border-[#342101] bg-[#342101] text-sm text-[#E9951E] shadow-[inset_0px_0px_0px_0.15rem_#000]"
            >
                Resume
            </button>
        {/if}
    </div>
    <div>
        <AlertDialog
            title="Timer Finished"
            message="Your timer has finished!"
            onClose={handleTimerEnd}
        />
    </div>
</div>
