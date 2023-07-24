import { useTestMode } from '../context/TestModeContext';

const UpperBox = ({countDown}) => {

    let {setTestTime} = useTestMode();

    let UpdateTime = (e)=> {
        setTestTime(Number(e.target.id));
    }
  return (
    <div className='upperMenu'>
        <div className="counter">
            {countDown}
        </div>
        <div className="modes">
            <div className="timeMode" id={15} onClick={UpdateTime}>15s</div>
            <div className="timeMode" id={30} onClick={UpdateTime}>30s</div>
            <div className="timeMode" id={60} onClick={UpdateTime}>60s</div>
        </div>
    </div>
  )
}

export default UpperBox;