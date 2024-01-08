import nextLogo from '../../Assets/arrow-big-right.png'

function Next(props) {
    const { next } = props
 
    return <img className='btn-img' src={nextLogo} onClick={next} />
    
}

export default Next ;