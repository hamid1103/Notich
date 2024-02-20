<script>
    export let direction = "left";
</script>

{#if direction === "left"}
    <div class="group fixed left-0 top-0 h-full w-6">
        <div class="flex ">
            <input type="checkbox" id="drawer-toggle" class="relative sr-only peer">
            <label for="drawer-toggle" class="absolute top-1/2 left-1 inline-block p-4 transition-all hover:animate-pulse duration-500 rounded-lg peer-checked:rotate-180 peer-checked:left-64 peer-checked:ml-1">
                <div class="w-6 h-1 mb-3 -rotate-45 bg-white rounded-lg"></div>
                <div class="w-6 h-1 rotate-45 bg-white rounded-lg"></div>
            </label>

            <div class="fixed top-0 left-0 z-20 w-64 rounded border-0 border-r-4 border-gold h-full transition-all duration-500 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0">
                <div class="px-6 py-4">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
    {:else }
    <div class="group fixed right-1 top-0 h-full w-6">
        <div class="flex ">
            <input type="checkbox" id="drawer-toggle-right" class="relative sr-only peer">
            <label for="drawer-toggle-right" class="absolute top-1/2 right-1 inline-block p-4 transition-all hover:animate-pulse duration-500 rounded-lg peer-checked:-rotate-180 peer-checked:right-64 peer-checked:ml-1">
                <div class="w-6 h-1 mb-3 rotate-45 bg-white rounded-lg"></div>
                <div class="w-6 h-1 -rotate-45 bg-white rounded-lg"></div>
            </label>

            <div class="fixed top-0 right-0 z-20 w-64 rounded border-0 border-l-4 border-gold h-full transition-all duration-500 transform translate-x-full bg-white shadow-lg peer-checked:-translate-x-0">
                <div class="px-6 py-4">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
{/if}

