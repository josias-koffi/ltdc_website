// Directus 11+ utilise cet identifiant stable pour la policy publique.
// Source : migration officielle 20240806A-permissions-policies de Directus.
const PUBLIC_POLICY_ID = 'abf8a154-5b1c-4a46-ac9c-7300570f4f17';

const EMISSIONS_READ = {
  policy: PUBLIC_POLICY_ID,
  collection: 'emissions',
  action: 'read',
};

export async function up(knex) {
  if (!(await knex.schema.hasTable('emissions'))) return;

  const publicPolicy = await knex('directus_policies')
    .where({ id: PUBLIC_POLICY_ID })
    .first('id');
  if (!publicPolicy) return;

  const permission = {
    fields: '*',
    permissions: JSON.stringify({ status: { _eq: 'published' } }),
    validation: JSON.stringify({}),
  };
  const existing = await knex('directus_permissions')
    .where(EMISSIONS_READ)
    .first('id');

  if (existing) {
    await knex('directus_permissions')
      .where({ id: existing.id })
      .update(permission);
  } else {
    await knex('directus_permissions').insert({
      ...EMISSIONS_READ,
      ...permission,
    });
  }
}

export async function down(knex) {
  await knex('directus_permissions').where(EMISSIONS_READ).delete();
}
