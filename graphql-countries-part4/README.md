# GraphQL Countries Part 4

This part is a continuation of [graphql-countries-part2](https://github.com/luisw19/graphql-samples/tree/master/graphql-countries-part3).

In this example, we have extended part3 by adding the following features:

- A new query parameter (in *resources/types.js*) called **xrateTo** used to specify to what currency convert a country's currency to
- A new object (in *resources/types.js*) type called **currencyExchange** that is to be populated based on a country's currency details but also the result of an exchange
-A new resolver type (in *resources/resolvers.js*) called **Currency** with a resolver function called **xrate** that takes as input the query parameters and invokes a conversion function
- A new function (in *resources/data.js*) called **conversion** that uses the node library [cheerio](https://cheerio.js.org/) to **web scrape** a Google's currency exchange search result

> Note that the steps to implement the new functionality are broadly the same as in **Part 3**
> therefore  detail steps are not included here.

Furthermore this part also includes two additional files:
- **Dockerfile**: that can be used to create a docker **container** that can run the GraphQL demo
- **graphqlToK8s.yaml**: that can be used to deploy the container into a [Kubernetes](https://kubernetes.io/) environment that has [Istio](https://Istio.io) configured

Following the steps to create a docker container and deploy to Kubernetes:

1. To build the container execute the following command:

```bash
docker build -t <container name> .
```

For example:

```bash
docker build -t luisw19/graphql4:1.0.0 .
```

To test that the container was correctly built you can run:

```bash
docker run -v $(pwd):/src -p 3000:3000 -it <container image ID>
```
> To find out the container image Id run: `docker images`

2. Push to a container registry (e.g. Dockerhub):

```bash
docker login --username=<username>
docker push <container name>
```

3. To deploy to Kubernetes:

> [Click here](https://luisw19.github.io/oci-series/oke-install/) for steps on how to create a **Kubernetes cluster** in **OKE**
> [Click here](https://luisw19.github.io/oci-series/oke-istio/) for steps on how to configure an **Istio Service Mesh** in **OKE**

Firstly create a target **namespace** e.g. **grahql-demo** as following

```bash
kubectl create namespace graphql-demo
```

```bash
kubectl label namespace graphql-demo istio-injection=enabled
```

And finally deploy by running:

```bash
kubectl -n graphql-demo create -f graphqlToK8s.yaml
```

To verity that all objects were properly created you can run:

```bash
kubectl -n graphql-demo get all
```

To monitor run:

```bash
kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=kiali -o jsonpath='{.items[0].metadata.name}') 20001:20001 &
kubectl port-forward -n istio-system $(kubectl get pod -n istio-system -l app=jaeger -o jsonpath='{.items[0].metadata.name}') 16686:16686 &
kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=grafana -o jsonpath='{.items[0].metadata.name}') 3000:3000 &
```

Open UIs:

- Kiali: [http://localhost:20001/kiali](http://localhost:20001/kiali)
- Grafana: [http://localhost:3000](http://localhost:3000)
- Jaeger: [http://localhost:16686](http://localhost:16686

To kill all tunnels:

```bash
killall kubectl
```

4. Test that you can access the Graphiql client through the URL:

```bash
http://<istion ingress IP or domain>/graphiql
```

5. To performance test using *fortio*:

```bash
fortio load -c 1 -qps 0 -n 1000 -loglevel Warning -content-type "application/json" -payload '{"query":"{  getCountries {    id    name  }}","variables":null,"operationName":null}' http://129.213.66.232/graphql?
```


6. To delete the artifacts run:

```
kubectl delete -n graphql-demo Deployment graphql4
kubectl delete -n graphql-demo Service graphql4
kubectl delete -n graphql-demo Gateway graphql4-gateway
kubectl delete -n graphql-demo VirtualService graphql4-vts
kubectl delete -n graphql-demo DestinationRule graphql4-dr
```