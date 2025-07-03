var ShowRaster=true;
function DisplayRaster(){
	var RasterElement=document.querySelector(".Raster");
	ShowRaster=!ShowRaster;
	if(!ShowRaster){RasterElement.style.display="none";return;}
	RasterElement.style.display="";
}