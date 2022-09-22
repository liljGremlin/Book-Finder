let bookList = {
    bookURL: "https://www.googleapis.com/books/v1/volumes?q=",
    fetchBook : function () {
        let searchData = document.querySelector('#search-box');
        if (searchData.value != "")
        {
        
            var book_list_ouput = document.querySelector("#list-output");
            book_list_ouput.innerHTML = "";

           fetch (
                this.bookURL
                + searchData.value
            )
            .then((Response) => Response.json())
            .then((data) => this.parseData(data));
            
            searchData.value = "";
        }
        else{
            displayError();
        }
    },
    parseData : function(data) {
        console.log(data);
      
        var book_list_ouput = document.querySelector("#list-output");

        for (i = 0; i < data.items.length; i++)
        {
            console.log(data.items[i]["volumeInfo"]["title"]);

            title = "N/A";
            authors = "N/A";
            imgURL = "";
            publisher = "N/A";
            bookCanonical = "";

            if (data.items[i]["volumeInfo"].hasOwnProperty('title'))
            {
                title = data.items[i]["volumeInfo"]["title"];
            }

            if (data.items[i]["volumeInfo"].hasOwnProperty('authors'))
            {
                authors = data.items[i]["volumeInfo"]["authors"];
            }
        
            if (data.items[i]["volumeInfo"]["imageLinks"].hasOwnProperty('thumbnail'))
            {
                imgURL = data.items[i]["volumeInfo"]["imageLinks"]["thumbnail"];
            }

            if (data.items[i]["volumeInfo"].hasOwnProperty('publisher'))
            {
                publisher = data.items[i]["volumeInfo"]["publisher"];
            }

            if (data.items[i]["volumeInfo"].hasOwnProperty('canonicalVolumeLink'))
            {
                bookCanonical = data.items[i]["volumeInfo"]["canonicalVolumeLink"];
            }
        
            book_list_ouput.innerHTML += formatOutput(imgURL, title, authors[0], publisher, bookCanonical);

        }
    
    }

}

document.querySelector(".btn").addEventListener("click", function() {
    //console.log("Button pressed");
    bookList.fetchBook();
})

document.querySelector("#search-box").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        bookList.fetchBook();
        //console.log("Enter pressed");
    }
})

function formatOutput(bookImg, title, author, publisher, bookLink)
{
    var htmlCard = `
        <div class="col-auto">
            <div class="card" style="width: 18rem;">
                <img src="`+bookImg+`" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-black">`+title+`</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Author: `+author+`</li>
                    <li class="list-group-item">Publisher: `+publisher+`</li>
                </ul>
                <div class="card-body">
                    <a href="`+bookLink+`" class="card-link">Book Link</a>
                </div>
            </div>
        </div>`

    return htmlCard;
}

function displayError ()
{
    console.log("Error");
}
