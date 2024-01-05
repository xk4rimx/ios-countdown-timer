<script lang="ts">
    export let currValue: number;
    export let values: number[];

    import limitScrollStep from "./scripts/limitScrollStep";

    const SCROLL_STEP = 34;

    function setValue(element: Element) {
        const stepsScrolled = Math.round(
            element.scrollTop / SCROLL_STEP,
        );
        currValue = values[stepsScrolled];
    }

    function scrollStepper(element: Element) {
        limitScrollStep(element, SCROLL_STEP, () => {
            setValue(element);
        });
    }
</script>

<div
    use:scrollStepper
    class="hide-scrollbar flex flex-col items-center gap-1.5 overflow-y-scroll py-[5.67rem]"
>
    {#each values as value}
        <p
            class="select-none self-end text-xl text-[#BEBDBF]"
        >
            {value}
        </p>
    {/each}
</div>

<style>
    .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }
</style>
