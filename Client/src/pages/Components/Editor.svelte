<script>
    export let data;

    import EditorJS from '@editorjs/editorjs';

    const editor = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: 'editorjs'
    });
</script>

<div class="bg-gray-100 w-1/2 rounded p-5">
    <div id="editorjs" class="rounded border-2 p-2"> </div>
</div>