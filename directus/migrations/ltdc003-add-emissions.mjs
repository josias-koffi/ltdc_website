// Rubrique « Émissions » : contenu éditorial avec vidéo YouTube ou fichier Directus.

const PUBLIC_ACCESS = { role: null, user: null };

const STATUS_CHOICES = [
  { text: '$t:published', value: 'published', color: 'var(--theme--primary)' },
  { text: '$t:draft', value: 'draft', color: 'var(--theme--foreground)' },
  { text: '$t:archived', value: 'archived', color: 'var(--theme--warning)' },
];

const VIDEO_SOURCE_CHOICES = [
  { text: 'YouTube', value: 'youtube' },
  { text: 'Vidéo hébergée', value: 'directus' },
];

const youtubeConditions = JSON.stringify([
  {
    name: 'Source YouTube',
    rule: { video_source: { _eq: 'youtube' } },
    hidden: false,
    required: true,
  },
  {
    name: 'Source Directus',
    rule: { video_source: { _eq: 'directus' } },
    hidden: true,
    required: false,
  },
]);

const directusConditions = JSON.stringify([
  {
    name: 'Source Directus',
    rule: { video_source: { _eq: 'directus' } },
    hidden: false,
    required: true,
  },
  {
    name: 'Source YouTube',
    rule: { video_source: { _eq: 'youtube' } },
    hidden: true,
    required: false,
  },
]);

export async function up(knex) {
  if (await knex.schema.hasTable('emissions')) return;

  await knex.schema.createTable('emissions', (table) => {
    table.increments('id');
    table.string('status').notNullable().defaultTo('draft');
    table.integer('sort');
    table.uuid('user_created').references('id').inTable('directus_users');
    table.timestamp('date_created', { useTz: true });
    table.uuid('user_updated').references('id').inTable('directus_users');
    table.timestamp('date_updated', { useTz: true });
    table.string('title');
    table.text('description');
    table.text('content');
    table.uuid('cover').references('id').inTable('directus_files').onDelete('SET NULL');
    table.timestamp('publication_date');
    table.integer('episode_number');
    table.string('video_source').notNullable().defaultTo('youtube');
    table.text('youtube_url');
    table.uuid('video_file').references('id').inTable('directus_files').onDelete('SET NULL');
  });

  await knex('directus_collections').insert({
    collection: 'emissions',
    icon: 'live_tv',
    display_template: '{{title}}',
    archive_field: 'status',
    archive_value: 'archived',
    unarchive_value: 'draft',
    archive_app_filter: true,
    sort_field: 'sort',
  });

  const fields = [
    {
      field: 'id',
      interface: 'input',
      hidden: true,
      readonly: true,
      sort: 1,
    },
    {
      field: 'cover',
      interface: 'file-image',
      special: 'file',
      required: true,
      sort: 2,
      note: 'Image obligatoire affichée sur la carte et la page de l’émission',
    },
    { field: 'title', interface: 'input', required: true, sort: 3 },
    {
      field: 'status',
      interface: 'select-dropdown',
      display: 'labels',
      options: JSON.stringify({ choices: STATUS_CHOICES }),
      display_options: JSON.stringify({ choices: STATUS_CHOICES, showAsDot: true }),
      required: true,
      sort: 4,
    },
    {
      field: 'episode_number',
      interface: 'input',
      validation: JSON.stringify({ _and: [{ episode_number: { _gte: 1 } }] }),
      note: 'Facultatif',
      width: 'half',
      sort: 5,
    },
    {
      field: 'publication_date',
      interface: 'datetime',
      required: true,
      width: 'half',
      sort: 6,
    },
    {
      field: 'description',
      interface: 'input-multiline',
      required: true,
      sort: 7,
    },
    {
      field: 'video_source',
      interface: 'select-dropdown',
      options: JSON.stringify({ choices: VIDEO_SOURCE_CHOICES }),
      required: true,
      sort: 8,
    },
    {
      field: 'youtube_url',
      interface: 'input',
      conditions: youtubeConditions,
      note: 'URL youtube.com ou youtu.be',
      sort: 9,
    },
    {
      field: 'video_file',
      interface: 'file',
      special: 'file',
      conditions: directusConditions,
      note: 'Sélectionner un fichier vidéo dans la médiathèque',
      sort: 10,
    },
    {
      field: 'content',
      interface: 'input-rich-text-html',
      note: 'Texte éditorial facultatif affiché sous la vidéo',
      sort: 11,
    },
    { field: 'sort', interface: 'input', hidden: true, sort: 12 },
    {
      field: 'user_created',
      interface: 'select-dropdown-m2o',
      display: 'user',
      special: 'user-created',
      hidden: true,
      readonly: true,
      width: 'half',
      sort: 13,
    },
    {
      field: 'date_created',
      interface: 'datetime',
      display: 'datetime',
      special: 'date-created',
      hidden: true,
      readonly: true,
      width: 'half',
      sort: 14,
    },
    {
      field: 'user_updated',
      interface: 'select-dropdown-m2o',
      display: 'user',
      special: 'user-updated',
      hidden: true,
      readonly: true,
      width: 'half',
      sort: 15,
    },
    {
      field: 'date_updated',
      interface: 'datetime',
      display: 'datetime',
      special: 'date-updated',
      hidden: true,
      readonly: true,
      width: 'half',
      sort: 16,
    },
  ].map((field) => ({
    collection: 'emissions',
    width: 'full',
    ...field,
  }));

  await knex('directus_fields').insert(fields);

  await knex('directus_relations').insert([
    {
      many_collection: 'emissions',
      many_field: 'user_created',
      one_collection: 'directus_users',
      one_deselect_action: 'nullify',
    },
    {
      many_collection: 'emissions',
      many_field: 'user_updated',
      one_collection: 'directus_users',
      one_deselect_action: 'nullify',
    },
    {
      many_collection: 'emissions',
      many_field: 'cover',
      one_collection: 'directus_files',
      one_deselect_action: 'nullify',
    },
    {
      many_collection: 'emissions',
      many_field: 'video_file',
      one_collection: 'directus_files',
      one_deselect_action: 'nullify',
    },
  ]);

  const publicAccess = await knex('directus_access').where(PUBLIC_ACCESS).first('policy');
  if (publicAccess) {
    await knex('directus_permissions').insert({
      policy: publicAccess.policy,
      collection: 'emissions',
      action: 'read',
      fields: '*',
      permissions: JSON.stringify({ status: { _eq: 'published' } }),
      validation: JSON.stringify({}),
    });
  }
}

export async function down(knex) {
  if (!(await knex.schema.hasTable('emissions'))) return;

  await knex('directus_permissions').where({ collection: 'emissions' }).delete();
  await knex('directus_relations').where({ many_collection: 'emissions' }).delete();
  await knex('directus_fields').where({ collection: 'emissions' }).delete();
  await knex('directus_collections').where({ collection: 'emissions' }).delete();
  await knex.schema.dropTable('emissions');
}
