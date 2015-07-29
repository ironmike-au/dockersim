// -----------------------------------------------------------------------
// :: Pre-define a list of supported docker commands and responses
// -----------------------------------------------------------------------
var responses = {install: "Reading package lists... Done \n" +
                            "The following NEW packages will be installed: \n" +
                            "  docker.io \n" +
                            "0 upgraded, 1 newly installed, 0 to remove and 399 not upgraded. \n" +
                            "Setting up docker.io (1.0.1~dfsg1-0ubuntu1~ubuntu0.14.04.1) ... \n" +
                            "docker.io start/running, process 22098",
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
                            "83e4dde6b9cf        2 weeks ago         /bin/sh -c #(nop) ADD file:c8f078961a543cdefa   188.2 MB",
                dkr_run1: "oops",
                psa: "CONTAINER ID    IMAGE         COMMAND     CREATED        STATUS                    PORTS    NAMES\n" +
                     "ad9521dbc0e5    ubuntu:14.04  echo oops   3 seconds ago  Exited (0) 3 seconds ago           romantic_pike",
                cat_df: "FROM ubuntu:14.04 \n" +
                        "RUN apt-get -qq update \n" +
                        "RUN DEBIAN_FRONTEND=noninteractive apt-get -qq -y install apache2\n" +
                        "EXPOSE 80",
                build: "Sending build context to Docker daemon   270 MB\n" +
                        "Sending build context to Docker daemon\n" +
                        "Step 0 : FROM ubuntu:14.04\n" +
                        " ---> d2a0ecffe6fa\n" +
                        "Step 1 : RUN apt-get -qq update\n" +
                        " ---> Running in 0bd304f56169\n" +
                        " ---> 5f36cc5a4c87\n" +
                        "Removing intermediate container 0bd304f56169\n" +
                        "Step 2 : RUN DEBIAN_FRONTEND=noninteractive apt-get -qq -y install apache2\n" +
                        " ---> Running in 645a4b93f9e9\n" +
                        " ---> 0d62f6031bd8\n" +
                        "Removing intermediate container 645a4b93f9e9\n" +
                        "Step 3 : EXPOSE 80\n" +
                        " ---> Running in 3afb64899583\n" +
                        " ---> b98425368341\n" +
                        "Removing intermediate container 3afb64899583\n" +
                        "Successfully built b98425368341",
                history: "IMAGE               CREATED             CREATED BY                                      SIZE\n" +
                        "b98425368341        5 minutes ago       /bin/sh -c #(nop) EXPOSE map[80/tcp:{}]         0 B\n" +
                        "0d62f6031bd8        5 minutes ago       /bin/sh -c DEBIAN_FRONTEND=noninteractive apt   14.81 MB\n" +
                        "5f36cc5a4c87        6 minutes ago       /bin/sh -c apt-get -qq update                   21.11 MB\n" +
                        "d2a0ecffe6fa        2 weeks ago         /bin/sh -c #(nop) CMD [\"/bin/bash\"]             0 B\n" +
                        "29460ac93442        2 weeks ago         /bin/sh -c sed -i 's/^#\\s*\\(deb.*universe\\)$/   1.895 kB\n" +
                        "b670fb0c7ecd        2 weeks ago         /bin/sh -c echo '#!/bin/sh' > /usr/sbin/polic   194.5 kB\n" +
                        "83e4dde6b9cf        2 weeks ago         /bin/sh -c #(nop) ADD file:c8f078961a543cdefa   188.2 MB",
                dkr_run2: "202d56ea7b51f53bda8b9d8c04880cca3038cb27e26a7b0c351964802afc1cac",
                ps: "CONTAINER ID  IMAGE             COMMAND      CREATED         STATUS        PORTS        NAMES\n" +
                    "202d56ea7b51  littleguy:latest  apache2ctl   20 seconds ago  Up 20 seconds  80->80/tcp   angry_sammet",
                wget: "Resolving localhost (localhost)... 127.0.0.1\n" +
                        "Connecting to localhost (localhost)|127.0.0.1|:80... connected.\n" +
                        "HTTP request sent, awaiting response... 200 OK\n" +
                        "Length: 11510 (11K) [text/html]\n" +
                        "Saving to: ‘index.html’\n" +
                        "\n" +
                        "100%[==========================================================>] 11,510      --.-K/s   in 0s\n" +
                        "\n" +
                        "2015-07-29 11:23:44 (276 MB/s) - ‘index.html’ saved [11510/11510]"
            };

