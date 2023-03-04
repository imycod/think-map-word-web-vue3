import {ref,reactive} from "vue";

export default function useDrawer() {
    const drawer = ref(false)
    const data = reactive({
        title:'',
        content:[]
    })

    function close(params) {
        const {type, value} = params
        switch (type) {
            case 'cancelClick':
            case 'confirmClick':
            case 'beforeClose':
                drawer.value = value
                break;
        }
    }

    return {
        drawer,
        close,
        data,
    }
}
