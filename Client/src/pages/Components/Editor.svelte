<script>
    import {onDestroy} from "svelte";

    //Editor Tools
    import Paragraph from '@editorjs/paragraph';
    import Header from '@editorjs/header'

    export let data, socket;
    onDestroy(()=>{
        socket.emit("Leave")
    })

    import EditorJS from '@editorjs/editorjs';

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
        onChange: async (api, event) => {
            console.log(event)
            switch (event.type){
                case "block-added":
                    if(!ReceivedBlock){
                        let details = await editor.blocks.getBlockByIndex(event.detail.index).save()
                        socket.emit("AddBlock", event.detail.index, details)
                        socket.emit("DeselectBlock", CurrentBlockIndex)
                        CurrentBlockIndex = editor.blocks.getCurrentBlockIndex()
                        CurrentBlock = editor.blocks.getBlockByIndex(CurrentBlockIndex)
                        socket.emit("SelectBlock", CurrentBlockIndex)
                    }else {
                        console.log("Received New Block Message ")
                    }
                    break;
                case "block-changed":
                    if(!ReceivedEdit){
                        let details = await editor.blocks.getBlockByIndex(event.detail.index).save()
                        socket.emit("EditBlock", event.detail.index, details)
                    }else {
                        socket.emit("CheckSelected", event.detail.index)
                        ReceivedEdit = false
                    }

                    break;
                case "block-removed":
                    if(!ReceivedRemove){
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
        holder: 'editorjs'
    });

    let blockFocus = async (e)=>{
        CurrentBlockIndex = editor.blocks.getCurrentBlockIndex()
        CurrentBlock = editor.blocks.getBlockByIndex(CurrentBlockIndex)
        socket.emit("SelectBlock", CurrentBlockIndex)
    }

    socket.on("ReceiveNewBlock", async (CBI, Val)=>{
        ReceivedBlock = true;
        if(!Val.Config)
        {
            console.log(Val)
            editor.blocks.insert(Val.tool, Val.data, {}, CBI)
        }else{

        }
    })

    socket.on("ReceiveEdit", (CBI, Val)=>{
        ReceivedEdit = true;
        console.log(`Receive Change for block ${CBI}`)
        console.log(Val)
        let getblock = editor.blocks.getBlockByIndex(CBI)
        editor.blocks.update(getblock.id, Val.data)
    } )

    socket.on("ReceiveRemoveBlock", (CBI)=>{
        ReceivedRemove = true;
        editor.blocks.delete(CBI)
    })

    let blockUnfocus = async (e)=>{
        socket.emit("DeselectBlock", CurrentBlockIndex)
    }

    socket.on("EnableBlock", (bindex)=>{
        let block = editor.blocks.getBlockByIndex(bindex)
        block.config.readOnly = false
        block.holder.classList.remove("bg-gray-500")
    })

    socket.on("DisableBlock",(bindex)=>{
        let block = editor.blocks.getBlockByIndex(bindex)
        if(block){
            block.config.readOnly = true
            block.holder.classList.add("bg-gray-500")
        }
    })

</script>

<div class="bg-gray-100 w-1/2 rounded p-5">
    <article class="sm:prose-sm md:prose lg:prose-xl">
        <div id="editorjs" class="rounded border-2 p-2" on:focusin={blockFocus} on:focusout={blockUnfocus}> </div>
    </article>
</div>