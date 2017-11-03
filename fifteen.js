//Extra Feature : Multiple Backgrounds
let empty_tile = {x: 300, y :300};
let options = ["Nike", "Windows", "Animals","Story"];
window.onload = function(){
	let tiles = document.getElementById("puzzlearea").getElementsByTagName("div");
	let button = document.getElementById("shufflebutton");
	let div_control = document.getElementById("controls");
	let select = document.createElement("select");
	let change_image = document.createElement("button");
	let background_value = Math.floor(Math.random()*options.length);
	let image = options[background_value];
	for(let index=0;index<tiles.length;index++){
		if(image === "Nike"){
			tiles[index].style.backgroundImage = "url(background.jpg)";
		}
		if(image === "Windows"){
			tiles[index].style.backgroundImage = "url(background1.jpg)";
		}
		if(image === "Animals"){
			tiles[index].style.backgroundImage = "url(background2.jpg)";
		}
		if(image === "Story"){
			tiles[index].style.backgroundImage = "url(background3.jpg)";
		}
	}
	for(let index=0;index<options.length;index++){
		let option = document.createElement("option");
		option.text = options[index];
		select.add(option);
	}
	div_control.appendChild(select);
	change_image.innerHTML = "Change Image";
	div_control.appendChild(change_image);
	let move_tiles = [];
	for(let index=0; index<tiles.length;index++){
		tiles[index].setAttribute("class", "puzzlepiece");
		tiles[index].style.left = ((index%4)*100)+"px";
		tiles[index].style.top = (parseInt(index/4)*100)+"px";
		tiles[index].style.backgroundPosition = "-"+tiles[index].style.left+" "+"-"+tiles[index].style.top;
		tiles[index].addEventListener("mouseover",function(){
			if(moveable(tiles[index])){
				tiles[index].setAttribute("class","puzzlepiece movablepiece");
			}
			else{
				tiles[index].setAttribute("class","puzzlepiece");
			}
		});
		tiles[index].addEventListener("click",function(){
			if(moveable(tiles[index])){
				move(tiles[index]);
			}
		});
	}
	button.addEventListener("click",function(){
		for(let count=0;count<100;count++){
			for(let index=0;index<tiles.length;index++){
				if(moveable(tiles[index])){
					let found = search_array(move_tiles,tiles[index]);
					if(found === -1){
						move_tiles.push(tiles[index]);
					}
				}else{
					let remove_index = search_array(move_tiles,tiles[index]);
					if(remove_index>-1){
						move_tiles.splice(remove_index,1);
					}
				}
			}
			let random_value=Math.floor(Math.random()*4);
			if(random_value<move_tiles.length){
				move(move_tiles[random_value]);
			}
		}
	});
	change_image.addEventListener("click",function(){
		for(let index=0;index<tiles.length;index++){
			let choice = select.options[select.selectedIndex];
			if(choice.text === "Nike"){
				tiles[index].style.backgroundImage = "url(background.jpg)";
			}
			if(choice.text === "Windows"){
				tiles[index].style.backgroundImage = "url(background1.jpg)";
			}
			if(choice.text === "Animals"){
				tiles[index].style.backgroundImage = "url(background2.jpg)";
			}
			if(choice.text === "Story"){
				tiles[index].style.backgroundImage = "url(background3.jpg)";
			}
		}
	});
}
function moveable(tile){
	if((parseInt(tile.style.left)===empty_tile.x)&&(Math.abs(parseInt(tile.style.top)-empty_tile.y)<=100)){
		return true;
	}
	if((parseInt(tile.style.top)===empty_tile.y)&&(Math.abs(parseInt(tile.style.left)-empty_tile.x)<=100)){
		return true;
	}
	return false;
}
function move(tile){
	let swap_tile = {x : empty_tile.x, y : empty_tile.y};
	empty_tile.x = parseInt(tile.style.left);
	empty_tile.y = parseInt(tile.style.top);
	tile.style.left = swap_tile.x+"px";
	tile.style.top = swap_tile.y+"px";
}
function search_array(arr, target){
	for(let index=0;index<arr.length;index++){
		if(arr[index] === target){
			return index;
		}
	}
	return -1;
}