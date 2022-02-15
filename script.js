
let listUrl = [{url:"http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=romance", category:"categorie3", page:"page1"},
{url:"http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=romance&page=2", category:"categorie3", page:"page2"},
{url:"http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=action", category:"categorie2", page:"page1"},
{url:"http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=action&page=2", category:"categorie2", page:"page2"},
{url:"http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=drama", category:"categorie1", page:"page1"},
{url:"http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=drama&page=2", category:"categorie1", page:"page2"},
{url:"http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score",category: "main_categorie", page:"page1"},
{url:"http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page=2",category: "main_categorie", page:"page2"}]

let fieldsModal = ["title", "date_published", "rated", "imdb_score", "duration", "worldwide_gross_income",
									"description"]
let tableFieldsModal = ["genres", "directors", "actors", "countries"]



async function fetchText(movies) {

	await fetch(movies.url).then(response => {
	    if (!response.ok) {
	      throw new Error('Network response was not OK');
	    }
	        	console.log(response.status)
	    return response.json()})
		.then(data => {
			var i = 0;
			for (result of data.results){
				if (movies.page == "page2" && i >= 2 ) {
					if (movies.category == "main_categorie" && i < 3){
						displayCategory(result);
						i++;
					}
				}else if (movies.category == "main_categorie" && movies.page == "page1" && i == 0){
					hightRatedMovie = data.results[0]["url"]
					i++

				}else {				
						displayCategory(result);
						i++
			}

		}
		 
		
		})
}

function displayCategory(result){
	let category = document.getElementById(movies.category);
	let a = document.createElement("a")
	a.setAttribute("href",result["url"])
	a.classList.add("openModal");
	a.innerHTML = "<img src='"+result["image_url"]+"'/>"
	let p = document.createElement("p")
	category.appendChild(p).appendChild(a)
}

async function fetchUrl(listUrl) {
	for (movies of listUrl){
		await fetchText(movies)		
	}

	await displayhighRatedMovie(hightRatedMovie)

	listA = document.getElementsByTagName('a')
	for (a of listA){
		a.addEventListener("click", function(event) {   
		event.preventDefault();
		urlMovie = this.getAttribute("href")
		openModal(urlMovie, a)
		}
	)
}
}

async function displayhighRatedMovie (url){

	await fetch(url).then(response => {
	    if (!response.ok) {
	      throw new Error('Network response was not OK');
	    }
	        	console.log(response.status)
	    return response.json()})
		.then(data => {
				let picture = document.getElementById("picture");
				let div1 = document.createElement("div")
				let div2 = document.createElement("div")
				let a = document.createElement("a")
				let h3 = document.createElement("h3")
				a.setAttribute("href",data["url"])
				a.classList.add("openModal");
				a.innerHTML = "<img src='"+data["image_url"]+"'/>"
				div1.appendChild(a)
				let p = document.createElement("p")
				p.innerHTML = "<button type='button'>Add to favorite</button></br>"+data['description']
				h3.innerHTML = data["title"]
				div2.appendChild(h3)
				div2.appendChild(p)
				picture.appendChild(div1)
				picture.appendChild(div2)
		})
}

function openModal(urlMovie, a){
	fetch(urlMovie).then(response => {
	    if (!response.ok) {
	      throw new Error('Network response was not OK');
	    }
	        	console.log(response.status)
	    return response.json()})
		.then(data => {
			console.log(data)
			var modal = document.getElementById("myModal");			
  		modal.style.display = "block";
  		const modalContent = document.getElementsByClassName("modal-content")
  		let pImage = document.createElement("p")
  		pImage.innerHTML = "<img src='"+data["image_url"]+"'/>"
  		let p = document.createElement("p")
  		let ul = document.createElement("ul")
  		p.appendChild(ul)
  	
  		for (field of fieldsModal) {
  			let li = document.createElement("li")
  			li.innerText = field + " : " + data[field]
  			ul.appendChild(li)
  		}

  		for (field of tableFieldsModal) {
  			let li = document.createElement("li")
  			li.innerText = field + " :"
  			for( donnee of data[field]){
  					let fieldOl = document.createElement("ol")
  					fieldOl.innerText = donnee
  					li.appendChild(fieldOl)
  			}
  			ul.appendChild(li)
  		}
  		modalContent[0].appendChild(pImage)
  		modalContent[0].appendChild(p)

  		var span = document.getElementsByClassName("close")[0];

  		// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
  				modal.style.display = "none";
  				modalContent[0].removeChild(p)
			  	modalContent[0].removeChild(pImage)
			}

			window.onclick = function(event) {
			if (event.target == modal) {
			  modal.style.display = "none";
			  modalContent[0].removeChild(p)
			  modalContent[0].removeChild(pImage)
  			}
			}	

	})
}
let hightRatedMovie = null
fetchUrl(listUrl);


	




