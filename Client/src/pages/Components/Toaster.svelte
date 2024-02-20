<script>
    import {BroadcastMessage} from "../../lib/Tools.js";

    let {Color, Message} = $BroadcastMessage

</script>
{#if $BroadcastMessage.Show}
    <div
            class="fixed inset-x-0 mx-auto top-1 pointer-events-auto w-96 max-w-full rounded-lg bg-{Color}-700 text-sm text-{Color}-700 shadow-lg"
            role="alert">
        <div
                class="flex items-center justify-between rounded-t-lg border-b-2 border-{Color}-200 bg-{Color}-100 bg-clip-padding px-4 pb-2 pt-2.5 text-{Color}-700">
            <p class="flex items-center font-bold text-{Color}-700">
                Alert!
            </p>
            <div class="flex items-center">
                <button
                        on:click={()=>{
                            BroadcastMessage.set({Message: '', Color: '',Show: false})
                            console.log($BroadcastMessage)
                        }}
                        type="button"
                        class="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-toast-dismiss
                        aria-label="Close">
        <span
                class="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke-width="1.5"
               stroke="{Color}"
               class="h-6 w-6">
            <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </span>
                </button>
            </div>
        </div>
        <div
                class="break-words rounded-b-lg bg-{Color}-100 px-4 py-4 text-{Color}-700">
            {Message}
        </div>
    </div>
{/if}

