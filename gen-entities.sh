#!/bin/bash
npx typeorm-model-generator -h localhost -d recruitment_management -u root -x "root" -e mysql -o /tmp/
mv /tmp/entities/* ./src/entity
