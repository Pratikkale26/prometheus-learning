# Project Overview

This project is a Node.js application that utilizes the Express framework to create a simple web server. The application is designed to demonstrate the use of Prometheus for monitoring and metrics collection.

## Features

* A simple web server with three endpoints: `/`, `/user`, and `/metrics`
* Prometheus integration for collecting metrics on request count, active users, and request duration
* Docker support for easy deployment and management
* Grafana integration for visualization of metrics

## Getting Started

### Prerequisites

* Node.js
* Docker 
* Prometheus
* Grafana

### Installation

1. Clone the repository: `git clone https://github.com/Pratikkale26/prometheus-learning.git`
2. Start the Docker container: `docker-compose up`

### Usage

1. Access the web server: `http://localhost:3000`
2. View metrics: `http://localhost:9090` (Prometheus UI)
3. Access Grafana: `http://localhost:3001` (Grafana UI)

## Configuration

### Environment Variables

* `PORT`: The port number to use for the web server (default: 3000)
* `PROMETHEUS_PORT`: The port number to use for Prometheus (default: 9090)

### Prometheus Configuration

* `prometheus.yml`: The configuration file for Prometheus (located in the root directory)

### Grafana Configuration

* `GF_SECURITY_ADMIN_PASSWORD`: The admin password for Grafana (default: admin)

## Monitoring and Metrics

### Request Count

* `request_count`: The total number of requests made to the web server
* `request_count{method="GET", route="/", status_code="200"}`: The number of GET requests to the `/` endpoint with a 200 status code

### Active Users

* `active_users`: The number of active users whose requests have not yet resolved
* `active_users{method="GET", route="/user"}`: The number of active users whose GET requests to the `/user` endpoint have not yet resolved

### Request Duration

* `https_request_duration_ms`: The duration of HTTP requests in milliseconds
* `https_request_duration_ms{method="GET", route="/", status_code="200"}`: The duration of GET requests to the `/` endpoint with a 200 status code

## Docker Compose

### Services

* `node-app`: The Node.js application
* `prometheus`: The Prometheus server
* `grafana`: The Grafana server

### Networks

* `monitoring`: The network used for communication between services
---

**Happy Coding!**
