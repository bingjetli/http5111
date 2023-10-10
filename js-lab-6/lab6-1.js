/** LAB 6-1 IMAGE MOUSEOVER GALLERY*/
//CREATE AN ONLOAD LISTENER
window.onload = pageReady;

//CREATE AN ONLOAD FUNCTION TO HOLD OUR CODE THAT NEEDS THE document OBJECT.
function pageReady(){

	//CREATE A HANDLE FOR THE MAIN IMAGE
	var bigImage = document.getElementById("mainImg");

	//GET THE GALLERY IMAGES
	var image1 = document.getElementById("pic1");
	var image2 = document.getElementById("pic2");
	var image3 = document.getElementById("pic3");
	//image4
	const la_image4 = document.getElementById('pic4');
	//image5
	const la_image5 = document.getElementById('pic5');
	//image6
	const la_image6 = document.getElementById('pic6');

	//SETUP LISTENERS FOR THE GALLERY IMAGES
	image1.onmouseover = switchPic1;
	image2.onmouseover = switchPic2;
	image3.onmouseover = switchPic3;
	//
	la_image4.onmouseover = switchPic4;
	//
	la_image5.onmouseover = switchPic5;
	//
	la_image6.onmouseover = switchPic6;

	//CREATE FUNCTIONS TO CHANGE PICTURES
	function switchPic1(){
		bigImage.src = image1.src;
	}

	function switchPic2(){
		bigImage.src = image2.src;
	}

	function switchPic3(){
		bigImage.src = image3.src;
	}

	function switchPic4(){
		bigImage.src = la_image4.src;
	}

	function switchPic5(){
		bigImage.src = la_image5.src;
	}

	function switchPic6(){
		bigImage.src = la_image6.src;
	}

	//CREATE FUNCTION TO RESET IMAGE
	function resetPic(){
			bigImage.src = "images/title.png";
	}

	//RESET THE IMAGE WHEN MOUSE LEAVES
	//SETUP LISTENERS
	image1.onmouseout = resetPic;
	image2.onmouseout = resetPic;
	image3.onmouseout = resetPic;
	//
	la_image4.onmouseout = resetPic;
	//
	la_image5.onmouseout = resetPic;
	//
	la_image6.onmouseout = resetPic;
}//END onload FUNCTION