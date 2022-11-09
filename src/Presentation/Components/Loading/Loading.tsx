import Spinner from 'react-bootstrap/Spinner';

function Loading() {
    return (
        <div className='text-center mt-4'>
            <Spinner animation='border'/>
            <h1>Loading</h1>
        </div>
    )
}

export default Loading;