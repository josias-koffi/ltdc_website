# Directus image of the site: the stock image plus our custom migrations,
# which `directus bootstrap` runs at every container start (MIGRATIONS_PATH
# defaults to /directus/migrations).
FROM directus/directus:12.4.1

COPY --chown=node:node migrations /directus/migrations
