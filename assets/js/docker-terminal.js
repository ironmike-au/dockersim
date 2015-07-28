// -----------------------------------------------------------------------
// :: Pre-define a list of supported docker commands and responses
// -----------------------------------------------------------------------
var responses = {ps:"CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                    NAMES \n" +
                    "220c950d78f7        zem_one:0.0.2       \"/bin/bash\"         2 seconds ago       Up 1 seconds        0.0.0.0:8000->8000/tcp   boring_ritchie",
                 dkr_run:"220c950d78f70959c4a9e28b060c8965166b25204b5bf4c139294d022289de0e"};

var commands = {ps: "docker ps",
                dkr_run: "docker run -d -v /mnt/hgfs/django-initial-development:/www -i -t -p 8000:8000 zem_one:0.0.2 /bin/bash"}

// -----------------------------------------------------------------------
// :: Set up and respond to docker console commands using pre-defined responses
// -----------------------------------------------------------------------
jQuery(function($, undefined) {
    $('#term_demo').terminal(function(command, term) {
        var response = null;
        if (command == commands.ps) {
            response = responses.ps;
        } else if (command == commands.dkr_run) {
            response = responses.dkr_run;
        } else if (command == '') {
            response = '';
        }

        if (response == null) {
            term.echo(command + ": command not found\n");
        } else {
            term.echo(response + "\n");
        }


    }, {
        greetings: 'Last login: Mon Mar 30 07:28:52 2015 from 172.16.3.1',
        name: 'docker_demo',
        height: 200,
        prompt: '$ '});
});
