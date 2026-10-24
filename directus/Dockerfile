# Directus image of the site: the stock image plus our custom migrations,
# which `directus bootstrap` runs at every container start (MIGRATIONS_PATH
# defaults to /directus/migrations).
FROM directus/directus:12.4.1

COPY --chown=node:node migrations /directus/migrations

# Le chemin par défaut (`./migrations`) dépend du répertoire de lancement du
# conteneur. Le rendre absolu garantit que bootstrap découvre les migrations
# LTDC dans tous les environnements Dokploy.
ENV MIGRATIONS_PATH=/directus/migrations
