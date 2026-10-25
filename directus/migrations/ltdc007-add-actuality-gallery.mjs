// Galerie photo des actualités : relation M2M ordonnée actualities <-> directus_files.

const PUBLIC_ACCESS = { role: null, user: null };

export async function up(knex) {
  if (!(await knex.schema.hasTable('actualities'))) return;
  if (await knex.schema.hasTable('actualities_gallery')) return;

  await knex.schema.createTable('actualities_gallery', (table) => {
    table.increments('id');
    table.integer('actualities_id').references('id').inTable('actualities').onDelete('CASCADE');
    table.uuid('directus_files_id').references('id').inTable('directus_files').onDelete('CASCADE');
    table.integer('sort');
  });

  await knex('directus_collections').insert({
    collection: 'actualities_gallery',
    icon: 'import_export',
    hidden: true,
  });

  const hiddenField = (field, sort) => ({
    collection: 'actualities_gallery',
    field,
    hidden: true,
    interface: field === 'id' ? 'input' : null,
    readonly: field === 'id',
    sort,
    width: 'full',
  });

  await knex('directus_fields').insert([
    {
      collection: 'actualities',
      field: 'gallery',
      special: 'files',
      interface: 'files',
      note: 'Photos affichées dans la galerie de la page actualité (glisser pour les ordonner)',
      sort: 18,
      width: 'full',
    },
    hiddenField('id', 1),
    hiddenField('actualities_id', 2),
    hiddenField('directus_files_id', 3),
    hiddenField('sort', 4),
  ]);

  await knex('directus_relations').insert([
    {
      many_collection: 'actualities_gallery',
      many_field: 'directus_files_id',
      one_collection: 'directus_files',
      junction_field: 'actualities_id',
      one_deselect_action: 'nullify',
    },
    {
      many_collection: 'actualities_gallery',
      many_field: 'actualities_id',
      one_collection: 'actualities',
      one_field: 'gallery',
      junction_field: 'directus_files_id',
      sort_field: 'sort',
      one_deselect_action: 'nullify',
    },
  ]);

  const publicAccess = await knex('directus_access').where(PUBLIC_ACCESS).first('policy');
  if (publicAccess) {
    await knex('directus_permissions').insert({
      policy: publicAccess.policy,
      collection: 'actualities_gallery',
      action: 'read',
      fields: '*',
      permissions: JSON.stringify({}),
      validation: JSON.stringify({}),
    });
  }
}

export async function down(knex) {
  if (!(await knex.schema.hasTable('actualities_gallery'))) return;

  await knex('directus_permissions').where({ collection: 'actualities_gallery' }).delete();
  await knex('directus_relations').where({ many_collection: 'actualities_gallery' }).delete();
  await knex('directus_fields')
    .where({ collection: 'actualities_gallery' })
    .orWhere({ collection: 'actualities', field: 'gallery' })
    .delete();
  await knex('directus_collections').where({ collection: 'actualities_gallery' }).delete();
  await knex.schema.dropTable('actualities_gallery');
}
