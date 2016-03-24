$(document).ready(function() {
    var imagePath;
    //The URL of all our API calls
    var baseURL = 'https://api.themoviedb.org/3/';
    //The query string including apiKey anytime they ask for it
    var apiKey = '?api_key=fec8b5ab27b292a68294261bb21b04a5';
    //The configURL so that we can get basic config data
    var configURL = baseURL + 'configuration' + apiKey;

    //Make an AJAX call to the config URL.
    $.getJSON(configURL, function(configData) {
        //Set our global var imagePath to the result of our AJAX call
        imagePath = configData.images.base_url;
    });

    //Now Playing is default on page load. Set up the URL
    var nowPlaying = baseURL + 'movie/now_playing' + apiKey;
    //Make an AJAX call to the now playing URL.
    $.getJSON(nowPlaying, function(movieData) {
        var newHTML = '';
        //Loop through all the results and set up an image url.
        for (i = 0; i < movieData.results.length; i++) {
            var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
            newHTML += '<div class="col-sm-3">';
            newHTML += '<img src="' + currentPoster + '">';
            newHTML += '</div>';
            // console.log(currentPoster);
        }
        $('#poster-grid').html(newHTML);
    });


    $('#movie-form').submit(function(event) {
        // var userSearch = $('.typeahead').val();
        // console.log(userSearch);
        var userSearch = $('#searchText').val();

        // filter user searchs for 
        var searchFilter = $("#searchFilter").val()
        console.log(searchFilter)

        // set up a var for a search. movie end point
        var searchURL = baseURL + 'search/' + searchFilter + apiKey + '&query=' + encodeURI(userSearch);
        console.log(searchURl);
        //loop through all the results and set up an image uri 
        $.getJSON(searchURL, function(movieData) {
            var newHTML = '';
            //Loop through all the results and set up an image url.
            for (i = 0; i < movieData.results.length; i++) {
                if((searchFilter=='person') || ((searchFilter=='multi') && (movieData.results[i].mediaType=='person')));
                {
                    var currentPoster=imagePath + 'w300' + movieData.results[i].profile_path;
                }else{
                   
                var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
                }
                newHTML += '<div class="col-sm-3">';
                newHTML += '<img src="' + currentPoster + '">';
                newHTML += '</div>';
                // console.log(currentPoster);
            }
            $('#poster-grid').html(newHTML);
            // var typeSearch = ($('#movie-form .typeahead').typeahead('val'));
            // console.log($('#movie-form .typeahead').typeahead('val'));
            // console.log (typeSearch);
        });
        event.preventDefault();


    });






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
});


    // var actors = [
    //     'Brad Pitt',
    //     'Michael Douglas',
    //     'Al Pacino'
    // ];

    // $('#movie-form .typeahead').typeahead({
    //     hint: true,
    //     highlight: true,
    //     minLength: 1
    // },
    //     {
    //         name: 'actors',
    //         source: substringMatcher(actors)
    //     });