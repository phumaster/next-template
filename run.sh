#!/bin/bash

RED='\033[0;31m'
LIGHT_GREEN='\033[1;32m'
NC='\033[0m' # No Color

cp "./config/$1.env" .env && echo -e "${LIGHT_GREEN}Generate $1.env -> .env file for [$1]${NC}"

if [ $1 = "production" ]; then

elif [ $1 = "alpha" ]; then
  #npm run alpha && echo "y" | reg alpha && echo -e "${LIGHT_GREEN}[$1] deploy successfully${NC}";
elif [ $1 = "beta" ]; then
  #npm run beta && echo "y" | reg beta && echo -e "${LIGHT_GREEN}[$1] deploy successfully${NC}";
elif [ $1 = "development" ]; then
  #echo -e "You must input a valid parameter ${RED}(real|alpha|beta)${NC}.";
else
  echo -e "You must input a valid parameter ${RED}(production|alpha|beta|development)${NC}.";
fi
