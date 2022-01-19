import { makeVar } from '@apollo/client'

const ToggleVar = makeVar([])

function ToggleFunc(action){
    switch (action.type) {
        case 'OPEN_SEARCH_PAGE':{
            return ToggleVar([{
                ...ToggleVar()[0], 
                search: true
            }])
        }
        break;
        case 'CLOSE_SEARCH_PAGE':{
            return ToggleVar([{
                ...ToggleVar()[0], 
                search: false
            }])
        }
        break;
    }
}

export {
    ToggleVar,
    ToggleFunc
}