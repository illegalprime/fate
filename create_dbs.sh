#!/usr/bin/env bash
set -euo pipefail

COUCH_DB="127.0.0.1:5984"

curl -X PUT http://${COUCH_DB}/_users
curl -X PUT http://${COUCH_DB}/_replicator
curl -X PUT http://${COUCH_DB}/_global_changes
curl -X PUT http://${COUCH_DB}/fatedb