var commands = {install: "apt-get install docker.io",
                dkr_run: "docker run -d -v /mnt/hgfs/django-initial-development:/www -i -t -p 8000:8000 zem_one:0.0.2 /bin/bash",
                dkr_pull: "docker pull ubuntu:14.04",
                dkr_history: "docker history ubuntu:14.04",
                dkr_run1: "docker run ubuntu:14.04 echo \"oops\"",
                psa: "docker ps -a",
                cat_df: "cat Dockerfile",
                build: "docker build -t littleguy /littleguy",
                history: "docker history littleguy",
                dkr_run2: "docker run -d -p 80:80 littleguy /usr/sbin/apache2ctl -D FOREGROUND",
                ps: "docker ps",
                wget: "wget localhost"
                }

// -----------------------------------------------------------------------
// :: Set up and respond to docker console commands using pre-defined responses
// -----------------------------------------------------------------------
jQuery(function($, undefined) {
    $('#term_demo').terminal(function(command, term) {
        var response = null;
        if (command == commands.install) {
            response = responses.install;
            $( "#l1-s1" ).hide();
            $( "#l1-s2" ).fadeIn();
        } else if (command == commands.dkr_pull) {
            response = responses.dkr_pull;
            $( "#l2-s1" ).hide();
            $( "#l2-s2" ).fadeIn();
            $( "#l2-s3" ).hide();
        } else if (command == commands.dkr_history) {
            response = responses.dkr_history;
            $( "#l2-s1" ).hide();
            $( "#l2-s2" ).hide();
            $( "#l2-s3" ).fadeIn();
        } else if (command == commands.dkr_run1) {
            response = responses.dkr_run1;
            $( "#l3-s1" ).hide();
            $( "#l3-s2" ).fadeIn();
            $( "#l3-s3" ).hide();
        } else if (command == commands.psa) {
            response = responses.psa;
            $( "#l3-s1" ).hide();
            $( "#l3-s2" ).hide();
            $( "#l3-s3" ).fadeIn();
        } else if (command == commands.cat_df) {
            response = responses.cat_df;
            $( "#l4-s1" ).hide();
            $( "#l4-s2" ).fadeIn();
            $( "#l4-s3" ).hide();
            $( "#l4-s4" ).hide();
        } else if (command == commands.build) {
            response = responses.build;
            $( "#l4-s1" ).hide();
            $( "#l4-s2" ).hide();
            $( "#l4-s3" ).fadeIn();
            $( "#l4-s4" ).hide();
        } else if (command == commands.history) {
            response = responses.history;
            $( "#l4-s1" ).hide();
            $( "#l4-s2" ).hide();
            $( "#l4-s3" ).hide();
            $( "#l4-s4" ).fadeIn();
        } else if (command == commands.dkr_run2) {
            response = responses.dkr_run2;
            $( "#l5-s1" ).hide();
            $( "#l5-s2" ).fadeIn();
            $( "#l5-s3" ).hide();
            $( "#l5-s4" ).hide();
        } else if (command == commands.ps) {
            response = responses.ps;
            $( "#l5-s1" ).hide();
            $( "#l5-s2" ).hide();
            $( "#l5-s3" ).fadeIn();
            $( "#l5-s4" ).hide();
        } else if (command == commands.wget) {
            response = responses.wget;
            $( "#l5-s1" ).hide();
            $( "#l5-s2" ).hide();
            $( "#l5-s3" ).hide();
            $( "#l5-s4" ).fadeIn();
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
        prompt: '# '});
});
