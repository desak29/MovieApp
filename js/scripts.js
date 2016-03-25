$(document).ready(function() {
    var card1 = '<div class="o-wrapper"><div class="c-movie-card"><div class="c-movie-card__img" style= background-image:url("'
    var card2 = '")></div><div class="c-movie-card__btn-cont"><span class="c-movie-card__rating "> 9.1 </span><a href="" class="btn--lrg "><svg class="shopping" viewBox="0 0 40 37" <g fill="#fff" fill-rule="evenodd"><path d="M17.476 27.817c-1.13 0-2.156.443-2.917 1.165-.03.026-.06.05-.088.08-.768.767-1.244 1.828-1.244 3s.475 2.233 1.245 3h.002c.77.77 1.833 1.246 3 1.246 1.173 0 2.236-.475 3.005-1.245.77-.768 1.245-1.83 1.245-3.002 0-1.166-.478-2.23-1.25-3-.77-.768-1.83-1.243-3-1.243zM32.468 18.802l.84-4.462c.135-.714-.336-1.4-1.048-1.53-.713-.136-1.4.334-1.533 1.045l-.84 4.463c-.134.712.337 1.4 1.05 1.532.71.134 1.4-.335 1.53-1.048z"/><path d="M38.683 8.05H17.215c-.727 0-1.317.59-1.317 1.314 0 .728.59 1.317 1.317 1.317h19.828l-2.51 11.203H15.496L11.07 1.045C10.94.425 10.39.002 9.782.002V0H1.317C.59 0 0 .59 0 1.317c0 .726.59 1.315 1.317 1.315h7.4l4.412 20.76c.094.636.64 1.122 1.302 1.122h21.15v-.005c.603 0 1.146-.417 1.282-1.028l3.073-13.714c.04-.128.063-.262.063-.404 0-.725-.59-1.315-1.317-1.315zM32.365 27.817c-1.128 0-2.155.443-2.917 1.165-.03.026-.058.05-.086.08-.77.767-1.244 1.828-1.244 3s.475 2.233 1.245 3h.002c.77.77 1.832 1.246 3 1.246 1.17 0 2.232-.477 3.003-1.25.77-.77 1.245-1.828 1.245-2.997 0-1.17-.475-2.23-1.245-3-.767-.768-1.83-1.243-3.003-1.243z"/></g></svg></a></div><div class="c-movie-card__content "><h1 class="c-movie-card__title">'
    var card3= '</h1><span id="bottom">scroll to bottom</span><br /><br/><div id="scroll"><p class="c-movie-card__description">'
    var card4= '</p></div><span id="bottom"> scroll to bottom</span></div><span class="c-icons__arow"><svg version="1.1"viewBox="0 0 28.6 8"><style type="text/css">.st0{fill:#E5E5E5;}</style><path class="st0" d="M0.4,1.5L14,7.9c0,0,0,0,0,0c0,0,0.1,0,0.1,0c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0,0,0.1,0c0,0,0,0,0.1,0c0,0,0,0,0.1,0c0,0,0,0,0,0l13.6-6.5c0.4-0.2,0.5-0.6,0.4-1C28.4,0.2,28.2,0,27.9,0c-0.1,0-0.2,0-0.3,0.1L14.3,6.4L1.1,0.1C1,0,0.9,0,0.8,0C0.5,0,0.2,0.2,0.1,0.4C-0.1,0.8,0.1,1.3,0.4,1.5z"/></svg></span></div></div>'
    var genreArray = [];

    $('#searchFilter').change(function() {
        console.log($(this).val());
    })

    var imagePath;
    //The URL of all our API calls
    var baseURL = 'https://api.themoviedb.org/3/';
    //The query string including apiKey anytime they ask for it
    var apiKey = '?api_key=2b48fa2dfc43d63624535767490bfea4';
    //The configURL so that we can get basic config data
    var configURL = baseURL + 'configuration' + apiKey;

    //Make an AJAX call to the config URL.
    $.getJSON(configURL, function(configData) {
        //Set our global var imagePath to the result of our AJAX call
        imagePath = configData.images.base_url;
    });


    var genreURL = baseURL + 'genre/movie/list' + apiKey;
    //Make an AJAX call to the genre URL.
    $.getJSON(genreURL, function(genreData) {
        // console.log(genreData);
        for (i = 0; i < genreData.genres.length; i++) {
            var genreID = genreData.genres[i].id;
            var genreName = genreData.genres[i].name;
            genreArray[genreID] = genreName;
        }

        var genreHTML = '';
        for (i = 0; i < genreArray.length; i++) {
            if (genreArray[i] != undefined) {
                genreHTML += '<input type="button" id="' + genreArray[i] + '" class="btn btn-default genre-button" value="' + genreArray[i] + '">'
            }
        }

        $('#genre-buttons').html(genreHTML);
        addGenreClicks();

        console.dir(genreArray);
    });


    //Now Playing is default on page load. Set up the URL
    var nowPlaying = baseURL + 'movie/now_playing' + apiKey;
    //Make an AJAX call to the now playing URL.
    $.getJSON(nowPlaying, function(movieData) {
        // console.log(movieData);
        var newHTML = '';
        //Loop through all the results and set up an image url.
        for (i = 0; i < movieData.results.length; i++) {
            console.log(movieData.results[i]);
            var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
            var firstGenreID = movieData.results[i].genre_ids[0];
            var genreName = genreArray[firstGenreID];
            var title = movieData.results[i].original_title;
            newHTML += '<div class="col-sm-3 now-playing ' + encodeURI(genreName) + '">';
              
            newHTML += '<img src="' + currentPoster + '">';
            newHTML += '</div>';
            // console.log(currentPoster);
        }
        $('#poster-grid').html(newHTML);

        getIsotope();
    });


    $('#movie-form').submit(function(event) {
        // var userSearch = $('.typeahead').typeahead('val');
        // console.log(userSearch);

        //Value the user searched for
        var userSearch = $('#searchText').val();
        //Filter the user searched for (movie, actor, etc.)
        var searchFilter = $('#searchFilter').val();
        // console.log(searchFilter);

        //Setup the endpoing to use the value of the select box as the parameter after /search
        var searchURL = baseURL + 'search/' + searchFilter + apiKey + '&query=' + encodeURI(userSearch);

        //Set up a var with the search/movie endpoint. Make sure to include the query string
        //the query string needs to be encoded in case the user has some odd symbos or characters
        // -- FOR WHEN WE WERE ONLY SEARCHING FOR MOVIES - var movieSarch = baseURL + 'search/movie' + apiKey + '&query=' + encodeURI(userSearch);
        //Make an AJAX call to the now playing URL.q
        $.getJSON(searchURL, function(movieData) {
            var newHTML = '';
            
            //Loop through all the results and set up an image url.
            for (i = 0; i < movieData.results.length; i++) {
                var title = movieData.results[i].original_title;
                var overview = movieData.results[i].overview;
                // console.log(movieData.results[i]);
                if ((searchFilter == 'person') || ((searchFilter == 'multi') && (movieData.results[i].media_type == 'person'))) {
                    var currentPoster = imagePath + 'w300' + movieData.results[i].profile_path;
                } else {
                    var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
                }

                // console.log(movieData.results[i]);

                newHTML += '<div class="col-sm-3">'+card1;
                newHTML +=  currentPoster;
                newHTML += card2+title +card3+ overview +card4+'</div>';
                // console.log(currentPoster);
            }
            $('#poster-grid').html(newHTML);
            getIsotope();
        });
        event.preventDefault();
    });
});

