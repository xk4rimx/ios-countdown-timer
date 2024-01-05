<script lang="ts">
    export let delay: number;

    let hidden = true;

    setTimeout(() => {
        hidden = false;
    }, delay);
</script>

{#if !hidden}
    <div {hidden}>
        <slot />
    </div>
{/if}
