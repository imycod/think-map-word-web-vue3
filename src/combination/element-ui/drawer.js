import {ref} from "vue";

export default function useDrawer() {
    const drawer2 = ref(false)

    function close(params) {
        const {type, value} = params
        switch (type) {
            case 'cancelClick':
            case 'confirmClick':
            case 'beforeClose':
                drawer2.value = value
                break;
        }
    }
    return {
        drawer2,
        close,
    }
}
