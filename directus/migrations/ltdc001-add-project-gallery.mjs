// Galerie photo des projets : relation M2M ordonnée projects <-> directus_files.
//
// Custom migration run by `directus bootstrap` at container start (see
// directus/Dockerfile). The "ltdc" prefix sorts after Directus' own YYYYMMDD
// migrations, so the system tables always exist when this runs.
//
// On a fresh database the `projects` collection does not exist yet (it comes
// from directus/snapshot.yaml, which already contains the gallery): nothing to do.

const PUBLIC_ACCESS = { role: null, user: null };

export async function up(knex) {
  if (!(await knex.schema.hasTable('projects'))) return;
  if (await knex.schema.hasTable('projects_gallery')) return;

  await knex.schema.createTable('projects_gallery', (table) => {
    table.increments('id');
    table.integer('projects_id').references('id').inTable('projects').onDelete('CASCADE');
    table.uuid('directus_files_id').references('id').inTable('directus_files').onDelete('CASCADE');
    table.integer('sort');
  });

  await knex('directus_collections').insert({
    collection: 'projects_gallery',
    icon: 'import_export',
    hidden: true,
  });

  const hiddenField = (field, sort) => ({
    collection: 'projects_gallery',
    field,
    hidden: true,
    interface: field === 'id' ? 'input' : null,
    readonly: field === 'id',
    sort,
    width: 'full',
  });
  await knex('directus_fields').insert([
    {
      collection: 'projects',
      field: 'gallery',
      special: 'files',
      interface: 'files',
      note: 'Photos affichées dans la galerie de la page projet (glisser pour les ordonner)',
      sort: 15,
      width: 'full',
    },
    hiddenField('id', 1),
    hiddenField('projects_id', 2),
    hiddenField('directus_files_id', 3),
    hiddenField('sort', 4),
  ]);

  await knex('directus_relations').insert([
    {
      many_collection: 'projects_gallery',
      many_field: 'directus_files_id',
      one_collection: 'directus_files',
      junction_field: 'projects_id',
      one_deselect_action: 'nullify',
    },
    {
      many_collection: 'projects_gallery',
      many_field: 'projects_id',
      one_collection: 'projects',
      one_field: 'gallery',
      junction_field: 'directus_files_id',
      sort_field: 'sort',
      one_deselect_action: 'nullify',
    },
  ]);

  // Le site lit le contenu avec le rôle Public.
  const publicAccess = await knex('directus_access').where(PUBLIC_ACCESS).first('policy');
  if (publicAccess) {
    await knex('directus_permissions').insert({
      policy: publicAccess.policy,
      collection: 'projects_gallery',
      action: 'read',
      fields: '*',
      permissions: JSON.stringify({}),
      validation: JSON.stringify({}),
    });
  }

  // `medias` n'a jamais été affiché par le site : la galerie le remplace.
  await knex('directus_fields').where({ collection: 'projects', field: 'medias' }).update({ hidden: true });
}

export async function down(knex) {
  if (!(await knex.schema.hasTable('projects_gallery'))) return;

  await knex('directus_fields').where({ collection: 'projects', field: 'medias' }).update({ hidden: false });
  await knex('directus_permissions').where({ collection: 'projects_gallery' }).delete();
  await knex('directus_relations').where({ many_collection: 'projects_gallery' }).delete();
  await knex('directus_fields')
    .where({ collection: 'projects_gallery' })
    .orWhere({ collection: 'projects', field: 'gallery' })
    .delete();
  await knex('directus_collections').where({ collection: 'projects_gallery' }).delete();
  await knex.schema.dropTable('projects_gallery');
}
