#!/bin/bash
ls
mongorestore --host mongo --port 27017 -d ngShop -c products ./mongo-seed/products.bson
mongorestore --host mongo --port 27017 -d ngShop -c users /mongo-seed/users.bson

