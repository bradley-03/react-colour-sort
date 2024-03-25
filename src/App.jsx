import { useState } from 'react'
import './App.css'
import ImageUploading from 'react-images-uploading'
import { prominent } from 'color.js'
import { dotWave } from 'ldrs'
import colorSortFn from '../util/colorSortFn'

function App() {
	const [images, setImages] = useState([])
	const [loading, setLoading] = useState(false)

	dotWave.register()

	const onChange = async (imageList, addUpdateIndex) => {
		// data for submit
		// console.log(imageList, addUpdateIndex)

		setLoading(true)
		for (let [index, image] of imageList.entries()) {
			try {
				if (!imageList[index]["prominent_color"]) {
					const prominentColor = await prominent(image["data_url"], { amount: 1 })
					imageList[index]["prominent_color"] = `rgb(${prominentColor[0]}, ${prominentColor[1]}, ${prominentColor[2]})`
				}
			} catch (e) {
				console.log(e)
			}
		}
		setLoading(false)

		const sorted = imageList.sort(colorSortFn)

		setImages(sorted);
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
						<br></br>
						{loading && <l-dot-wave size="50" speed="1" color="white" style={{marginTop: '10px'}} />}
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '15px', flexWrap: 'wrap' }}>
							{imageList.map((image, index) => (
								<div key={index} className="image-item">
									<img src={image.data_url} alt="" style={{ height: '150px', width: '150px', objectFit: 'cover' }} />
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
