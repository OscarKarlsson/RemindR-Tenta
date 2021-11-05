const addbutton = document.getElementById("addBtn");
const taskModal = document.querySelector("taskModal");
const PageTitle = document.querySelector(".navbar-brand");

var todo = new function(){
    this.el = document.getElementById('info');
    this.tasks=[];
    this.fetchAll = function(){
        var data = '';

        if(this.tasks.length>0){
            console.log("if")
            for(i=0; i<this.tasks.length;i++){
                data += '<div class="card-info">' +
                            '<p id="textStyle">'+this.tasks[i]+'</p>' +
                            '<button id="editBtn" onclick="todo.Edit('+i+')"><i class="fa fa-pencil"></i></button>' +
                            '<button id="DeleteBtn" onclick="todo.Delete('+i+')"><i class="fa fa-trash"></i></button>' +
                        '</div>';
            }
        }
        return this.el.innerHTML = data;
    };

    this.Add = function(){
        el = document.getElementById('add-todo');
        var task = el.value;
        
        if(task){
            this.tasks.push(task.trim());
            el.value = "";
            $("#taskModal").modal("toggle");
            
            this.fetchAll();
        }
    };

    this.Edit = function(item){
        el = document.getElementById('edit-todo');
        el.value = this.tasks[item];
        self=this;
        $("#editTaskModal").modal("show");
        document.getElementById('save-edit').onsubmit = function
        (){
            var task = el.value;
            if(task){
                console.log("if stat")
                self.tasks.splice(item, 1, task.trim());
                self.fetchAll();
                $("#editTaskModal").modal("hide");
            }
        }
    };

    this.Delete = function(item){
        this.tasks.splice(item,1);
        this.fetchAll();
    };
}

GoToMovies = function(){
    console.log("go to movies");
    PageTitle.innerHTML = 'Movies';
    
    addbutton.setAttribute('data-bs-target', '#movieModal');
    movie.fetchAll();
}

GoToTasks = function(){
    console.log("go to tasks");
    PageTitle.innerHTML = 'Tasks';
    addbutton.setAttribute('data-bs-target', '#taskModal');
    todo.fetchAll();
}

var movie = new function(){
    this.el = document.getElementById('info');
    this.movies=[];
    this.currMovie;

    this.fetchAll = function(){
        var data = '';
        console.log("fetch movies")
        if(this.movies.length>0){
            console.log("if")
            for(i=0; i<this.movies.length;i++){
                data += '<div class="card-info">' +
                            '<h5 id="textStyle">'+this.movies[i].Title+'</h5>' +
                            '<p id="textStyle">'+this.movies[i].Year+'</p>' +
                            '<button id="editBtn" onclick="movie.Show('+i+')"><i class="fa fa-eye"></i></button>' +
                            '<button id="DeleteBtn" onclick="movie.Delete('+i+')"><i class="fa fa-trash"></i></button>' +
                        '</div>';
            }
        }
        return this.el.innerHTML = data;
    };

    this.Search = async function(){
        
        el = document.getElementById('search-movie');
        let res = await axios
        .get("http://www.omdbapi.com/?t=" + el.value + "&apikey=ac8565a0")
        .catch((error) => console.error(error));
        console.log("http://www.omdbapi.com/?t=" + el.value + "&apikey=ac8565a0");
        console.log(res.data);
        this.DisplaySearch(res.data);
        
    }

    this.DisplaySearch = function(item){
        document.getElementById("posterSearch").src = item.Poster;
        document.getElementById("titleSearch").innerText = item.Title;
        document.getElementById("yearSearch").innerText = item.Year;
        document.getElementById("plotSearch").innerText = item.Plot;
        currMovie = item;
        console.log("test")
    }

    this.Add = function(){
        
        console.log(currMovie.Title);
        var movie = currMovie;
        
        if(movie){
            this.movies.push(movie);
            console.log("Add");
            $("#searchMovieModal").modal("toggle");
            
            this.fetchAll();
        }
    };

    this.Show = function(item){
        var movie = this.movies[item];
        console.log("show function")
        document.getElementById("posterShow").src = movie.Poster;
        document.getElementById("titleShow").innerText = movie.Title;
        document.getElementById("yearShow").innerText = movie.Year;
        document.getElementById("plotShow").innerText = movie.Plot;
        $("#showMovieModal").modal("toggle");
    };

    this.Delete = function(item){
        this.movies.splice(item,1);
        this.fetchAll();
    };
}
