import restartLogo from '../../Assets/rotate-ccw.png'

function Restart(props) {
    const { restart } = props
    return <img className='btn-img' src={restartLogo} onClick={restart} />

    
}

export default Restart ;