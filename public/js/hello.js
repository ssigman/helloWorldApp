var thePageApp;
$( () => {
    console.log("Page Loaded");
    thePageApp = new HelloApp();
    thePageApp.initialization();
});

class HelloApp {
    constructor (name) {
        this.title = name;
    }

    getTitle() {
        return this.title;
    }

    initialization() {
        $("#form1").submit((evt)=> {
            evt.preventDefault();
            console.log("Form submitted");

            // send the data via an ajax call
            let name = $('#name').val();
            let encodedName = encodeURIComponent(name);  // encodes the space 
            let queryStr = `?name=${encodedName}`;
            console.log(queryStr);

            // make an Ajax call to the route
            let url = `http://localhost:3000/hello${queryStr}`;
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'text',
            })
            .done((data, textStatus, jqXHR)=>{
                console.log(`Data is: ${data}`);
                // translate the < and > characters, which are html meta characters
                // we will use regular expressions to do the translation
                let preHtml = data.replace(/\</g,'&lt;'); // replace < with &lt;
                //preHtml = preHtml.replace(/\>/g,'&gt;');  // replace > with &gt;
                //console.log(`HTML as string: ${preHtml}`);
                $('#response').html(`<pre>${data}</pre>`);
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                let msg = '<h1 style="background-color: red">Error: no greeting available</h1>';
                $('#response')
            });
        })
    }
}