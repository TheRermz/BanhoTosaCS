#!/bin/bash

echo "Build do frontend iniciando..."
cd frontend || { echo "Não conseguiu entrar na pasta frontend"; exit 1; }
npm install
npm run build || { echo "Falha no build do frontend"; exit 1; }

echo "Build do backend iniciando..."
cd ../backend || { echo "Não conseguiu entrar na pasta backend"; exit 1; }
dotnet publish -c Release -o publish || { echo "Falha no build do backend"; exit 1; }

echo "Build finalizado com sucesso!"

