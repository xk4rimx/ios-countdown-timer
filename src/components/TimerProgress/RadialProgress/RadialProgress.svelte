<script lang="ts">
    export let value: string;
    export let progress: number;
</script>

<div
    class="radial-progress text-[#FF9E07] shadow-[inset_0px_0px_0px_0.35rem_#26252A]"
    style={`--value:${progress}; --size:15rem; --thickness: 0.35rem`}
    role="progressbar"
>
    {#key value}
        <p class="text-5xl font-extralight text-white">
            {value}
        </p>
    {/key}
</div>
