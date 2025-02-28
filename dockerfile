FROM node:20.5.0-alpine3.18
RUN addgroup patientsystem && adduser -S -G patientsystem patientsystem
USER patientsystem
WORKDIR /app/
COPY --chown=patientsystem package*.json . 
RUN npm install
COPY --chown=patientsystem . .  
EXPOSE 3000
CMD ["npm","run","dev"]