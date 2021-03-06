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
        
        case 'CLOSE_SEARCH_PAGE':{
            return ToggleVar([{
                ...ToggleVar()[0], 
                search: false
            }])
        }
        default:{
            return ToggleVar()
        }
    }
}

export {
    ToggleVar,
    ToggleFunc
}