// $('#searchText').keyup(function(){
// 	$(this).val();
// });

var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};


var arrayToSearch = [];
for (i = 1; i <= 6; i++) {
    var popularMovies = 'https://api.themoviedb.org/3/movie/popular?api_key=fec8b5ab27b292a68294261bb21b04a5&page=' + i;
    console.log(popularMovies);
    $.getJSON(popularMovies, function(popularM) {
        for (j = 0; j < popularM.results.length; j++) {
            arrayToSearch.push(popularM.results[j].original_title);
        }
        // console.log(arrayToSearch);
    });
}





var actors = [
    'Brad Pitt',
    'Michael Douglas',
    'Al Pacino'
];

$('#movie-form .typeahead').typeahead(
    {
        hint: true,
        highlight: true,
        minLength: 3
    },
    {
        name: 'actors',
        source: substringMatcher(actors)
    }
);

function getIsotope() {
    var theGrid = $('#poster-grid').isotope(
        {
            // options
            itemSelector: '.now-playing'
        });

    // layout Isotope after each image loads
    theGrid.imagesLoaded().progress(function() {
        theGrid.isotope('layout');
    });

}

function addGenreClicks() {
    $('.genre-button').click(function() {
        $('#poster-grid').isotope({ filter: '.' + $(this).attr('id') });
    });
}