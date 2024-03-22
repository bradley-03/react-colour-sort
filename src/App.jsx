import { useState } from 'react'
import './App.css'
import ImageUploading from 'react-images-uploading'
import {prominent} from 'color.js'

function App() {
	const [images, setImages] = useState([])

	const onChange = async (imageList, addUpdateIndex) => {
		// data for submit
		// console.log(imageList, addUpdateIndex)
		console.log(imageList[0])

		// const color = await prominent(imageList[0]["data_url"], {amount: 1})
		// console.log(color)

		setImages(imageList);
	};

	return (
		<>
			<ImageUploading
				multiple
				value={images}
				onChange={onChange}
				dataURLKey={'data_url'}
			>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps
				}) => (
					// write your building UI
					<div className="upload__image-wrapper">
						<button
							style={isDragging ? { color: "red" } : null}
							onClick={onImageUpload}
							{...dragProps}
						>
							Click or Drop here
						</button>
						&nbsp;
						<button onClick={onImageRemoveAll}>Remove all images</button>
						<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '15px', flexWrap: 'wrap'}}>
						{imageList.map((image, index) => (
							<div key={index} className="image-item">
								<img src={image.data_url} alt="" style={{height: '150px', width: '150px', objectFit: 'cover'}} />
								<div className="image-item__btn-wrapper">
									<button onClick={() => onImageUpdate(index)}>Update</button>
									<button onClick={() => onImageRemove(index)}>Remove</button>
								</div>
							</div>
						))}
						</div>
						
					</div>
				)}
			</ImageUploading>
		</>
	)
}

export default App
