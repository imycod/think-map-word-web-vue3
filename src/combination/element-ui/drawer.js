import {ref,reactive} from "vue";

export default function useDrawer() {
    const drawer2 = ref(false)
    const drawerContent = reactive({
        content:[]
    })

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
        drawerContent,
    }
}
