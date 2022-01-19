import { useReactiveVar } from '@apollo/client'
import { AuthAlertVar, AlertVar } from '../../Apollo/reactiveVariables/Alert'
import './alert.css'

function Alert(){
    const alert = useReactiveVar(AlertVar)
    return(
        <>
            {
                alert[0]?.display && <div className={`alert cusAlert d-flex justify-content-start align-items-center ${alert[0]?.show} alert-${alert[0]?.type}`} role="alert">
                     {
                        alert[0]?.type === "danger" ? <i class="fa fa-exclamation-circle"></i>:
                        alert[0]?.type === "success"? <i class="fa fa-check-circle"></i>: <i class="fa fa-info-circle"></i>
                    }
                    <div>{alert[0]?.message}</div>
                </div>
            }
        </>
    )
}
function Alert2(){
    const alert = useReactiveVar(AuthAlertVar)
    return(
        <>
            {
                alert[0]?.display1 && <div className={`alert cusAlert2  d-flex justify-content-start align-items-center auth1 ${alert[0]?.show} alert-${alert[0]?.type}`} role="alert">
                    {
                        alert[0]?.type === "danger" ? <i class="fa fa-exclamation-circle"></i>:
                        alert[0]?.type === "success"? <i class="fa fa-check-circle"></i>: <i class="fa fa-info-circle"></i>
                    }
                    <div>{alert[0]?.message}</div>
                </div>
            }
        </>
    )
}

export {
    Alert,
    Alert2
}