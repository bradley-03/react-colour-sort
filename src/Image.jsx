export default function Image ({image, index, onImageUpdate, onImageRemove}) {
    return (
        <div className="image-item">
        <img src={image.data_url} alt="" style={{ height: '150px', width: '150px', objectFit: 'cover' }} />
        <div className="image-item__btn-wrapper">
            <button onClick={() => onImageUpdate(index)}>Update</button>
            <button onClick={() => onImageRemove(index)}>Remove</button>
        </div>
    </div>
    )
}