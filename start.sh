#!/bin/bash
tmux \
    new-session -s BWL "cd Lavalink; java -jar ./Lavalink.jar" \; \
    split-window -t BWL "node d.js" \; \
    ls \; \
