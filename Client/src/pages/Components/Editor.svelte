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
    let ReceivedBlock = false;
    const editor = new EditorJS({
        tools: {
            paragraph: {
                class: Paragraph,
                inlineToolbar: true
            },
            header: Header
        },
        defaultBlock: 'paragraph',
        onChange: async (api, event) => {
            console.log(event)
            switch (event.type){
                case "block-added":
                    if(!ReceivedBlock){
                        socket.emit("AddBlock", event.detail.index, event.detail.target.name)
                        CurrentBlockIndex = editor.blocks.getCurrentBlockIndex()
                        CurrentBlock = editor.blocks.getBlockByIndex(CurrentBlockIndex)
                        socket.emit("SelectBlock", CurrentBlockIndex)
                    }
                    break;
                case "block-changed":
                    console.log(event.detail.target.config)
                    socket.emit("EditBlock", event.detail.index, event.detail.target.holder.textContent)
                    break;
                case "block-removed":
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
        console.log(CurrentBlock)
        socket.emit("SelectBlock", CurrentBlockIndex)
    }

    socket.on("ReceiveNewBlock", async (CBI, Val)=>{
        ReceivedBlock = true;
        if(!Val.Config)
        {
            editor.blocks.insert(Val, {}, {}, CBI)
        }else{

        }
    })

    socket.on("ReceiveEdit", (CBI, Val)=>{
        console.log(`Receive Change ${CBI} ${Val}`)
        editor.blocks.getBlockByIndex(CBI).holder.textContent = Val
    } )

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
    <article class="prose lg:prose-xl">
        <div id="editorjs" class="rounded border-2 p-2" on:focusin={blockFocus} on:focusout={blockUnfocus}> </div>
    </article>
</div>