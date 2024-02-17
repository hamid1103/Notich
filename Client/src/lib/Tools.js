/**
 *
 * Use like this
 * <button use:shortcut={{shift: true, code: 'Digit1'}} on:click={() => buttonCount++}>
 *                Triggers a click on the button (Shift + 1)
 *            </button>
 *
 * @param node
 * @param params
 * @returns {{update: setHandler, destroy: (function(): void)}}
 */
export const shortcut = (node, params) => {
    let handler;
    const removeHandler = () => window.removeEventListener('keydown', handler), setHandler = () => {
        removeHandler();
        if (!params)
            return;
        handler = (e) => {
            if ((!!params.alt != e.altKey) ||
                (!!params.shift != e.shiftKey) ||
                (!!params.control != (e.ctrlKey || e.metaKey)) ||
                params.code != e.code)
                return;
            e.preventDefault();
            params.callback ? params.callback() : node.click();
        };
        window.addEventListener('keydown', handler);
    };
    setHandler();
    return {
        update: setHandler,
        destroy: removeHandler,
    };
};
