import React from 'react';
import Style from './CurrentPage.css';
import brushImg from '../../img/paintbrush.png';

const CurrentPage = props => {
	const thisImg = props.currImg;

	const downloadSvg = () => {
		// get svg element
		let svg = document.getElementById(`svg-id-${thisImg.id}`);

		// create a hidden anchor to be clicked by the function
		let tempA = document.createElement('a'),
			tempDownLoadId = `svg-${thisImg.id}-download`;
		document.body.appendChild(tempA);
		tempA.id = tempDownLoadId
		tempA.style = "display: none";
	
		// get svg source
		let serializer = new XMLSerializer(),
			svgBlob = new Blob([serializer.serializeToString(svg)], {'type': "image/svg+xml"}),
			url = URL.createObjectURL(svgBlob);

		tempA.href = url;
		tempA.download = `${thisImg.name}.svg`;
		tempA.click();
		window.URL.revokeObjectURL(url);
		document.getElementById(tempDownLoadId).remove();
	}

	const startOver = () => {
		thisImg.paths.map(path => (
			props.changePathColorState(props.imageState, path.id, '#FFFFFF')
		))
	}

	function pathClickEvent(curFill, dropperState, imgState, pathId, colorBg){
		if(dropperState === true){
			let tempFill = {hex: curFill}
			props.changeColorState(tempFill)
			props.changeDropperState(dropperState)

		}else{
			props.changePathColorState(imgState, pathId, colorBg)
		}
	}

	return (
		<div style={Style} className="container">
			<div key={thisImg.id} className='current-page'>
				<div>{thisImg.name}</div>
				<svg style={{cursor: props.dropperState ? `url(${props.dropperImg}) 2 30, auto` : `url(${brushImg}) 2 30, auto`,}}  id={`svg-id-${thisImg.id}`} xmlns="http://www.w3.org/2000/svg" x={thisImg.x} y={thisImg.y} width={thisImg.width} height={thisImg.height} viewBox={thisImg.viewBox} enableBackground="new 0 0 612 792" xmlSpace="preserve" className={`current-image ${props.dropperState ? 'select-color' : ''}`}>
					{thisImg.blackBg}
					<g id="color">
						{thisImg.paths.map(path => (
							<path key={path.id} fill={path.fill} stroke="#000000" strokeMiterlimit="10" d={path.d} onClick={() => pathClickEvent(path.fill, props.dropperState, props.imageState, path.id, props.colorState.background)} />
						))}
					</g>
				</svg>
				<div onClick={downloadSvg}>Download Image</div>
				<div onClick={startOver}>Start Over</div>
			</div>
		</div>
	)
}

export default CurrentPage;