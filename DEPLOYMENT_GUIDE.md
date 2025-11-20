# Deployment Guide
## ZenUML - Web-Based UML Diagram Editor

**Document Version**: 1.0.0
**Date**: November 18, 2024
**Status**: Draft

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Development Deployment](#development-deployment)
3. [Staging Deployment](#staging-deployment)
4. [Production Deployment](#production-deployment)
5. [Monitoring & Maintenance](#monitoring--maintenance)
6. [Rollback Procedures](#rollback-procedures)

---

## 1. Prerequisites

### Required Tools

```bash
# Version control
git --version  # 2.30+

# Container
docker --version  # 20.10+
docker-compose --version  # 1.29+

# Cloud CLI
aws --version  # 2.0+  (for AWS)
gcloud --version  # 400+  (for GCP)

# Package managers
npm --version  # 8.0+
pip --version  # 21.0+
```

### Environment Variables

```bash
# Backend
MONGO_URL=mongodb://localhost:27017
DB_NAME=zenuml
JWT_SECRET_KEY=your-secret-key
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
SESSION_SECRET=your-session-secret
CORS_ORIGINS=http://localhost:3000

# Frontend
REACT_APP_BACKEND_URL=http://localhost:8000
```

---

## 2. Development Deployment

### 2.1 Local Setup

```bash
# Clone repository
git clone https://github.com/yourusername/zenuml.git
cd zenuml

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your values

# Frontend setup
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your values
```

### 2.2 Run Development Server

```bash
# Terminal 1: Backend
cd backend
python server_new.py
# Server running on http://localhost:8000

# Terminal 2: Frontend
cd frontend
npm start
# Application running on http://localhost:3000
```

### 2.3 Database Setup

```bash
# Start MongoDB
mongod

# Create indexes
mongo
> use zenuml
> db.users.createIndex({ email: 1 }, { unique: true })
> db.projects.createIndex({ ownerId: 1 })
> db.diagrams.createIndex({ projectId: 1 })
```

---

## 3. Staging Deployment

### 3.1 Docker Setup

```bash
# Build backend image
cd backend
docker build -t zenuml-backend:latest .

# Build frontend image
cd ../frontend
docker build -t zenuml-frontend:latest .

# Run with docker-compose
cd ..
docker-compose up -d
```

### 3.2 Docker Compose Configuration

```yaml
version: '3.8'

services:
  backend:
    image: zenuml-backend:latest
    ports:
      - "8000:8000"
    environment:
      - MONGO_URL=mongodb://mongo:27017
      - DB_NAME=zenuml
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
    depends_on:
      - mongo
      - redis

  frontend:
    image: zenuml-frontend:latest
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://backend:8000
    depends_on:
      - backend

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:7.0
    ports:
      - "6379:6379"

volumes:
  mongo_data:
```

### 3.3 Staging Environment Setup

```bash
# AWS Staging
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.medium \
  --key-name my-key \
  --security-groups staging-sg

# Configure security groups
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxx \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

# Configure DNS
aws route53 change-resource-record-sets \
  --hosted-zone-id Z123456 \
  --change-batch file://dns-changes.json
```

### 3.4 Deploy to Staging

```bash
# SSH into staging server
ssh -i my-key.pem ubuntu@staging.zenuml.com

# Clone repository
git clone https://github.com/yourusername/zenuml.git
cd zenuml

# Pull latest changes
git pull origin main

# Build and run
docker-compose -f docker-compose.staging.yml up -d

# Verify deployment
curl http://localhost:8000/health
```

---

## 4. Production Deployment

### 4.1 Pre-Deployment Checklist

```
✅ Code review completed
✅ All tests passing
✅ Security audit completed
✅ Performance tested
✅ Backup created
✅ Rollback plan documented
✅ Team notified
✅ Monitoring configured
```

### 4.2 Production Environment Setup

```bash
# Create production cluster
aws eks create-cluster \
  --name zenuml-prod \
  --version 1.24 \
  --role-arn arn:aws:iam::ACCOUNT:role/eks-service-role \
  --resources-vpc-config subnetIds=subnet-xxxxx,subnet-yyyyy

# Configure kubectl
aws eks update-kubeconfig \
  --name zenuml-prod \
  --region us-east-1

# Verify cluster
kubectl get nodes
```

### 4.3 Kubernetes Deployment

```yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zenuml-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: zenuml-backend
  template:
    metadata:
      labels:
        app: zenuml-backend
    spec:
      containers:
      - name: backend
        image: zenuml-backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: MONGO_URL
          valueFrom:
            secretKeyRef:
              name: zenuml-secrets
              key: mongo-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
```

### 4.4 Deploy to Production

```bash
# Create secrets
kubectl create secret generic zenuml-secrets \
  --from-literal=mongo-url=$MONGO_URL \
  --from-literal=jwt-secret=$JWT_SECRET_KEY

# Deploy backend
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml

# Deploy frontend
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

# Verify deployment
kubectl get pods
kubectl get services

# Check logs
kubectl logs -f deployment/zenuml-backend
```

### 4.5 Configure Load Balancer

```bash
# Create load balancer
kubectl apply -f load-balancer.yaml

# Configure SSL/TLS
kubectl apply -f ingress.yaml

# Verify
kubectl get ingress
```

---

## 5. Monitoring & Maintenance

### 5.1 Health Checks

```bash
# Check backend health
curl https://api.zenuml.com/health

# Check frontend
curl https://zenuml.com

# Check database
mongosh --eval "db.adminCommand('ping')"

# Check cache
redis-cli ping
```

### 5.2 Monitoring Setup

```bash
# Install Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack

# Install Grafana
helm install grafana grafana/grafana

# Configure alerts
kubectl apply -f prometheus-rules.yaml
```

### 5.3 Log Aggregation

```bash
# Install ELK Stack
helm install elasticsearch elastic/elasticsearch
helm install kibana elastic/kibana
helm install logstash elastic/logstash

# View logs
kubectl logs -f deployment/zenuml-backend
```

### 5.4 Performance Monitoring

```bash
# Monitor CPU and memory
kubectl top nodes
kubectl top pods

# Check resource usage
kubectl describe node node-1
```

---

## 6. Rollback Procedures

### 6.1 Rollback to Previous Version

```bash
# Check deployment history
kubectl rollout history deployment/zenuml-backend

# Rollback to previous version
kubectl rollout undo deployment/zenuml-backend

# Rollback to specific revision
kubectl rollout undo deployment/zenuml-backend --to-revision=2

# Verify rollback
kubectl rollout status deployment/zenuml-backend
```

### 6.2 Database Rollback

```bash
# Restore from backup
mongorestore --uri "mongodb://localhost:27017" --archive=backup.archive

# Verify data
mongo
> use zenuml
> db.users.count()
```

### 6.3 Rollback Checklist

```
✅ Stop current deployment
✅ Restore database backup
✅ Restore previous application version
✅ Verify health checks
✅ Test critical features
✅ Notify team
✅ Document incident
```

---

## 7. Maintenance Tasks

### 7.1 Regular Backups

```bash
# Daily backup
0 2 * * * mongodump --uri "mongodb://localhost:27017" --archive=/backups/daily-$(date +\%Y\%m\%d).archive

# Weekly full backup
0 3 * * 0 mongodump --uri "mongodb://localhost:27017" --archive=/backups/weekly-$(date +\%Y\%m\%d).archive

# Verify backup
mongorestore --archive=/backups/daily-20241118.archive --dryRun
```

### 7.2 Security Updates

```bash
# Update dependencies
npm update
pip install --upgrade -r requirements.txt

# Security audit
npm audit
pip-audit

# Apply patches
kubectl patch deployment zenuml-backend \
  -p '{"spec":{"template":{"spec":{"containers":[{"name":"backend","image":"zenuml-backend:latest"}]}}}}'
```

### 7.3 Performance Optimization

```bash
# Analyze slow queries
db.setProfilingLevel(1, { slowms: 100 })
db.system.profile.find().pretty()

# Optimize indexes
db.diagrams.createIndex({ projectId: 1, createdAt: -1 })

# Cache optimization
redis-cli INFO memory
redis-cli MEMORY DOCTOR
```

---

## 8. Troubleshooting

### Issue: Pod CrashLoopBackOff

```bash
# Check logs
kubectl logs pod-name

# Describe pod
kubectl describe pod pod-name

# Check events
kubectl get events --sort-by='.lastTimestamp'
```

### Issue: Database Connection Failed

```bash
# Check MongoDB status
systemctl status mongod

# Verify connection string
echo $MONGO_URL

# Test connection
mongosh $MONGO_URL
```

### Issue: High Memory Usage

```bash
# Check memory usage
kubectl top pods

# Increase resource limits
kubectl set resources deployment zenuml-backend \
  --limits=memory=1Gi,cpu=1000m
```

---

**End of Deployment Guide**
