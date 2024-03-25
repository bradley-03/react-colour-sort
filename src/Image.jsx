import './Image.css'

export default function Image({ image, index, onImageUpdate, onImageRemove }) {
    return (
        <div className="Image">
            <img src={image.data_url} alt="" />
            <div className="overlay">
                <div className='buttons'>
                    <button className='overlaybtn' onClick={() => onImageUpdate(index)}>Update</button>
                    <button className='overlaybtn' onClick={() => onImageRemove(index)}>Remove</button>
                </div>
            </div>
        </div>
    )
}