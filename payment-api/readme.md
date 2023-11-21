```
npm i express cassandra-driver
```

docker pull cassandra
docker run -t -d -p 8000:8000 --name db cassandra
docker run -t -d -p 8000:8000 --name api ecamazon_payment_api
docker exec -it cassandra-container cqlsh
docker inspect -f '{{ .NetworkSettings.IPAddress }}' cassandra-container

CREATE KEYSPACE ecamazon_payment_db
WITH replication = {
'class': 'SimpleStrategy',
'replication_factor': 1
};

CREATE TABLE method (
method_id UUID PRIMARY KEY,
type text,
cardNumber text,
threeDigitCode text,
user_id int
);

CREATE TABLE payment(
payment_id UUID PRIMARY KEY,
method_id UUID,
amount float,
refund boolean,
user_id int
);

CREATE TABLE wallet(
wallet_id UUID PRIMARY KEY,
wallet float,
user_id int
);

INSERT INTO method (method_id,cardNumber,threeDigitCode,type,user_id) values (uuid(),'1234 4521 2561 1562','245','mastercard',8);
