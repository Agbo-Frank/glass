import { makeVar } from '@apollo/client'

const CartVar = makeVar([])
const CartLength = makeVar([])
const SaveItemsVar = makeVar([])
const SaveLength = makeVar([])

export {
    CartVar,
    CartLength,
    SaveItemsVar,
    SaveLength
}