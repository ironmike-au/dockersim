// -----------------------------------------------------------------------
// :: Pre-define a list of supported docker commands and responses
// -----------------------------------------------------------------------
var responses = {install: "Reading package lists... Done \n" +
                            "The following NEW packages will be installed: \n" +
                            "  docker.io \n" +
                            "0 upgraded, 1 newly installed, 0 to remove and 399 not upgraded. \n" +
                            "Setting up docker.io (1.0.1~dfsg1-0ubuntu1~ubuntu0.14.04.1) ... \n" +
                            "docker.io start/running, process 22098",
                 ps:"CONTAINER ID   IMAGE           COMMAND       CREATED         STATUS         PORTS       NAMES \n" +
                    "220c950d78f7   zem_one:0.0.2   \"/bin/bash\"   2 seconds ago   Up 1 seconds               boring_ritchie",
                 dkr_run:"220c950d78f70959c4a9e28b060c8965166b25204b5bf4c139294d022289de0e",
                 dkr_pull:"Pulling repository ubuntu \n" +
                            "d2a0ecffe6fa: Download complete \n" +
                            "83e4dde6b9cf: Download complete \n" +
                            "b670fb0c7ecd: Download complete \n" +
                            "29460ac93442: Download complete",
                 dkr_history: "IMAGE               CREATED             CREATED BY                                      SIZE \n" +
                            "d2a0ecffe6fa        2 weeks ago         /bin/sh -c #(nop) CMD [\"/bin/bash\"]             0 B \n" +
                            "29460ac93442        2 weeks ago         /bin/sh -c sed -i 's/^#\\s*\\(deb.*universe\\)$/   1.895 kB \n" +
                            "b670fb0c7ecd        2 weeks ago         /bin/sh -c echo '#!/bin/sh' > /usr/sbin/polic   194.5 kB \n" +
                            "83e4dde6b9cf        2 weeks ago         /bin/sh -c #(nop) ADD file:c8f078961a543cdefa   188.2 MB"};

var commands = {install: "sudo apt-get install docker.io",
                ps: "sudo docker ps",
                dkr_run: "sudo docker run -d -v /mnt/hgfs/django-initial-development:/www -i -t -p 8000:8000 zem_one:0.0.2 /bin/bash",
                dkr_pull: "sudo docker pull ubuntu:14.04",
                dkr_history: "sudo docker history ubuntu:14.04"}

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
        } else if (command == commands.install) {
            response = responses.install;
            $( "#l1-s1" ).hide();
            $( "#l1-s2" ).show();
        } else if (command == commands.dkr_pull) {
            response = responses.dkr_pull;
            $( "#l2-s1" ).hide();
            $( "#l2-s2" ).show();
            $( "#l2-s3" ).hide();
        } else if (command == commands.dkr_history) {
            response = responses.dkr_history;
            $( "#l2-s1" ).hide();
            $( "#l2-s2" ).hide();
            $( "#l2-s3" ).show();
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
