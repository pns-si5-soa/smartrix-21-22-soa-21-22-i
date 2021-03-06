# smartrix-21-22-soa-21-22-i

Le rapport final est [ici](https://github.com/pns-si5-soa/smartrix-21-22-soa-21-22-i/blob/master/documentation/Rendu%20final%20-%20Equipe%20I.pdf)  

# Résultats attendus lors du prepare.sh
*Attention : des erreurs peuvent apparaître lors de la première exécution de prepare.sh, cela est dû à la tentative de suppression des images docker des maisons.* 

# Résultats attendus lors du run.sh
## Résultats attendus avant l’exécution des scénarios
Avant l’exécution des scénarios, les containers de tous nos services (sauf house créé lors du prepare.sh) sont lancés grâce au docker-compose, puis on crée le container permettant de lancer les scénarios. 

*Attention : certains résultats peuvent différés en fonction des appels précédents (ex: consommation totale)*

## Log attendus des scénarios
voir scenario1.txt dans documentation  
voir scenario2.txt dans documentation  
voir scenario3.txt dans documentation  

# Participation
Valentin Campello : 95
Lucie Morant : 95 
Yann Martin D'Escrienne : 107
Tigran Nersissian : 95
Yohann Tognetti : 108

## Scénarios
**Scénario 1 : inscription, object paramétrable et adaptation de la production avec la consommation**

1 - Une nouvelle maison s’inscrit à Smartgrid  
2 - SmartGrid attribue un ID à la maison   
3 - Le client peut voir sa consommation depuis son boitier  
4 - Un nouveau producteur s’inscrit à SmartGrid    
5 - SmartGrid attribue un ID au producteur  
6 - On vérifie que la consommation est égale à la production  
7 - Un object paramètrable est branché à la maison   
8 - On demande un planning de consommation pour cet objet   
9 - On voit que l’objet consomme à son heure d'activité  
10 - On constate que la production n’est plus égale à la consommation  
11 - On vérifie que la production s’est bien adaptée  
12 - Trois mois s'écoulent, le client veut voir sa facture du premier mois et du mois courant  

**Scénario 2 : Gestion de la consommation, achat des données, pic et autarky dans une communauté**  

1 - On a des maisons dans une communauté et une autre dans une autre communauté    
2 - On ajoute plein d’objets planifiables et non planifiables dans les maisons   
3 - On regarde la consommation totale de toutes les maisons   
4 - On regarde la consommation dans une communauté  
5 - On détecte un pic de consommation dans cette communauté  
6 - On demande aux objets planifiables d'arrêter de charger dans cette communauté   
7 - On remarque qu’il n’y a maintenant plus de pic  
8 - On regarde si la communauté est en autarcie et ce n'est pas le cas
9 - On ajoute la production suffisante dans une des maisons de la communauté pour passer en autarcie
10 - On ajoute un nouveau partenaire avec des datapoints, il récupère les données de production des clients  
11 - Le partenaire récupère les données de consommation détaillée des clients mais n'a plus de datapoints, il en reprend et retente mais il n'a pas le niveau de confiance requis  

**Scénario 3 : Production d'une maison, autarcie et notification**

1 - On inscrit une maison avec des objets consommant de l'éléctricité et on l'inscrit en tant que producteur  
2 - On ajoute à la maison un objet produisant de l'électricité et une batterie  
3 - On remarque que la consommation est réduite mais toujours positive  
4 - On regarde la production de la maison depuis SmartGrid, celle-ci est accessible mais pas suffisante  
5 - On voit que la maison n'est pas en autarcie et que la batterie n'a rien stocké  
6 - On ajoute un deuxième objet producteur dans la maison  
7 - On voit que la production est maintenant plus grande que la consommation  
8 - On voit maintenant que la maison est passée en autarcie et que le client à reçu une notification
9 - On constate que la batterie a stocké le surplus d'énergie  
10 - On désactive le réacteur DIY pour que la consommation soit plus elevée que la production et que la batterie soit utilisée

*PS: Plusieurs sleep sont effectués dans les scénarios pour attendre que le traitement des événements s'effectues.*

## Docker

- build project: `docker-compose build --pull`
- start project: `docker-compose up`
- start project in background: `docker-compose up -d`
- Enter in bash: `docker-compose exec name-of-service sh` (replace name-of-service ex : `docker-compose exec house sh`)
- build only one service: `docker-compose build name-of-service`
- log of service: `docker-compose logs -f --tail=1000 name-of-service`

## Utils

- Create new nestJS project with cli: `nest new project-name`
- Install dependency:  `npm install`
- Run script in package.json: `npm run script-name`
- Generate controller: `nest g controller path/name`
- Generate service: `nest g service path/name`

## Port

- 127.0.0.1 autarky-api=3021  
- 127.0.0.1 autarky-oversight=3032
- 127.0.0.1 battery=3018
- 127.0.0.1 battery-provider=3017
- 127.0.0.1 bill-api=3016
- 127.0.0.1 client-consumption-api=2997
- 127.0.0.1 client-database=3004
- 127.0.0.1 client-notifier=3031
- 127.0.0.1 consumption-adder=_  
- 127.0.0.1 consumption-api:2998
- 127.0.0.1 consumption-detailed=3008  
- 127.0.0.1 consumption-peak=_  
- 127.0.0.1 consumption-provider=3012
- 127.0.0.1 consumption-scheduler=3002  
- 127.0.0.1 consumption-verifier=_  
- 127.0.0.1 daily-consumption-db=3013
- 127.0.0.1 daily-production-db=3014
- 127.0.0.1 daily-real-energy-output=3020
- 127.0.0.1 electricity-frame=3015  
- 127.0.0.1 global-consumption-database=3009
- 127.0.0.1 global-production-database=3001
- 127.0.0.1 house=3000  
- 127.0.0.1 partner-api=3019 
- 127.0.0.1 producer-database=3010
- 127.0.0.1 producers=3005  
- 127.0.0.1 production-adapter=_
- 127.0.0.1 production-api=2999
- 127.0.0.1 production-provider=3006
- 127.0.0.1 registry-manager=3003  
- 127.0.0.1 real-energy-output=3030

## Host

- 127.0.0.1 autarky-api
- 127.0.0.1 autarky-oversight
- 127.0.0.1 battery
- 127.0.0.1 battery-provider
- 127.0.0.1 bill-api
- 127.0.0.1 client-consumption-api
- 127.0.0.1 client-database
- 127.0.0.1 client-notifier
- 127.0.0.1 consumption-adder
- 127.0.0.1 consumption-api
- 127.0.0.1 consumption-db
- 127.0.0.1 consumption-detailed
- 127.0.0.1 consumption-peak
- 127.0.0.1 consumption-provider
- 127.0.0.1 consumption-scheduler
- 127.0.0.1 consumption-verifier
- 127.0.0.1 daily-consumption-db
- 127.0.0.1 daily-production-db
- 127.0.0.1 daily-real-energy-output
- 127.0.0.1 electricity-frame
- 127.0.0.1 global-consumption-database
- 127.0.0.1 global-production-database
- 127.0.0.1 house
- 127.0.0.1 partner-api
- 127.0.0.1 producer-database
- 127.0.0.1 producers
- 127.0.0.1 production-adapter
- 127.0.0.1 production-api
- 127.0.0.1 production-provider
- 127.0.0.1 registry-manager
- 127.0.0.1 real-energy-output

- 127.0.0.1 kafka
- 127.0.0.1 mock
- 127.0.0.1 database 

