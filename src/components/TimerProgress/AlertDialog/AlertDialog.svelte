<script lang="ts">
    export let title: string;
    export let message: string;
    export let onClose: () => void;
</script>

<dialog on:close={onClose} class="modal overflow-hidden backdrop-blur-lg">
    <div
        class="modal-box flex w-72 flex-col items-center justify-center bg-[#202020] p-3"
    >
        <h3
            class="mb-2 text-center text-[1.2rem] font-medium"
        >
            {title}
        </h3>
        <p class="text-center">
            {message}
        </p>
        <div class="modal-action mt-0">
            <form method="dialog">
                <!-- Prevent focus on the close button -->
                <button></button>
                <button
                    class="border-t-2 border-[#272727] px-[7rem] pt-2 text-[#2C77E0]"
                    >Close</button
                >
            </form>
        </div>
    </div>
</dialog>
