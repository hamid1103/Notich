<script>
    import {onDestroy} from "svelte";

    //Editor Tools
    import Paragraph from '@editorjs/paragraph';
    import Header from '@editorjs/header'

    export let data, socket;

    onDestroy(() => {
        socket.emit("Leave")
    })

    import EditorJS from '@editorjs/editorjs';
    import {Advice} from "../../lib/WorkspaceSession.js";

    let isSaving = false;
    let editorjsContentHolder;
    let DocumentNodes;
    let CurrentBlockIndex;
    let CurrentBlock
    let ReceivedEdit = false;
    let ReceivedBlock = false;
    let ReceivedRemove = false
    const editor = new EditorJS({
        tools: {
            paragraph: {
                class: Paragraph,
                inlineToolbar: true
            },
            header: Header
        },
        defaultBlock: 'paragraph',
        autofocus: true,
        onChange: async (api, event)=>{
            switch (event.type){
                case "block-added":
                    if (!ReceivedBlock) {
                    } else {
                    }
                    break;
                case "block-changed":
                    if (!ReceivedEdit) {
                        let details = await editor.blocks.getBlockByIndex(event.detail.index).save()
                        socket.emit("EditBlock", event.detail.index, details)
                    } else {
                        socket.emit("CheckSelected", event.detail.index)
                        ReceivedEdit = false
                    }

                    break;
                case "block-removed":
                    if (!ReceivedRemove) {
                        socket.emit("RemoveBlock", event.detail.index)
                    }
                    ReceivedRemove = false
                    break;
                case "block-moved":
                    break;
            }
        },
        /**
         * ID of Element that should contain Editor instance
         */
        holder: 'editorjs',
        data: {
            blocks: data.content
        }
    })
    addEventListener('keydown', e=>{
        if(e.ctrlKey && e.key==='s'){
            e.preventDefault();
            SaveDoc();
        }
    })

    let SaveDoc = async ()=>{
        if(isSaving)
            return
        isSaving = true
        DocumentNodes = editorjsContentHolder.querySelectorAll('[contenteditable=true]')
        console.log(DocumentNodes)
        for (let i = 0; i<DocumentNodes.length; i++){
            let item = DocumentNodes.item(i)
            item.contentEditable = false
            item.classList.add("bg-gray-900")
        }
        editor.save().then((data)=>{
            console.log(data)
            socket.emit("SaveDoc", data)
        })
    }

    socket.on("DataSaved", ()=>{
        console.log("DATA SAVED, " + DocumentNodes.length)
        isSaving = false
        for (let i = 0; i<DocumentNodes.length; i++){
            let item = DocumentNodes.item(i)
            item.contentEditable = true
            item.classList.remove("bg-gray-900")
        }
    })

    /*socket.on("ReceiveNewBlock", async (CBI, Val) => {
        ReceivedBlock = true;
        if (!Val.Config) {
            console.log(Val)
            editor.blocks.insert(Val.tool, Val.data, {}, CBI)
        } else {

        }
    })
    socket.on("ReceiveRemoveBlock", (CBI) => {
        ReceivedRemove = true;
        editor.blocks.delete(CBI)
    })*/
    /*let multiplayerOnChange = async (api, event) => {
        console.log(event)
        switch (event.type) {
            case "block-added":
                if (!ReceivedBlock) {
                    let details = await editor.blocks.getBlockByIndex(event.detail.index).save()
                    socket.emit("AddBlock", event.detail.index, details)
                    socket.emit("DeselectBlock", CurrentBlockIndex)
                    CurrentBlockIndex = editor.blocks.getCurrentBlockIndex()
                    CurrentBlock = editor.blocks.getBlockByIndex(CurrentBlockIndex)
                    socket.emit("SelectBlock", CurrentBlockIndex)
                } else {
                    console.log("Received New Block Message ")
                }
                break;
            case "block-changed":
                if (!ReceivedEdit) {
                    let details = await editor.blocks.getBlockByIndex(event.detail.index).save()
                    socket.emit("EditBlock", event.detail.index, details)
                } else {
                    socket.emit("CheckSelected", event.detail.index)
                    ReceivedEdit = false
                }

                break;
            case "block-removed":
                if (!ReceivedRemove) {
                    socket.emit("RemoveBlock", event.detail.index)
                }
                ReceivedRemove = false
                break;
            case "block-moved":
                break;
        }
    }*/

    socket.on("ReceiveEdit", (CBI, Val) => {
        ReceivedEdit = true;
        console.log(`Receive Change for block ${CBI}`)
        console.log(Val)
        let getblock = editor.blocks.getBlockByIndex(CBI)
        editor.blocks.update(getblock.id, Val.data)
    })

    let blockFocus = async (e) => {
        CurrentBlockIndex = editor.blocks.getCurrentBlockIndex()
        CurrentBlock = editor.blocks.getBlockByIndex(CurrentBlockIndex)
        socket.emit("SelectBlock", CurrentBlockIndex)
    }
    let blockUnfocus = async (e) => {
        socket.emit("DeselectBlock", CurrentBlockIndex)
    }

    socket.on("EnableBlock", (bindex) => {
        let block = editor.blocks.getBlockByIndex(bindex)
        block.config.readOnly = false
        block.holder.contentEditable = "true"
        block.holder.classList.remove("bg-gray-500")
    })

    socket.on("DisableBlock", (bindex) => {
        let block = editor.blocks.getBlockByIndex(bindex)
        if (block) {
            block.holder.contentEditable = "false"
            block.config.readOnly = true
            block.holder.classList.add("bg-gray-500")
        }
    })

</script>

<div class="bg-gray-100 w-1/2 rounded p-5">
    <article class="prose-xl">
        <div id="editorjs" bind:this={editorjsContentHolder} class="rounded border-2 p-2" on:focusin={blockFocus} on:focusout={blockUnfocus}></div>
    </article>
</div>
{#if $Advice.show}
    {#key $Advice.advice}
        <div class="flex mt-12 inset-x-0 mx-auto bottom-3 p-3 bg-white border-4 border-gold rounded w-6/12 h-20 items-center">
            <img class="relative origin-bottom h-20" src="/prof.png">
            <div class="text-wrap h-16 overflow-y-auto font-sans overflow-y-auto">
                {$Advice.advice}
            </div>
            <div class="w-1/6 flex justify-center ml-2.5 hover:stroke-amber-700 hover:cursor-pointer stroke-red-500" on:click={()=>{
                Advice.set({show: false, advice: $Advice.advice})
            }}>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    {/key}
{/if}