import { reactive } from 'vue'

export const store = reactive({
    infoLoad: false,
    isTeam(fullPath) {
        const ArrPath = fullPath.split("/");
        if (ArrPath[1] ? ArrPath[1] === 'pj' : false) {
            if (ArrPath[2] === 'team') {
                return true
            }
        }
        return false
    },
})